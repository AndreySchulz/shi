import { useCallback } from 'react'
import { ARENA_COLOR, type SplitLayout } from '../gameTypes'

const useChessboardLayout = () =>
  useCallback((): SplitLayout => {
    const topLeft = Math.random() > 0.5 ? ARENA_COLOR.Red : ARENA_COLOR.Black
    const topRight = topLeft === ARENA_COLOR.Red ? ARENA_COLOR.Black : ARENA_COLOR.Red

    return {
      player2: [topLeft, topRight],
      player1: [topRight, topLeft],
    }
  }, [])

export default useChessboardLayout
