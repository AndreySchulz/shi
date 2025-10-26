import { useEffect, useState } from "react";
import ResultBox from "../../components/ResultBox/ResultBox";
import { Container } from "./Result.styled";
type ResultPhaseProps = {
  timeMs: number;
  onPlayAgain: () => void;
};

const Result = ({ timeMs, onPlayAgain }: ResultPhaseProps) => {
  const [acceptPlayerOne, setAcceptPlayerOne] = useState("false");
  const [acceptPlayerTwo, setAcceptPlayerTwo] = useState("false");

  useEffect(() => {
    if (acceptPlayerOne === "true" && acceptPlayerTwo === "true") {
      onPlayAgain();
    }
  }, [acceptPlayerOne, acceptPlayerTwo]);
  return (
    <Container className="page">
      <ResultBox timeMs={timeMs} onPlayAgain={setAcceptPlayerOne} />
      <ResultBox timeMs={timeMs} onPlayAgain={setAcceptPlayerTwo} />
    </Container>
  );
};

export default Result;
