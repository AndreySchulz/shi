import ResultBox from "../../components/ResultBox/ResultBox";
import { Container } from "./Result.styled";

const Result = () => {
  return (
    <Container className="page">
      <ResultBox />
      <ResultBox />
    </Container>
  );
};

export default Result;
