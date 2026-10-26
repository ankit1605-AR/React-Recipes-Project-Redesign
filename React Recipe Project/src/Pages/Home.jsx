import { useEffect, useState } from 'react'
import axios from 'axios'
import RecipeCard from '../components/RecipeCard'
import RecipeSkeleton from '../components/RecipeSkeleton'
import { Search, X } from '../components/Icons'
import useLoading from '../hooks/useLoading'

const CHIPS = [['🍕', 'Pizza'], ['🍝', 'Pasta'], ['🥗', 'Salad'], ['🍪', 'Cookies'], ['🍗', 'Chicken']]
const LIMIT = 6

function Home() {
  const [recipes, setRecipes] = useState([])
  const [total, setTotal] = useState(0)
  const { loading, startLoading, stopLoading } = useLoading()
  const [errorMsg, setErrorMsg] = useState('')
  const [input, setInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  async function fetchRecipes(skip = 0, query = '') {
    startLoading()
    setErrorMsg('')
    if (skip === 0) setRecipes([])
    try {
      const base = query
        ? `https://dummyjson.com/recipes/search?q=${encodeURIComponent(query)}&`
        : 'https://dummyjson.com/recipes?'
      const { data } = await axios.get(`${base}limit=${LIMIT}&skip=${skip}`)
      setRecipes((prev) => (skip === 0 ? data.recipes : [...prev, ...data.recipes]))
      setTotal(data.total)
    } catch {
      setErrorMsg('We could not load the recipes. Please try again.')
    }
    stopLoading()
  }

  useEffect(() => { fetchRecipes(0) }, [])

  function runSearch(q) {
    const query = q.trim()
    setInput(q)
    setSearchQuery(query)
    fetchRecipes(0, query)
  }

  const showSkeleton = loading && recipes.length === 0
  const showEmpty = !loading && !errorMsg && recipes.length === 0

  return (
    <main>
      <section className="bg-gradient-to-b from-accent-soft/70 to-background">
        <div className="mx-auto max-w-3xl px-4 pb-14 pt-14 text-center sm:pt-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-sage">Cook · Taste · Repeat</p>
          <h1 className="mb-4 font-serif text-4xl font-extrabold leading-tight sm:text-6xl">
            Find your next <span className="text-accent">favourite</span> recipe
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-muted sm:text-lg">Browse hundreds of dishes with ingredients, step-by-step instructions and cooking times.</p>

          <form onSubmit={(e) => { e.preventDefault(); runSearch(input) }} role="search" className="mx-auto flex max-w-xl items-center gap-2 rounded-full border border-border bg-card p-1.5 shadow-soft focus-within:border-accent">
            <Search className="ml-3 h-5 w-5 shrink-0 text-muted" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search pizza, pasta, salad…"
              aria-label="Search recipes"
              className="min-w-0 flex-1 bg-transparent px-1 py-2 outline-none placeholder:text-muted/70"
            />
            {input && (
              <button type="button" aria-label="Clear search" onClick={() => runSearch('')} className="rounded-full p-1.5 text-muted hover:bg-black/5"><X className="h-4 w-4" /></button>
            )}
            <button type="submit" className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-hover">Search</button>
          </form>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {CHIPS.map(([emoji, label]) => (
              <button key={label} type="button" onClick={() => runSearch(label)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${searchQuery === label ? 'border-accent bg-accent text-white' : 'border-border bg-card text-text hover:border-accent hover:text-accent'}`}>
                <span aria-hidden="true">{emoji}</span> {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <h2 className="mb-6 font-serif text-2xl font-bold">{searchQuery ? `Results for “${searchQuery}”` : 'Popular recipes'}</h2>

        {errorMsg && (
          <div className="mx-auto max-w-md rounded-card border border-border bg-card p-8 text-center shadow-soft" role="alert">
            <div className="mb-3 text-4xl" aria-hidden="true">😕</div>
            <p className="mb-5 text-muted">{errorMsg}</p>
            <button onClick={() => fetchRecipes(recipes.length, searchQuery)} className="rounded-full bg-accent px-6 py-2.5 font-semibold text-white transition hover:bg-accent-hover">Try again</button>
          </div>
        )}

        {showEmpty && (
          <div className="mx-auto max-w-md rounded-card border border-dashed border-border bg-card p-10 text-center">
            <div className="mb-3 text-5xl" aria-hidden="true">🔍</div>
            <p className="mb-5 text-muted">No recipes found for “{searchQuery}”. Try a different keyword.</p>
            <button onClick={() => runSearch('')} className="rounded-full border border-accent px-6 py-2.5 font-semibold text-accent transition hover:bg-accent-soft">Clear search</button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {showSkeleton && Array.from({ length: LIMIT }, (_, i) => <RecipeSkeleton key={i} />)}
          {recipes.map((recipe, i) => <RecipeCard key={recipe.id} recipe={recipe} index={i} />)}
        </div>

        {recipes.length > 0 && (
          <div className="mt-10 text-center">
            <p className="mb-4 text-sm text-muted">Showing {recipes.length} of {total} recipes</p>
            {recipes.length < total && (
              <button type="button" disabled={loading} onClick={() => fetchRecipes(recipes.length, searchQuery)}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 font-semibold text-white shadow-soft transition hover:bg-accent-hover disabled:opacity-70">
                {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
                {loading ? 'Loading…' : 'Load More'}
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  )
}
export default Home
