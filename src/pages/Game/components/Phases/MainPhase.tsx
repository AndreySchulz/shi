import { ARENA_COLOR, PLAYER_ID, PLAYER_LABEL } from '../../gameTypes'
import type { PlayerId, SplitLayout } from '../../gameTypes'
import TouchBoard from '../TouchBoard'

type MainPhaseMode = 'waiting' | 'countdown' | 'split'

type MainPhaseProps = {
  mode: MainPhaseMode
  layout: SplitLayout | null
  countdownSeconds?: number
  onStartRound: () => void
  onDeclareWinner: (playerId: PlayerId) => void
  playerLabels?: Record<PlayerId, string>
}

const DEFAULT_LAYOUT: SplitLayout = {
  player1: [ARENA_COLOR.Red, ARENA_COLOR.Black],
  player2: [ARENA_COLOR.Black, ARENA_COLOR.Red],
}

const MainPhase = ({
  mode,
  layout,
  countdownSeconds = 0,
  onStartRound,
  onDeclareWinner,
  playerLabels = PLAYER_LABEL,
}: MainPhaseProps) => {
  const isCountdown = mode === 'countdown'
  const isSplit = mode === 'split'
  const isWaiting = mode === 'waiting'

  const stageClassName = [
    'game__setup-stage',
    isCountdown && 'game__setup-stage--countdown',
    isSplit && 'game__setup-stage--split',
    isWaiting && 'game__setup-stage--waiting',
  ]
    .filter(Boolean)
    .join(' ')

  const setupLayout = layout ?? DEFAULT_LAYOUT

  const countdownBoard = (
    <div className="game__board" role="presentation">
      <TouchBoard displayValue={countdownSeconds} ariaLive="polite" />
    </div>
  )

  const touchOverlay = (
    <div className="game__setup-layer game__setup-layer--touch">
      <TouchBoard displayValue="Ready" />
    </div>
  )

  const splitOverlay = (
    <div className="game__setup-layer game__setup-layer--grid">
      <div className="game__split">
        {[setupLayout.player1, setupLayout.player2].map((column, columnIndex) => (
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
  )

  const waitingControls = (
    <div className="game__controls-panel game__controls-panel--waiting">
      <p className="game__hint">
        Players place two fingertips on the highlighted pads. When ready, start the round.
      </p>
      <button type="button" className="game__button game__button--primary" onClick={onStartRound}>
        Start Round
      </button>
    </div>
  )

  const splitControls = (
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
  )

  const countdownControls = (
    <div className="game__controls-panel game__controls-panel--countdown">
      <p className="game__hint">Hold steady… the arena will split in a moment.</p>
    </div>
  )

  const boardContent = isCountdown ? (
    countdownBoard
  ) : (
    <div className="game__board game__board--setup" role="presentation">
      {touchOverlay}
      {splitOverlay}
    </div>
  )

  const controlsContent = isCountdown ? (
    countdownControls
  ) : (
    <>
      {waitingControls}
      {splitControls}
    </>
  )

  return (
    <div className={stageClassName}>
      {boardContent}
      <footer className="game__controls">{controlsContent}</footer>
    </div>
  )
}

export default MainPhase
