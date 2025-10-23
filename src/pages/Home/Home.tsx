import { useScreenNavigation } from "../../context/ScreenNavigationContext";
import HalfCircleBtn from "../../components/HalfCircleBtn/HalfCircleBtn";
import RedActiveBtn from "../../components/RedActiveBtn/RedActiveBtn";
import { Container, IconButton, MainBlock } from "./Home.styled";

import FooterMain from "../../components/FooterMain/FooterMain";
import NavMain from "../../components/NavMain/NavMain";
const Home = () => {
  const { goTo } = useScreenNavigation();
  return (
    <Container className="page">
      <NavMain />
      <MainBlock>
        <IconButton
          type="button"
          aria-label="Go to connect screen"
          onClick={() => goTo("connect")}
        >
          <HalfCircleBtn />
        </IconButton>
      </MainBlock>
      <MainBlock>
        <IconButton
          type="button"
          aria-label="Go to host screen"
          onClick={() => goTo("host")}
        >
          <RedActiveBtn />
        </IconButton>
      </MainBlock>
      <FooterMain />
    </Container>
  );
};

export default Home;
