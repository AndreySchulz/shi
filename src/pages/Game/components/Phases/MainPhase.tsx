import { PLAYER_ID, PLAYER_LABEL } from '../../gameTypes'
import type { CircleOffsetLayout, CirclePosition, PlayerId, SplitLayout } from '../../gameTypes'

type MainPhaseMode = 'waiting' | 'countdown' | 'split'

type MainPhaseProps = {
  mode: MainPhaseMode
  layout: SplitLayout
  circleOffsets: CircleOffsetLayout
  countdownSeconds?: number
  onStartRound: () => void
  onDeclareWinner: (playerId: PlayerId) => void
  playerLabels?: Record<PlayerId, string>
}

const MainPhase = ({
  mode,
  layout,
  circleOffsets,
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

  const [player1Left, player1Right] = layout.player1
  const [player2Left, player2Right] = layout.player2
  const [player1LeftPos, player1RightPos] = circleOffsets.player1
  const [player2LeftPos, player2RightPos] = circleOffsets.player2

  const circleClassName = (position: CirclePosition) =>
    `game__board-circle game__board-circle--${position}`

  const boardContent = (
    <div className="game__board game__board--main" role="presentation">
      <div className="game__board-grid">
        <div className={`game__board-cell game__board-cell--top-left game__board-cell--${player2Left}`}>
          <span className={circleClassName(player2LeftPos)} aria-hidden={isSplit} />
        </div>
        <div className={`game__board-cell game__board-cell--top-right game__board-cell--${player2Right}`}>
          <span className={circleClassName(player2RightPos)} aria-hidden={isSplit} />
        </div>
        <div className={`game__board-cell game__board-cell--bottom-left game__board-cell--${player1Left}`}>
          <span className={circleClassName(player1LeftPos)} aria-hidden={isSplit} />
        </div>
        <div className={`game__board-cell game__board-cell--bottom-right game__board-cell--${player1Right}`}>
          <span className={circleClassName(player1RightPos)} aria-hidden={isSplit} />
        </div>
      </div>
      <div className="game__board-ready" aria-hidden={!isWaiting}>
        <p className="game__board-ready-label">Ready</p>
      </div>
      <div className="game__board-countdown" aria-hidden={!isCountdown}>
        <span
          className="game__board-countdown-value"
          aria-live={isCountdown ? 'polite' : 'off'}
        >
          {countdownSeconds}
        </span>
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
        <button
          type="button"
          className="game__button game__button--ghost"
          onClick={() => onDeclareWinner(PLAYER_ID.Player1)}
        >
          {playerLabels[PLAYER_ID.Player1]} released first
        </button>
        <button
          type="button"
          className="game__button game__button--ghost"
          onClick={() => onDeclareWinner(PLAYER_ID.Player2)}
        >
          {playerLabels[PLAYER_ID.Player2]} released first
        </button>
      </div>
    </div>
  )

  const countdownControls = (
    <div className="game__controls-panel game__controls-panel--countdown">
      <p className="game__hint">Hold steady… the arena will split in a moment.</p>
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
