import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ResultPhase from './components/Phases/ResultPhase'
import MainPhase from './components/Phases/MainPhase'
import './components/Phases/Phases.css'
import './Game.css'
import {
  MAX_COUNTDOWN_MS,
  MIN_COUNTDOWN_MS,
  PHASE,
  type Phase,
  type PlayerId,
  PLAYER_LABEL,
  type SplitLayout,
} from './gameTypes'
import useChessboardLayout from './hooks/useChessboardLayout'
import useCircleOffsets from './hooks/useCircleOffsets'

const getRandomCountdown = () =>
  MIN_COUNTDOWN_MS + Math.floor(Math.random() * (MAX_COUNTDOWN_MS - MIN_COUNTDOWN_MS + 1))

const Game = () => {
  const createSplitLayout = useChessboardLayout()
  const createCircleOffsets = useCircleOffsets()

  const [phase, setPhase] = useState<Phase>(PHASE.Waiting)
  const [countdownDuration, setCountdownDuration] = useState<number>(0)
  const [remainingMs, setRemainingMs] = useState<number>(0)
  const [winner, setWinner] = useState<PlayerId | null>(null)
  const [splitLayout, setSplitLayout] = useState<SplitLayout>(() => createSplitLayout())
  const [circleOffsets, setCircleOffsets] = useState<number[]>(() => createCircleOffsets())
  const animationFrameRef = useRef<number | null>(null)

  const stopCountdownLoop = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
  }, [])

  useEffect(() => stopCountdownLoop, [stopCountdownLoop])

  useEffect(() => {
    if (phase !== PHASE.Countdown) return undefined

    stopCountdownLoop()
    const startedAt = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startedAt
      const nextRemaining = Math.max(countdownDuration - elapsed, 0)
      setRemainingMs(nextRemaining)

      if (nextRemaining <= 0) {
        setRemainingMs(0)
        setPhase(PHASE.Split)
        stopCountdownLoop()
        return
      }

      animationFrameRef.current = requestAnimationFrame(tick)
    }

    animationFrameRef.current = requestAnimationFrame(tick)

    return () => stopCountdownLoop()
  }, [phase, countdownDuration, stopCountdownLoop])

  const startRound = useCallback(() => {
    setWinner(null)
    setSplitLayout(createSplitLayout())
    const duration = getRandomCountdown()
    setCountdownDuration(duration)
    setRemainingMs(duration)
    setPhase(PHASE.Countdown)
  }, [createSplitLayout])

  const declareWinner = useCallback((playerId: PlayerId) => {
    setWinner(playerId)
    setPhase(PHASE.Result)
  }, [])

  const resetGame = useCallback(() => {
    stopCountdownLoop()
    setWinner(null)
    setSplitLayout(createSplitLayout())
    setCircleOffsets(createCircleOffsets())
    setCountdownDuration(0)
    setRemainingMs(0)
    setPhase(PHASE.Waiting)
  }, [stopCountdownLoop, createSplitLayout, createCircleOffsets])

  const countdownSeconds = useMemo(
    () => Math.max(0, Math.ceil(remainingMs / 1000)),
    [remainingMs],
  )

  const renderPhaseContent = () => {
    switch (phase) {
      case PHASE.Waiting:
      case PHASE.Countdown:
      case PHASE.Split:
        return (
          <MainPhase
            mode={
              phase === PHASE.Countdown
                ? 'countdown'
                : phase === PHASE.Split
                ? 'split'
                : 'waiting'
            }
            layout={splitLayout}
            circleOffsets={circleOffsets}
            countdownSeconds={countdownSeconds}
            onStartRound={startRound}
            onDeclareWinner={declareWinner}
            playerLabels={PLAYER_LABEL}
          />
        )
      case PHASE.Result:
        return winner ? (
          <ResultPhase
            winnerLabel={PLAYER_LABEL[winner]}
            onPlayAgain={startRound}
            onReset={resetGame}
          />
        ) : null
      default:
        return null
    }
  }

  return (
    <section className="game" aria-labelledby="game-title">
      <header className="game__header">
        <h1 id="game-title" className="game__title">
          Game
        </h1>
        <p className="game__subtitle">
          Two-player reflex duel. Place your fingers, wait for the split, and release first.
        </p>
      </header>

      {renderPhaseContent()}
    </section>
  )
}

export default Game
