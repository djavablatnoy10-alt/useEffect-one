
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

function App() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('Default')
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=12')
      .then(res => setProducts(res.data.products))
      .catch(err => console.log(err))
  }, [])

  const categories = ['All', ...new Set(products.map(p => p.category))]

  const filtered = products
    .filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === 'All' || p.category === category)
    )
    .sort((a, b) => {
      if (sort === 'Low Price') return a.price - b.price
      if (sort === 'High Price') return b.price - a.price
      return 0
    })

  const toggleFavorite = id => {
    setFavorites(favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#422d3c] to-[#111b40] text-white">

      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 p-5">
        <h1 className="text-2xl font-bold text-blue-400">Logo</h1>

        <input
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm outline-none"
        />

        <nav className="flex items-center gap-5 text-sm">
          <a href="#">Home</a>
          <a href="#products">Explore</a>
          <button className="rounded border border-white/30 px-4 py-2">
            Wallet
          </button>
          <span>👤</span>
        </nav>
      </header>

      {/* Main */}
      <main className="flex flex-col gap-5 px-5 py-8 md:flex-row">

        {/* Filters */}
        <aside className="w-full rounded-lg bg-white/10 p-5 md:w-1/4">
          <h2 className="mb-5 text-lg font-bold">☰ Filters</h2>

          <details open className="border-b border-white/10 py-4">
            <summary className="cursor-pointer text-sm">Categories</summary>

            <div className="mt-3 flex flex-col gap-3">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`text-left text-xs ${category === c ? 'text-purple-400' : 'text-gray-300'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </details>

          <details className="border-b border-white/10 py-4">
            <summary className="cursor-pointer text-sm">Collections</summary>
            <p className="mt-3 text-xs text-gray-400">All collections</p>
          </details>

          <details className="border-b border-white/10 py-4">
            <summary className="cursor-pointer text-sm">Price</summary>
            <p className="mt-3 text-xs text-gray-400">Product prices</p>
          </details>

          <details className="py-4">
            <summary className="cursor-pointer text-sm">Status</summary>
            <p className="mt-3 text-xs text-gray-400">All products</p>
          </details>
        </aside>

        {/* Products */}
        <section id="products" className="min-w-0 flex-1">

          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-xs text-gray-400">
              {filtered.length} Items
            </p>

            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="rounded border border-white/20 bg-[#25213d] p-2 text-xs"
            >
              <option value="Default">Sort By</option>
              <option value="Low Price">Low Price</option>
              <option value="High Price">High Price</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(p => (
              <div key={p.id} className="rounded-lg bg-white/10 p-2">

                <div className="flex h-48 items-center justify-center rounded bg-gray-200 p-2">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="flex justify-between py-3 text-xs text-gray-400">
                  <span>{p.category}</span>
                  <span>#{p.id}</span>
                </div>

                <div className="mb-3 flex justify-between gap-2 text-xs">
                  <h3 className="truncate font-semibold">{p.title}</h3>
                  <span>${p.price}</span>
                </div>

                <div className="mb-3 flex justify-between text-xs text-gray-400">
                  <span>{p.brand || 'Collection'}</span>
                  <span>{p.stock > 0 ? 'Available' : 'Sold Out'}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => toggleFavorite(p.id)}>
                    {favorites.includes(p.id)
                      ? <FaHeart className="text-red-500" />
                      : <FaRegHeart />}
                  </button>

                  <button
                    disabled={!p.stock}
                    className="flex-1 rounded bg-gradient-to-r from-purple-600 to-purple-500 py-2 text-xs font-semibold disabled:opacity-40"
                  >
                    Buy Now
                  </button>
                </div>

              </div>
            ))}
          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-white/10 px-8 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 font-bold text-purple-400">LOGO</h3>
            <p className="text-xs text-gray-400">Discover unique products.</p>
          </div>

          <div>
            <h3 className="mb-3 font-bold">About</h3>
            <p className="text-xs text-gray-400">Product<br />Resources<br />FAQ</p>
          </div>

          <div>
            <h3 className="mb-3 font-bold">Company</h3>
            <p className="text-xs text-gray-400">Our Team<br />Privacy<br />Features</p>
          </div>

          <div>
            <h3 className="mb-3 font-bold">Contact</h3>
            <p className="text-xs text-gray-400">admin@example.com</p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
