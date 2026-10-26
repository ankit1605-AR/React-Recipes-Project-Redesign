import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import RecipeDetail from './Pages/RecipeDetail'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-text">
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
