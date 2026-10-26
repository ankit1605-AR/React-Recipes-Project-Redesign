function RecipeSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-card border border-border bg-card" aria-hidden="true">
      <div className="aspect-[4/3] bg-border/70" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 rounded bg-border/70" />
        <div className="h-4 w-1/2 rounded bg-border/70" />
        <div className="flex justify-between pt-2"><div className="h-4 w-12 rounded bg-border/70" /><div className="h-4 w-16 rounded bg-border/70" /></div>
      </div>
    </div>
  )
}
export default RecipeSkeleton
