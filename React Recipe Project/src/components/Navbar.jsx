import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Chef, Menu, X } from './Icons'

const links = [{ to: '/', label: 'Home' }]

function Navbar() {
  const [open, setOpen] = useState(false)
  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-accent-soft text-accent' : 'text-muted hover:text-text hover:bg-black/5'}`

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3" aria-label="Main">
        <Link to="/" className="flex items-center gap-2 font-serif text-xl font-bold text-text">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-white"><Chef className="h-5 w-5" /></span>
          Savora
        </Link>
        <div className="hidden gap-1 sm:flex">
          {links.map((l) => <NavLink key={l.to} to={l.to} end className={linkClass}>{l.label}</NavLink>)}
        </div>
        <button className="rounded-full p-2 hover:bg-black/5 sm:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
      {open && (
        <div className="flex flex-col gap-1 border-t border-border px-4 py-3 sm:hidden">
          {links.map((l) => <NavLink key={l.to} to={l.to} end className={linkClass} onClick={() => setOpen(false)}>{l.label}</NavLink>)}
        </div>
      )}
    </header>
  )
}
export default Navbar
