import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import PopularFoods from "../components/PopularFoods";

function Home({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  cartItems,
  setCartItems,
  wishlist,
  setWishlist,
  loggedInUser,
}) {
  return (
    <div>
      <Hero />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <PopularFoods
        search={search}
        selectedCategory={selectedCategory}
        cartItems={cartItems}
        setCartItems={setCartItems}
        wishlist={wishlist}
        setWishlist={setWishlist}
        loggedInUser={loggedInUser}
      />
    </div>
  );
}

export default Home;