import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import useLoading from '../hooks/useLoading'
import { difficultyStyle } from '../components/RecipeCard'
import { Arrow, Check, Clock, Flame, Share, Star, Users } from '../components/Icons'

function DetailSkeleton() {
  return (
    <main className="mx-auto max-w-5xl animate-pulse px-4 py-8" aria-label="Loading recipe">
      <div className="mb-6 h-72 rounded-card bg-border/70 sm:h-96" />
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">{[0, 1, 2, 3].map((i) => <div key={i} className="h-24 rounded-2xl bg-border/70" />)}</div>
      <div className="h-64 rounded-card bg-border/70" />
    </main>
  )
}

function BackLink() {
  return (
    <Link to="/" className="no-print mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent">
      <Arrow className="h-4 w-4" /> Back to recipes
    </Link>
  )
}

function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState({})
  const { loading, startLoading, stopLoading } = useLoading(true)
  const [errorMsg, setErrorMsg] = useState('')
  const [checked, setChecked] = useState({})
  const [copied, setCopied] = useState(false)

  async function fetchRecipe() {
    startLoading()
    setErrorMsg('')
    setChecked({})
    try {
      const { data } = await axios.get(`https://dummyjson.com/recipes/${id}`)
      setRecipe(data)
    } catch {
      setErrorMsg('Could not load details. Please try again.')
    }
    stopLoading()
  }

  useEffect(() => { fetchRecipe() }, [id])

  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard unavailable */ }
  }

  if (loading) return <DetailSkeleton />

  if (errorMsg) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8">
        <BackLink />
        <div className="mx-auto max-w-md rounded-card border border-border bg-card p-8 text-center shadow-soft" role="alert">
          <div className="mb-3 text-4xl" aria-hidden="true">😕</div>
          <p className="mb-5 text-muted">{errorMsg}</p>
          <button onClick={fetchRecipe} className="rounded-full bg-accent px-6 py-2.5 font-semibold text-white transition hover:bg-accent-hover">Try again</button>
        </div>
      </main>
    )
  }

  const stats = [
    { label: 'Prep', value: `${recipe.prepTimeMinutes} min`, icon: Clock },
    { label: 'Cook', value: `${recipe.cookTimeMinutes} min`, icon: Flame },
    { label: 'Servings', value: recipe.servings, icon: Users },
    { label: 'Calories', value: `${recipe.caloriesPerServing} kcal`, icon: Flame },
  ]

  return (
    <main className="mx-auto max-w-5xl animate-fade-up px-4 py-8">
      <BackLink />

      <div className="relative mb-8 overflow-hidden rounded-card shadow-lift">
        <img src={recipe.image} alt={recipe.name} className="h-72 w-full object-cover sm:h-[26rem]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
          <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-white/90 px-3 py-1 text-text">{recipe.cuisine}</span>
            <span className={`rounded-full px-3 py-1 ${difficultyStyle[recipe.difficulty] ?? 'bg-white text-text'}`}>{recipe.difficulty}</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold leading-tight sm:text-5xl">{recipe.name}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm font-medium">
            <Star className="h-4 w-4 text-amber-400" fill="currentColor" />{recipe.rating} ({recipe.reviewCount} reviews)
          </p>
        </div>
      </div>

      <div className="no-print mb-6 flex flex-wrap gap-2">
        <button onClick={share} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent">
          {copied ? <Check className="h-4 w-4 text-sage" /> : <Share className="h-4 w-4" />}{copied ? 'Link copied' : 'Share'}
        </button>
        <button onClick={() => window.print()} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent">Print recipe</button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <Icon className="mb-2 h-5 w-5 text-accent" />
            <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
            <p className="text-lg font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        {recipe.mealType?.map((m) => <span key={m} className="rounded-full bg-sage-soft px-3 py-1 text-sm font-medium text-sage">{m}</span>)}
        {recipe.tags?.map((t) => <span key={t} className="rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">#{t}</span>)}
      </div>

      <div className="grid gap-10 md:grid-cols-5">
        <section className="md:col-span-2">
          <h2 className="mb-4 font-serif text-2xl font-bold">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients?.map((item, i) => (
              <li key={i}>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 transition hover:border-accent">
                  <input type="checkbox" className="mt-1 h-4 w-4 accent-[#b5472b]" checked={!!checked[i]} onChange={() => setChecked((c) => ({ ...c, [i]: !c[i] }))} />
                  <span className={checked[i] ? 'text-muted line-through' : ''}>{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>
        <section className="md:col-span-3">
          <h2 className="mb-4 font-serif text-2xl font-bold">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions?.map((step, i) => (
              <li key={i} className="flex gap-4 rounded-card border border-border bg-card p-5 shadow-soft">
                <span className="font-serif text-4xl font-extrabold leading-none text-accent/30">{String(i + 1).padStart(2, '0')}</span>
                <p className="pt-1 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  )
}
export default RecipeDetail
