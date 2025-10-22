type ResultPhaseProps = {
  winnerLabel: string
  onPlayAgain: () => void
  onReset: () => void
}

const ResultPhase = ({ winnerLabel, onPlayAgain, onReset }: ResultPhaseProps) => (
  <>
    <div className="game__board" role="status">
      <div className="game__result">
        <p className="game__result-label">Winner</p>
        <p className="game__result-player">{winnerLabel}</p>
      </div>
    </div>
    <footer className="game__controls">
      <div className="game__actions">
        <button type="button" className="game__button game__button--primary" onClick={onPlayAgain}>
          Play Again
        </button>
        <button type="button" className="game__button game__button--ghost" onClick={onReset}>
          Reset
        </button>
      </div>
    </footer>
    <div>ResultPhase</div>

  </>
)

export default ResultPhase
