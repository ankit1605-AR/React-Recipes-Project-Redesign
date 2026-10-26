import { Link } from 'react-router'
import { Clock, Star } from './Icons'

export const difficultyStyle = {
  Easy: 'bg-sage-soft text-sage',
  Medium: 'bg-amber-100 text-amber-800',
  Hard: 'bg-red-100 text-red-800',
}

function RecipeCard({ recipe, index = 0 }) {
  const { id, prepTimeMinutes, cookTimeMinutes, image, name, cuisine, difficulty, rating } = recipe
  const totalTime = prepTimeMinutes + cookTimeMinutes

  return (
    <Link
      to={`/recipe/${id}`}
      style={{ animationDelay: `${(index % 6) * 60}ms` }}
      className="group flex animate-fade-up flex-col overflow-hidden rounded-card border border-border bg-card shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={image} alt={name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-text backdrop-blur">{cuisine}</span>
        <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${difficultyStyle[difficulty] ?? 'bg-white text-text'}`}>{difficulty}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-4 font-serif text-lg font-bold leading-snug text-text transition-colors group-hover:text-accent">{name}</h3>
        <div className="mt-auto flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 font-semibold"><Star className="h-4 w-4 text-amber-500" fill="currentColor" />{rating}</span>
          <span className="flex items-center gap-1.5 text-muted"><Clock className="h-4 w-4" />{totalTime} mins</span>
        </div>
      </div>
    </Link>
  )
}
export default RecipeCard
