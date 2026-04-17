import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import Feedback from './components/Feedback'
import './App.css'

function App() {
  const getPage = () => (window.location.hash === '#dashboard' ? 'dashboard' : 'feedback')

  const [page, setPage] = useState(() => {
    if (!window.location.hash || window.location.hash === '#feedback') {
      window.history.replaceState(null, '', '#dashboard')
      window.history.pushState(null, '', '#feedback')
    }
    return getPage()
  })

  useEffect(() => {
    const onNav = () => setPage(getPage())
    window.addEventListener('popstate', onNav)
    return () => window.removeEventListener('popstate', onNav)
  }, [])

  return page === 'dashboard' ? <Dashboard /> : <Feedback />
}

export default App
