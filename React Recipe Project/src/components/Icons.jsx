const make = (paths) => (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths}</svg>
)
export const Star = make(<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />)
export const Clock = make(<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>)
export const Search = make(<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>)
export const X = make(<path d="M18 6 6 18M6 6l12 12" />)
export const Menu = make(<path d="M4 6h16M4 12h16M4 18h16" />)
export const Arrow = make(<path d="M19 12H5m7 7-7-7 7-7" />)
export const Users = make(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>)
export const Flame = make(<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.4 1-3a2.5 2.5 0 0 0 2.5 2.5z" />)
export const Share = make(<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></>)
export const Check = make(<path d="M20 6 9 17l-5-5" />)
export const Chef = make(<><path d="M6 13.9V20h12v-6.1" /><path d="M18 13.9A4 4 0 0 0 17 6a5 5 0 0 0-10 0 4 4 0 0 0-1 7.9" /></>)
