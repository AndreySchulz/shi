import { useCallback } from 'react'
import type { CircleOffsetLayout, CirclePosition } from '../gameTypes'

const POSITIONS: CirclePosition[] = ['left', 'right']

const useCircleOffsets = () =>
  useCallback((): CircleOffsetLayout => {
    const pick = () => POSITIONS[Math.floor(Math.random() * POSITIONS.length)]

    return {
      player1: [pick(), pick()],
      player2: [pick(), pick()],
    }
  }, [])

export default useCircleOffsets
