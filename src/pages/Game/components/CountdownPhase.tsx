import TouchBoard from './TouchBoard'

type CountdownPhaseProps = {
  countdownSeconds: number
}

const CountdownPhase = ({ countdownSeconds }: CountdownPhaseProps) => (
  <>
    <div className="game__board" role="presentation">
      <TouchBoard displayValue={countdownSeconds} ariaLive="polite" />
    </div>
    <footer className="game__controls">
      <p className="game__hint">Hold steady… the arena will split in a moment.</p>
    </footer>
  </>
)

export default CountdownPhase
