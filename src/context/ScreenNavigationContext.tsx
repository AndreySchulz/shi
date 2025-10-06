import { createContext, useCallback, useContext, useMemo, useState, type ComponentType, type ReactNode } from 'react'
import Home from '../pages/Home/Home'
import Host from '../pages/Host/Host'
import Connect from '../pages/Connect/Connect'
import Game from '../pages/Game/Game'
import Result from '../pages/Result/Result'
import Table from '../pages/Table/Table'


type ScreenDefinition = {
  id: ScreenId
  title: ScreenTitle
  Component: ComponentType
}

type ScreenId = 'home' | 'host' | 'connect' | 'game' | 'result' | 'table'

type ScreenTitle = 'Home' | 'Host' | 'Connect' | 'Game' | 'Result' | 'Table'

const screens: ScreenDefinition[] = [
  { id: 'home', title: 'Home', Component: Home },
  { id: 'host', title: 'Host', Component: Host },
  { id: 'connect', title: 'Connect', Component: Connect },
  { id: 'game', title: 'Game', Component: Game },
  { id: 'result', title: 'Result', Component: Result },
  { id: 'table', title: 'Table', Component: Table },
]

const totalScreens = screens.length

const indexById = new Map<ScreenId, number>(
  screens.map((screen, index) => [screen.id, index]),
)

type ScreenNavigationContextValue = {
  screens: ScreenDefinition[]
  currentIndex: number
  currentScreen: ScreenDefinition
  previousScreen: ScreenDefinition
  nextScreen: ScreenDefinition
  goToIndex: (index: number) => void
  goTo: (id: ScreenId) => void
  goNext: () => void
  goPrevious: () => void
}

const ScreenNavigationContext = createContext<ScreenNavigationContextValue | undefined>(
  undefined,
)

const normalizeIndex = (index: number) => {
  const normalized = index % totalScreens
  return normalized >= 0 ? normalized : normalized + totalScreens
}

type ScreenNavigationProviderProps = {
  children: ReactNode
}

export const ScreenNavigationProvider = ({ children }: ScreenNavigationProviderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(normalizeIndex(index))
  }, [])

  const goTo = useCallback((id: ScreenId) => {
    const targetIndex = indexById.get(id)
    if (targetIndex === undefined) return

    setCurrentIndex(targetIndex)
  }, [])

  const goNext = useCallback(() => {
    setCurrentIndex((index) => normalizeIndex(index + 1))
  }, [])

  const goPrevious = useCallback(() => {
    setCurrentIndex((index) => normalizeIndex(index - 1))
  }, [])

  const value = useMemo<ScreenNavigationContextValue>(() => {
    const currentScreen = screens[currentIndex]
    return {
      screens,
      currentIndex,
      currentScreen,
      previousScreen: screens[normalizeIndex(currentIndex - 1)],
      nextScreen: screens[normalizeIndex(currentIndex + 1)],
      goToIndex,
      goTo,
      goNext,
      goPrevious,
    }
  }, [currentIndex, goNext, goPrevious, goTo, goToIndex])

  return (
    <ScreenNavigationContext.Provider value={value}>
      {children}
    </ScreenNavigationContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useScreenNavigation = () => {
  const context = useContext(ScreenNavigationContext)
  if (!context) {
    throw new Error('useScreenNavigation must be used within a ScreenNavigationProvider')
  }

  return context
}

export type { ScreenDefinition, ScreenId, ScreenTitle }
