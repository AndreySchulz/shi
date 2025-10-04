import Footer from "../Footer/Footer";
import sprite from "../../common/image/svg/sprite.svg";
import {
  Container,
  Icon,
  IconBox,
  RusultGameBox,
  Score,
} from "./ResultBox.styled";

const ResultBox = () => {
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
          <Icon>
            <use href={`${sprite}#arrowLeft`}></use>
          </Icon>
          <Icon>
            <use href={`${sprite}#refresh`}></use>
          </Icon>
        </IconBox>
      </RusultGameBox>
      <Footer />
    </Container>
  );
};

export default ResultBox;
