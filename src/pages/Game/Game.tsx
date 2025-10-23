import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ResultPhase from './components/Phases/ResultPhase'
import MainPhase from './components/Phases/MainPhase'
import './components/Phases/Phases.css'
import './Game.css'
import {
  ARENA_COLOR,
  MAX_COUNTDOWN_MS,
  MIN_COUNTDOWN_MS,
  PHASE,
  type Phase,
  type ArenaColor,
  type PlayerId,
  PLAYER_LABEL,
  type SplitLayout,
  PLAYER_ID,
} from './gameTypes'
import useChessboardLayout from './hooks/useChessboardLayout'

const getRandomCountdown = () =>
  MIN_COUNTDOWN_MS + Math.floor(Math.random() * (MAX_COUNTDOWN_MS - MIN_COUNTDOWN_MS + 1))

const Game = () => {
  const createSplitLayout = useChessboardLayout()

  const [phase, setPhase] = useState<Phase>(PHASE.Waiting)
  const [countdownDuration, setCountdownDuration] = useState<number>(0)
  const [remainingMs, setRemainingMs] = useState<number>(0)
  const [winner, setWinner] = useState<PlayerId | null>(null)
  const [resultTimeMs, setResultTimeMs] = useState<number | null>(null)
  const [splitLayout, setSplitLayout] = useState<SplitLayout>(() => createSplitLayout())
  const animationFrameRef = useRef<number | null>(null)
  const splitStartRef = useRef<number | null>(null)
  const roundFinishedRef = useRef<boolean>(false)

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
    setResultTimeMs(null)
    roundFinishedRef.current = false
    splitStartRef.current = null
    if (phase !== PHASE.Waiting) {
      setSplitLayout(createSplitLayout())
    }
    const duration = getRandomCountdown()
    setCountdownDuration(duration)
    setRemainingMs(duration)
    setPhase(PHASE.Countdown)
  }, [phase, createSplitLayout])

  const finishRound = useCallback((playerId: PlayerId, elapsedMs: number | null) => {
    if (roundFinishedRef.current) return
    roundFinishedRef.current = true
    setWinner(playerId)
    setResultTimeMs(elapsedMs)
    setPhase(PHASE.Result)
    splitStartRef.current = null
  }, [])

  const declareWinner = useCallback(
    (playerId: PlayerId) => {
      finishRound(playerId, splitStartRef.current ? Date.now() - splitStartRef.current : null)
    },
    [finishRound],
  )


  const resetGame = useCallback(() => {
    stopCountdownLoop()
    setWinner(null)
    setResultTimeMs(null)
    roundFinishedRef.current = false
    splitStartRef.current = null
    setSplitLayout(createSplitLayout())
    setCountdownDuration(0)
    setRemainingMs(0)
    setPhase(PHASE.Waiting)
  }, [stopCountdownLoop, createSplitLayout])

  const countdownSeconds = useMemo(
    () => Math.max(0, Math.ceil(remainingMs / 1000)),
    [remainingMs],
  )

  useEffect(() => {
    if (phase === PHASE.Split) {
      splitStartRef.current = Date.now()
    }
  }, [phase])

  const handleCellTouchEnd = useCallback(
    (playerId: PlayerId, color: ArenaColor) => {
      if (roundFinishedRef.current) return
      const opponent = playerId === PLAYER_ID.Player1 ? PLAYER_ID.Player2 : PLAYER_ID.Player1

      if (phase === PHASE.Countdown) {
        stopCountdownLoop()
        finishRound(opponent, 0)
        return
      }

      if (phase !== PHASE.Split) return

      const elapsed = splitStartRef.current ? Date.now() - splitStartRef.current : 0

      if (color === ARENA_COLOR.Red) {
        finishRound(opponent, elapsed)
        return
      }

      if (color === ARENA_COLOR.Black) {
        finishRound(playerId, elapsed)
      }
    },
    [phase, finishRound, stopCountdownLoop],
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
            countdownSeconds={countdownSeconds}
            onStartRound={startRound}
            onDeclareWinner={declareWinner}
            playerLabels={PLAYER_LABEL}
            onCellTouchEnd={handleCellTouchEnd}
          />
        )
      case PHASE.Result:
        return winner ? (
          <ResultPhase
            winnerLabel={PLAYER_LABEL[winner]}
            timeMs={resultTimeMs ?? 0}
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
