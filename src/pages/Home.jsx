import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import PopularFoods from "../components/PopularFoods";
import OfferBanner from "../components/OfferBanner";
import TopRestaurants from "../components/TopRestaurants";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function Home({
  search,
  setSearch,
  cartCount,
  setCartCount,
  selectedCategory,
  setSelectedCategory,
  cartItems,
  setCartItems,
  wishlist,
  setWishlist,
}) {
  return (
    <div className="bg-white dark:bg-slate-950 text-gray-900 dark:text-white transition duration-500">
      <Hero />

      <SearchBar search={search} setSearch={setSearch} />

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

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

      <OfferBanner />

      <TopRestaurants />

      <Testimonials />

      <Footer />
    </div>
  );
}

export default Home;
