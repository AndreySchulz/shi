import HalfCircleBtn from "../../components/HalfCircleBtn/HalfCircleBtn";
import RedActiveBtn from "../../components/RedActiveBtn/RedActiveBtn";
import { Container, Icon, IconBox, MainBlock, Navigate } from "./Home.styled";
import sprite from "../../common/image/svg/sprite.svg";
const Home = () => (
  <Container className="page">
    <Navigate>
      <Icon>
        <use href={`${sprite}#Cup`}></use>
      </Icon>
      <Icon>
        <use href={`${sprite}#HamburgerMenu`}></use>
      </Icon>
    </Navigate>
    <MainBlock>
      <HalfCircleBtn />
    </MainBlock>
    <MainBlock>
      <RedActiveBtn />
    </MainBlock>
    <Navigate>
      <IconBox>
        <Icon>
          <use href={`${sprite}#Spedometer`}></use>
        </Icon>
        <p>11111</p>
      </IconBox>
      <IconBox>
        <Icon>
          <use href={`${sprite}#Heart`}></use>
        </Icon>
        <p>8/10</p>
      </IconBox>
    </Navigate>
  </Container>
);

export default Home;
