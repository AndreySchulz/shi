const TouchBoard = ({ displayValue, ariaLive = 'off' }: {
  displayValue: string | number
  ariaLive?: 'off' | 'polite' | 'assertive'
}) => {

  return (
    <div className="game__touch">
      <div className="game__touch-row">
        <span className="game__touch-point" aria-hidden />
        <span className="game__touch-point" aria-hidden />
      </div>
      <div className="game__touch-countdown" aria-live={ariaLive}>
        {displayValue}
      </div>
      <div className="game__touch-row">
        <span className="game__touch-point" aria-hidden />
        <span className="game__touch-point" aria-hidden />
      </div>
    </div>
  )
}

export default TouchBoard
