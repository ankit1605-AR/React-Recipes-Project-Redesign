function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted sm:flex-row">
        <p><span className="font-serif font-bold text-text">Savora</span> · Recipes powered by DummyJSON</p>
        <p>
          Built by <span className="font-medium text-text">Your Name</span> ·{' '}
          <a className="underline hover:text-accent" href="https://github.com/your-username" target="_blank" rel="noreferrer">GitHub</a> ·{' '}
          <a className="underline hover:text-accent" href="https://your-portfolio.com" target="_blank" rel="noreferrer">Portfolio</a>
        </p>
      </div>
    </footer>
  )
}
export default Footer
