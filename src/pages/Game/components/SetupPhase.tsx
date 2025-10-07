import { ARENA_COLOR, PLAYER_ID, PLAYER_LABEL } from '../gameTypes'
import type { PlayerId, SplitLayout } from '../gameTypes'
import TouchBoard from './TouchBoard'

type SetupPhaseMode = 'waiting' | 'split'

type SetupPhaseProps = {
  mode: SetupPhaseMode
  layout: SplitLayout | null
  onStartRound: () => void
  onDeclareWinner: (playerId: PlayerId) => void
  playerLabels?: Record<PlayerId, string>
}

const DEFAULT_LAYOUT: SplitLayout = {
  player1: [ARENA_COLOR.Red, ARENA_COLOR.Black],
  player2: [ARENA_COLOR.Black, ARENA_COLOR.Red],
}

const SetupPhase = ({
  mode,
  layout,
  onStartRound,
  onDeclareWinner,
  playerLabels = PLAYER_LABEL,
}: SetupPhaseProps) => {
  const isSplit = mode === 'split'
  const activeLayout = layout ?? DEFAULT_LAYOUT
  const containerClassName = `game__setup-stage ${isSplit ? 'game__setup-stage--split' : 'game__setup-stage--waiting'}`
  const boardClassName = 'game__board game__board--setup'

  return (
    <div className={containerClassName}>
      <div className={boardClassName} role="presentation">
        <div className="game__setup-layer game__setup-layer--touch">
          <TouchBoard displayValue="Ready" />
        </div>
        <div className="game__setup-layer game__setup-layer--grid">
          <div className="game__split">
            {[activeLayout.player1, activeLayout.player2].map((column, columnIndex) => (
              <div className="game__split-column" key={`column-${columnIndex}`}>
                {column.map((color, cellIndex) => (
                  <div
                    key={`column-${columnIndex}-cell-${cellIndex}`}
                    className={`game__split-cell game__split-cell--${color}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="game__controls">
        <div className="game__controls-panel game__controls-panel--waiting">
          <p className="game__hint">
            Players place two fingertips on the highlighted pads. When ready, start the round.
          </p>
          <button type="button" className="game__button game__button--primary" onClick={onStartRound}>
            Start Round
          </button>
        </div>
        <div className="game__controls-panel game__controls-panel--split">
          <div className="game__actions">
            {[PLAYER_ID.Player1, PLAYER_ID.Player2].map((player) => (
              <button
                key={player}
                type="button"
                className="game__button game__button--ghost"
                onClick={() => onDeclareWinner(player)}
              >
                {playerLabels[player]} released first
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SetupPhase
