import HalfCircleBtn from "../../components/HalfCircleBtn/HalfCircleBtn";
import RedActiveBtn from "../../components/RedActiveBtn/RedActiveBtn";
import { Container, Icon, MainBlock, Navigate } from "./Home.styled";
import sprite from "../../common/image/svg/sprite.svg";
import FooterMain from "../../components/FooterMain/FooterMain";
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
    <FooterMain />
  </Container>
);

export default Home;
