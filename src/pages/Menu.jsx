import PopularFoods from "../components/PopularFoods";

function Menu({
  search = "",
  setSearch = () => {},
  selectedCategory = "All",
  setSelectedCategory = () => {},
  cartItems = [],
  setCartItems = () => {},
  wishlist = [],
  setWishlist = () => {},
  loggedInUser = null,
}) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 transition duration-500">
      <div className="pt-10 pb-4">
        <h1 className="text-4xl font-extrabold text-center text-orange-500">
          🍔 Our Menu
        </h1>

        <p className="text-center mt-3 text-gray-600 dark:text-gray-400">
          Explore our delicious food collection
        </p>
      </div>

      <PopularFoods
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cartItems={cartItems}
        setCartItems={setCartItems}
        wishlist={wishlist}
        setWishlist={setWishlist}
        loggedInUser={loggedInUser}
      />
    </div>
  );
}

export default Menu;