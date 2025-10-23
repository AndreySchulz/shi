import ResultBox from "../../components/ResultBox/ResultBox";
import { Container } from "./Result.styled";
type ResultPhaseProps = {
  timeMs: number;
  onPlayAgain: () => void;
};

const Result = ({ timeMs, onPlayAgain }: ResultPhaseProps) => {
  return (
    <Container className="page">
      <ResultBox timeMs={timeMs} onPlayAgain={onPlayAgain} />
      <ResultBox timeMs={timeMs} onPlayAgain={onPlayAgain} />
    </Container>
  );
};

export default Result;
