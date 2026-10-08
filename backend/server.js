require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FoodieHub API is running"
  });
});

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      success: true,
      message: "FoodieHub API and MySQL are connected"
    });
  } catch (error) {
    console.error("Health check failed:", error.message);

    res.status(500).json({
      success: false,
      message: "MySQL connection failed"
    });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        p.id,
        p.name,
        p.description,
        p.price,
        p.image,
        p.rating,
        p.stock,
        p.is_available,
        c.name AS category,
        r.name AS restaurant
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN restaurants r ON p.restaurant_id = r.id
      WHERE p.is_available = TRUE
      ORDER BY p.id DESC
    `);

    res.json({
      success: true,
      count: rows.length,
      products: rows
    });
  } catch (error) {
    console.error("Products error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    });
  }
});

app.post("/api/orders", async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const {
      userId,
      email,
      name,
      phone,
      address,
      city,
      pincode,
      payment,
      items,
      coupon
    } = req.body;

    if (!email && !userId) {
      return res.status(400).json({
        success: false,
        message: "User information is required"
      });
    }

    if (!name || !phone || !address || !city || !pincode) {
      return res.status(400).json({
        success: false,
        message: "All delivery details are required"
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    await connection.beginTransaction();

    let user;

    if (userId && Number.isInteger(Number(userId))) {
      const [userRows] = await connection.query(
        "SELECT id, name, email, phone FROM users WHERE id = ? FOR UPDATE",
        [Number(userId)]
      );

      user = userRows[0];
    }

    if (!user && email) {
      const [userRows] = await connection.query(
        "SELECT id, name, email, phone FROM users WHERE LOWER(email) = LOWER(?) FOR UPDATE",
        [email.trim()]
      );

      user = userRows[0];
    }

    if (!user) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message: "User account was not found in MySQL. Please login again."
      });
    }

    const [addressResult] = await connection.query(
      `
      INSERT INTO addresses
        (user_id, full_name, phone, address_line, city, state, pincode)
      VALUES
        (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        user.id,
        name.trim(),
        phone.trim(),
        address.trim(),
        city.trim(),
        "",
        pincode.trim()
      ]
    );

    const addressId = addressResult.insertId;

    let subtotal = 0;
    const verifiedItems = [];

    for (const item of items) {
      const productId = Number(item.id);
      const quantity = Number(item.quantity || 1);

      if (
        !Number.isInteger(productId) ||
        !Number.isInteger(quantity) ||
        quantity <= 0
      ) {
        throw new Error("Invalid cart item");
      }

      const [productRows] = await connection.query(
        `
        SELECT id, name, price, stock, is_available
        FROM products
        WHERE id = ?
        FOR UPDATE
        `,
        [productId]
      );

      const product = productRows[0];

      if (!product) {
        throw new Error(`Product ${productId} was not found`);
      }

      if (!product.is_available) {
        throw new Error(`${product.name} is currently unavailable`);
      }

      if (product.stock < quantity) {
        throw new Error(
          `Only ${product.stock} ${product.name} item(s) are available`
        );
      }

      const price = Number(product.price);

      subtotal += price * quantity;

      verifiedItems.push({
        id: product.id,
        name: product.name,
        price,
        quantity
      });
    }

    const delivery = subtotal > 0 ? 40 : 0;
    const gst = Math.round(subtotal * 0.05);

    let discount = 0;

    if (String(coupon || "").trim().toUpperCase() === "SAVE10") {
      discount = Math.round(subtotal * 0.1);
    }

    const totalAmount = subtotal - discount + delivery + gst;

    let paymentMethod = "cod";

    if (payment === "UPI") {
      paymentMethod = "upi";
    } else if (payment === "Credit Card") {
      paymentMethod = "card";
    }

    const paymentStatus = "pending";

    const [orderResult] = await connection.query(
      `
      INSERT INTO orders
        (user_id, address_id, total_amount, status, payment_method, payment_status)
      VALUES
        (?, ?, ?, 'placed', ?, ?)
      `,
      [
        user.id,
        addressId,
        totalAmount,
        paymentMethod,
        paymentStatus
      ]
    );

    const orderId = orderResult.insertId;

    for (const item of verifiedItems) {
      await connection.query(
        `
        INSERT INTO order_items
          (order_id, product_id, quantity, price)
        VALUES
          (?, ?, ?, ?)
        `,
        [
          orderId,
          item.id,
          item.quantity,
          item.price
        ]
      );

      const [updateResult] = await connection.query(
        `
        UPDATE products
        SET stock = stock - ?
        WHERE id = ?
          AND stock >= ?
        `,
        [
          item.quantity,
          item.id,
          item.quantity
        ]
      );

      if (updateResult.affectedRows !== 1) {
        throw new Error(
          `Stock changed for ${item.name}. Please try again.`
        );
      }
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: {
        id: orderId,
        userId: user.id,
        subtotal,
        delivery,
        gst,
        discount,
        total: totalAmount,
        payment: paymentMethod,
        status: "placed",
        items: verifiedItems
      }
    });
  } catch (error) {
    await connection.rollback();

    console.error("Order error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message || "Failed to place order"
    });
  } finally {
    connection.release();
  }
});

app.get("/api/orders/user/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    if (!Number.isInteger(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    const [orders] = await pool.query(
      `
      SELECT
        o.id,
        o.user_id,
        o.total_amount,
        o.status,
        o.payment_method,
        o.payment_status,
        o.created_at,
        a.full_name,
        a.phone,
        a.address_line,
        a.city,
        a.state,
        a.pincode
      FROM orders o
      LEFT JOIN addresses a ON o.address_id = a.id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
      `,
      [userId]
    );

    for (const order of orders) {
      const [items] = await pool.query(
        `
        SELECT
          oi.product_id,
          oi.quantity,
          oi.price,
          p.name,
          p.image
        FROM order_items oi
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
        `,
        [order.id]
      );

      order.items = items;
    }

    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error("Order history error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch order history"
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err.message);

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await pool.query("SELECT 1");

    app.listen(PORT, () => {
      console.log("MySQL connected");
      console.log(
        `FoodieHub API running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "MySQL connection failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();