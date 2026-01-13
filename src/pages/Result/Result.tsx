import { useEffect, useState } from "react";
import ResultBox from "../../components/ResultBox/ResultBox";
import { Container } from "./Result.styled";
import { PLAYER_ID, type PlayerId } from "../Game/gameTypes";

type ResultPhaseProps = {
  timeMs: number;
  winner: PlayerId | null;

  onPlayAgain: () => void;
};

const Result = ({ timeMs, winner, onPlayAgain }: ResultPhaseProps) => {
  const [acceptPlayerOne, setAcceptPlayerOne] = useState("false");
  const [acceptPlayerTwo, setAcceptPlayerTwo] = useState("false");

  useEffect(() => {
    if (acceptPlayerOne === "true" && acceptPlayerTwo === "true") {
      onPlayAgain();
    }
  }, [acceptPlayerOne, acceptPlayerTwo]);

  const randomMs =
    timeMs > 0 ? Math.floor(Math.random() * (70 - 3 + 1)) + 3 : 0;

  const player1Time = winner === PLAYER_ID.Player1 ? timeMs : timeMs + randomMs;
  const player2Time = winner === PLAYER_ID.Player2 ? timeMs : timeMs + randomMs;
  return (
    <Container className="page">
      <ResultBox timeMs={player2Time} onPlayAgain={setAcceptPlayerOne} />
      <ResultBox timeMs={player1Time} onPlayAgain={setAcceptPlayerTwo} />
    </Container>
  );
};

export default Result;
