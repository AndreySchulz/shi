import { Container, MainCircle, Radiant } from "./RedActiveBtn.styled.ts";

const RedActiveBtn = () => {
  return (
    <Container>
      <MainCircle />
      <Radiant delay="1s" />
      <Radiant delay="2s" />
    </Container>
  );
};

export default RedActiveBtn;
