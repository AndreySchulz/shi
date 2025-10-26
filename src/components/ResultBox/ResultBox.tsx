import Footer from "../Footer/Footer";
import { useScreenNavigation } from "../../context/ScreenNavigationContext";
import sprite from "../../common/image/svg/sprite.svg";
import {
  Container,
  Icon,
  IconBox,
  IconButton,
  RusultGameBox,
  Score,
} from "./ResultBox.styled";
import { useState } from "react";
type ResultPhaseProps = {
  timeMs: number;
  onPlayAgain: React.Dispatch<React.SetStateAction<string>>;
};
const ResultBox = ({ timeMs, onPlayAgain }: ResultPhaseProps) => {
  const { goTo } = useScreenNavigation();
  const [icon, setIcon] = useState("refresh");

  const onClick = () => {
    setIcon("accept");
    onPlayAgain("true");
  };

  return (
    <Container>
      <RusultGameBox>
        <IconBox>
          <Icon>
            <use href={`${sprite}#Spedometer`}></use>
          </Icon>
          <Score>{timeMs}</Score>
        </IconBox>
        <IconBox>
          <IconButton
            type="button"
            aria-label="Go to home screen"
            onClick={() => goTo("home")}
          >
            <Icon>
              <use href={`${sprite}#arrowLeft`}></use>
            </Icon>
          </IconButton>
          <IconButton
            type="button"
            aria-label="Go to game screen"
            onClick={onClick}
          >
            <Icon>
              <use href={`${sprite}#${icon}`}></use>
            </Icon>
          </IconButton>
        </IconBox>
      </RusultGameBox>
      <Footer />
    </Container>
  );
};

export default ResultBox;
