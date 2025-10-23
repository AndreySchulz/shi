type ResultPhaseProps = {
  winnerLabel: string;
  timeMs: number;
  onPlayAgain: () => void;
  onReset: () => void;
};

const ResultPhase = ({
  winnerLabel,
  timeMs,
  onPlayAgain,
  onReset,
}: ResultPhaseProps) => (
  <>
    <div className="game__board" role="status">
      <div className="game__result">
        <p className="game__result-label">Winner</p>
        <p className="game__result-player">{winnerLabel}</p>
        <p className="game__result-time">{timeMs} ms</p>
      </div>
    </div>
    <footer className="game__controls">
      <div className="game__actions">
        <button
          type="button"
          className="game__button game__button--primary"
          onClick={onPlayAgain}
        >
          Play Again
        </button>
        <button
          type="button"
          className="game__button game__button--ghost"
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    </footer>
  </>
);

export default ResultPhase;
