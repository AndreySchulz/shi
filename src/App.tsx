import { useCallback, useState } from 'react'
import './App.css'
import Home from './pages/Home/Home'
import Host from './pages/Host/Host'
import Connect from './pages/Connect/Connect'
import Game from './pages/Game/Game'
import Result from './pages/Result/Result'
import Table from './pages/Table/Table'

const screens = [
  { id: 'home', title: 'Home', Component: Home },
  { id: 'host', title: 'Host', Component: Host },
  { id: 'connect', title: 'Connect', Component: Connect },
  { id: 'game', title: 'Game', Component: Game },
  { id: 'result', title: 'Result', Component: Result },
  { id: 'table', title: 'Table', Component: Table },
] as const

const totalScreens = screens.length

const normalizeIndex = (index: number) => {
  if (index >= 0 && index < totalScreens) return index
  return (index + totalScreens) % totalScreens
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = useCallback(() => {
    setCurrentIndex((index) => normalizeIndex(index - 1))
  }, [])

  const handleNext = useCallback(() => {
    setCurrentIndex((index) => normalizeIndex(index + 1))
  }, [])

  const CurrentScreen = screens[currentIndex].Component
  const previousTitle = screens[normalizeIndex(currentIndex - 1)].title
  const nextTitle = screens[normalizeIndex(currentIndex + 1)].title

  return (
    <div className="app">
      <CurrentScreen />
      <nav className="navigation" aria-label="Screen navigation">
        <button
          type="button"
          className="nav-button"
          onClick={handlePrevious}
          aria-label={`Go to ${previousTitle} screen`}
        >
          &larr;
        </button>
        <span className="navigation__label">{screens[currentIndex].title}</span>
        <button
          type="button"
          className="nav-button"
          onClick={handleNext}
          aria-label={`Go to ${nextTitle} screen`}
        >
          &rarr;
        </button>
      </nav>
    </div>
  )
}

export default App
