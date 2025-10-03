import HalfCircleBtn from "../../components/HalfCircleBtn/HalfCircleBtn";
import RedActiveBtn from "../../components/RedActiveBtn/RedActiveBtn";
import { Container, MainBlock, Navigate } from "./Home.styled";

const Home = () => (
  <Container className="page">
    <Navigate></Navigate>
    <MainBlock>
      <HalfCircleBtn />
    </MainBlock>
    <MainBlock>
      <RedActiveBtn />
    </MainBlock>
  </Container>
);

export default Home;
