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

const ResultBox = () => {
  const { goTo } = useScreenNavigation();
  return (
    <Container>
      <RusultGameBox>
        <IconBox>
          <Icon>
            <use href={`${sprite}#Spedometer`}></use>
          </Icon>
          <Score>519</Score>
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
            onClick={() => goTo("game")}
          >
            <Icon>
              <use href={`${sprite}#refresh`}></use>
            </Icon>
          </IconButton>
        </IconBox>
      </RusultGameBox>
      <Footer />
    </Container>
  );
};

export default ResultBox;
