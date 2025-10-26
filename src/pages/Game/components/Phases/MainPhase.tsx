import { useCallback, useEffect, useMemo, useState } from "react";
import { PLAYER_ID } from "../../gameTypes";
import type { ArenaColor, PlayerId, SplitLayout } from "../../gameTypes";
import RedActiveBtn from "../../../../components/RedActiveBtn/RedActiveBtn";
import HeaderGame from "../HeaderGame/HeaderGame";
import FooterGame from "../FooterGame/FooterGame";

type MainPhaseMode = "waiting" | "countdown" | "split";

type MainPhaseProps = {
  mode: MainPhaseMode;
  layout: SplitLayout;
  countdownSeconds?: number;
  onStartRound: () => void;
  onDeclareWinner: (playerId: PlayerId) => void;
  playerLabels?: Record<PlayerId, string>;
  onCellTouchEnd: (playerId: PlayerId, color: ArenaColor) => void;
};

const MainPhase = ({
  mode,
  layout,
  countdownSeconds = 0,
  onStartRound,

  onCellTouchEnd,
}: MainPhaseProps) => {
  const isCountdown = mode === "countdown";
  const isSplit = mode === "split";
  const isWaiting = mode === "waiting";

  const stageClassName = [
    "game__setup-stage",
    isCountdown && "game__setup-stage--countdown",
    isSplit && "game__setup-stage--split",
    isWaiting && "game__setup-stage--waiting",
  ]
    .filter(Boolean)
    .join(" ");

  const circuleOffset = useMemo(
    () => [
      randomCircleOffset(),
      randomCircleOffset(),
      randomCircleOffset(),
      randomCircleOffset(),
    ],
    []
  );

  const [touchCount, setTouchCount] = useState<number>(0);

  useEffect(() => {
    if (!isWaiting && touchCount !== 0) {
      setTouchCount(0);
    }
  }, [isWaiting, touchCount]);

  const incrementTouch = useCallback(() => {
    if (!isWaiting) return;

    setTouchCount((prev) => {
      const next = Math.min(prev + 1, 4);
      if (next === 4) {
        onStartRound();
      }
      return next;
    });
  }, [isWaiting, onStartRound]);

  const decrementTouch = useCallback(() => {
    if (!isWaiting) return;

    setTouchCount((prev) => Math.max(prev - 1, 0));
  }, [isWaiting]);

  const [player1Left, player1Right] = layout.player1;
  const [player2Left, player2Right] = layout.player2;

  const boardContent = (
    <div className="game__board game__board--main" role="presentation">
      <HeaderGame />
      <div className="game__board-grid">
        <div
          style={{ paddingRight: "20%" }}
          className={`game__board-cell game__board-cell--top-left game__board-cell--${player2Left}`}
          onTouchEnd={() => onCellTouchEnd(PLAYER_ID.Player2, player2Left)}
          onTouchCancel={() => onCellTouchEnd(PLAYER_ID.Player2, player2Left)}
        >
          <span
            style={{ marginLeft: circuleOffset[0] + "%" }}
            aria-hidden={isSplit}
            onTouchStart={incrementTouch}
            onPointerLeave={decrementTouch}
          >
            <RedActiveBtn />
          </span>
        </div>
        <div
          style={{ paddingLeft: "20%" }}
          className={`game__board-cell game__board-cell--top-right game__board-cell--${player2Right}`}
          onTouchEnd={() => onCellTouchEnd(PLAYER_ID.Player2, player2Right)}
          onTouchCancel={() => onCellTouchEnd(PLAYER_ID.Player2, player2Right)}
        >
          <span
            style={{ marginLeft: circuleOffset[1] + "%" }}
            aria-hidden={isSplit}
            onTouchStart={incrementTouch}
            onPointerLeave={decrementTouch}
          >
            <RedActiveBtn />
          </span>
        </div>
        <div
          style={{ paddingRight: "20%" }}
          className={`game__board-cell game__board-cell--bottom-left game__board-cell--${player1Left}`}
          onTouchEnd={() => onCellTouchEnd(PLAYER_ID.Player1, player1Left)}
          onTouchCancel={() => onCellTouchEnd(PLAYER_ID.Player1, player1Left)}
        >
          <span
            style={{ marginLeft: circuleOffset[2] + "%" }}
            aria-hidden={isSplit}
            onTouchStart={incrementTouch}
            onPointerLeave={decrementTouch}
          >
            <RedActiveBtn />
          </span>
        </div>
        <div
          style={{ paddingLeft: "20%" }}
          className={`game__board-cell game__board-cell--bottom-right game__board-cell--${player1Right}`}
          onTouchEnd={() => onCellTouchEnd(PLAYER_ID.Player1, player1Right)}
          onTouchCancel={() => onCellTouchEnd(PLAYER_ID.Player1, player1Right)}
        >
          <span
            style={{ marginLeft: circuleOffset[3] + "%" }}
            aria-hidden={isSplit}
            onTouchStart={incrementTouch}
            onPointerLeave={decrementTouch}
          >
            <RedActiveBtn />
          </span>
        </div>
      </div>
      <div className="game__board-ready" aria-hidden={!isWaiting}>
        <p className="game__board-ready-label">Ready {touchCount}/4</p>
      </div>
      <div className="game__board-countdown" aria-hidden={!isCountdown}>
        <span
          className="game__board-countdown-value"
          aria-live={isCountdown ? "polite" : "off"}
        >
          {countdownSeconds}
        </span>
      </div>
      <FooterGame />
    </div>
  );

  return <div className={stageClassName}>{boardContent}</div>;
};

export default MainPhase;

function randomCircleOffset() {
  return Math.floor(Math.random() * 40) - 20;
}
