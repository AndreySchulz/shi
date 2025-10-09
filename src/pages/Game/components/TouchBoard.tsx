import RedActiveBtn from "../../../components/RedActiveBtn/RedActiveBtn";

const TouchBoard = ({
  displayValue,
  ariaLive = "off",
}: {
  displayValue: string | number;
  ariaLive?: "off" | "polite" | "assertive";
}) => (
  <div className="game__touch">
    <div className="game__touch-row">
      <span className="game__touch-point" aria-hidden>
        <RedActiveBtn />
      </span>
      <span className="game__touch-point" aria-hidden>
        <RedActiveBtn />
      </span>
    </div>
    <div className="game__touch-countdown" aria-live={ariaLive}>
      {displayValue}
    </div>
    <div className="game__touch-row">
      <span className="game__touch-point" aria-hidden>
        <RedActiveBtn />
      </span>
      <span className="game__touch-point" aria-hidden>
        <RedActiveBtn />
      </span>
    </div>
  </div>
);

export default TouchBoard;
