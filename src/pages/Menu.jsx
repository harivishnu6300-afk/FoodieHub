import PopularFoods from "../components/PopularFoods";

function Menu({
  search = "",
  cartCount = 0,
  setCartCount = () => {},
  selectedCategory = "All",
  cartItems = [],
  setCartItems = () => {},
  wishlist = [],
  setWishlist = () => {},
}) {
  return (
    <div className="pt-24 min-h-screen bg-gray-100 dark:bg-slate-950">
      <h1 className="text-4xl font-bold text-center py-8 text-orange-500">
        🍔 Our Menu
      </h1>

      <PopularFoods
        search={search}
        cartCount={cartCount}
        setCartCount={setCartCount}
        selectedCategory={selectedCategory}
        cartItems={cartItems}
        setCartItems={setCartItems}
        wishlist={wishlist}
        setWishlist={setWishlist}
      />
    </div>
  );
}

export default Menu;
