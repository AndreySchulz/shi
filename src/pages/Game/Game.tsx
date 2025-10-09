import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CountdownPhase from "./components/CountdownPhase";
import ResultPhase from "./components/ResultPhase";
import SetupPhase from "./components/SetupPhase";
import "./Game.css";
import {
  ARENA_COLOR,
  type ColumnLayout,
  MAX_COUNTDOWN_MS,
  MIN_COUNTDOWN_MS,
  PHASE,
  type Phase,
  type PlayerId,
  PLAYER_LABEL,
  type SplitLayout,
} from "./gameTypes";

const getRandomCountdown = () =>
  MIN_COUNTDOWN_MS +
  Math.floor(Math.random() * (MAX_COUNTDOWN_MS - MIN_COUNTDOWN_MS + 1));

const Game = () => {
  const [phase, setPhase] = useState<Phase>(PHASE.Waiting);
  const [countdownDuration, setCountdownDuration] = useState<number>(0);
  const [remainingMs, setRemainingMs] = useState<number>(0);
  const [winner, setWinner] = useState<PlayerId | null>(null);
  const [splitLayout, setSplitLayout] = useState<SplitLayout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const stopCountdownLoop = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  useEffect(() => stopCountdownLoop, [stopCountdownLoop]);

  useEffect(() => {
    if (phase !== PHASE.Countdown) return undefined;

    stopCountdownLoop();
    const startedAt = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const nextRemaining = Math.max(countdownDuration - elapsed, 0);
      setRemainingMs(nextRemaining);

      if (nextRemaining <= 0) {
        setRemainingMs(0);
        const createColumn = (): ColumnLayout => {
          const top = Math.random() > 0.5 ? ARENA_COLOR.Red : ARENA_COLOR.Black;
          const bottom =
            top === ARENA_COLOR.Red ? ARENA_COLOR.Black : ARENA_COLOR.Red;
          return [top, bottom];
        };
        const player1Column = createColumn();
        const player2Column: ColumnLayout = [
          // зеркалим цвета
          player1Column[1],
          player1Column[0],
        ];

        setSplitLayout({
          player1: player1Column,
          player2: player2Column,
        });
        setPhase(PHASE.Split);
        stopCountdownLoop();
        return;
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => stopCountdownLoop();
  }, [phase, countdownDuration, stopCountdownLoop]);

  const startRound = useCallback(() => {
    setWinner(null);
    setSplitLayout(null);
    const duration = getRandomCountdown();
    setCountdownDuration(duration);
    setRemainingMs(duration);
    setPhase(PHASE.Countdown);
  }, []);

  const declareWinner = useCallback((playerId: PlayerId) => {
    setWinner(playerId);
    setPhase(PHASE.Result);
  }, []);

  const resetGame = useCallback(() => {
    stopCountdownLoop();
    setWinner(null);
    setSplitLayout(null);
    setCountdownDuration(0);
    setRemainingMs(0);
    setPhase(PHASE.Waiting);
  }, [stopCountdownLoop]);

  const countdownSeconds = useMemo(
    () => Math.max(0, Math.ceil(remainingMs / 1000)),
    [remainingMs]
  );

  const renderPhaseContent = () => {
    switch (phase) {
      case PHASE.Waiting:
        return (
          <SetupPhase
            mode="waiting"
            layout={splitLayout}
            onStartRound={startRound}
            onDeclareWinner={declareWinner}
            playerLabels={PLAYER_LABEL}
          />
        );
      case PHASE.Countdown:
        return <CountdownPhase countdownSeconds={countdownSeconds} />;
      case PHASE.Split:
        return (
          <SetupPhase
            mode="split"
            layout={splitLayout}
            onStartRound={startRound}
            onDeclareWinner={declareWinner}
            playerLabels={PLAYER_LABEL}
          />
        );
      case PHASE.Result:
        return winner ? (
          <ResultPhase
            winnerLabel={PLAYER_LABEL[winner]}
            onPlayAgain={startRound}
            onReset={resetGame}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <section className="game" aria-labelledby="game-title">
      <header className="game__header">
        <h1 id="game-title" className="game__title">
          Game
        </h1>
        <p className="game__subtitle">
          Two-player reflex duel. Place your fingers, wait for the split, and
          release first.
        </p>
      </header>

      {renderPhaseContent()}
    </section>
  );
};

export default Game;
