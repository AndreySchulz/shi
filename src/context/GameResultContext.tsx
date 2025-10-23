import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { PlayerId } from '../pages/Game/gameTypes'

type SplitResult = {
  playerId: PlayerId
  timeMs: number
}

type GameResultContextValue = {
  lastSplitResult: SplitResult | null
  setSplitResult: (result: SplitResult | null) => void
}

const GameResultContext = createContext<GameResultContextValue | undefined>(undefined)

type GameResultProviderProps = {
  children: ReactNode
}

export const GameResultProvider = ({ children }: GameResultProviderProps) => {
  const [lastSplitResult, setLastSplitResult] = useState<SplitResult | null>(null)

  const setSplitResult = useCallback((result: SplitResult | null) => {
    setLastSplitResult(result)
  }, [])

  const value = useMemo(
    () => ({
      lastSplitResult,
      setSplitResult,
    }),
    [lastSplitResult, setSplitResult],
  )

  return <GameResultContext.Provider value={value}>{children}</GameResultContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGameResult = () => {
  const context = useContext(GameResultContext)
  if (!context) {
    throw new Error('useGameResult must be used within a GameResultProvider')
  }
  return context
}
