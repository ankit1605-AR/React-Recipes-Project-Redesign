import { Link } from 'react-router'

function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-24 text-center">
      <div className="mb-4 text-7xl" aria-hidden="true">🍳</div>
      <h1 className="mb-2 font-serif text-6xl font-extrabold text-accent">404</h1>
      <h2 className="mb-3 text-xl font-semibold">Oops, this dish isn’t on the menu</h2>
      <p className="mx-auto mb-8 max-w-md text-muted">The page you are looking for doesn’t exist or may have been moved.</p>
      <Link to="/" className="inline-block rounded-full bg-accent px-6 py-3 font-semibold text-white shadow-soft transition hover:bg-accent-hover">Back to Home</Link>
    </main>
  )
}
export default NotFound
