import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import Feedback from './components/Feedback'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const getPage = () => (window.location.hash === '#dashboard' ? 'dashboard' : 'feedback')

  const [page, setPage] = useState(() => {
    if (!window.location.hash || window.location.hash === '#feedback') {
      window.history.replaceState(null, '', '#dashboard')
      window.history.pushState(null, '', '#feedback')
    }
    return getPage()
  })

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onNav = () => setPage(getPage())
    window.addEventListener('popstate', onNav)
    return () => window.removeEventListener('popstate', onNav)
  }, [])

  if (loading) return null

  return page === 'dashboard' ? <Dashboard /> : <Feedback />
}

export default App
