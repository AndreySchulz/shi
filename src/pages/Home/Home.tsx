import HalfCircleBtn from "../../components/HalfCircleBtn/HalfCircleBtn";
import RedActiveBtn from "../../components/RedActiveBtn/RedActiveBtn";
import { Container, MainBlock } from "./Home.styled";

import FooterMain from "../../components/FooterMain/FooterMain";
import NavMain from "../../components/NavMain/NavMain";
const Home = () => (
  <Container className="page">
    <NavMain />
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
