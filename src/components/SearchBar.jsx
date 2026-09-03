function SearchBar({ search, setSearch }) {
  return (
    <section className="bg-gray-100 dark:bg-slate-950 py-8 transition duration-500">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your favourite food..."
            className="
            w-full
            px-6
            py-4
            rounded-full
            border
            border-gray-300
            dark:border-slate-700
            bg-white
            dark:bg-slate-800
            text-gray-900
            dark:text-white
            placeholder-gray-500
            dark:placeholder-gray-400
            shadow-md
            focus:outline-none
            focus:ring-2
            focus:ring-orange-500
            transition
            duration-300
            "
          />

          <span
            className="
          absolute 
          right-6 
          top-1/2 
          -translate-y-1/2
          text-xl
          "
          >
            🔍
          </span>
        </div>
      </div>
    </section>
  );
}

export default SearchBar;
