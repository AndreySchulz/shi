import { useState } from "react";
import { Container, MainCircle, Radiant } from "./RedActiveBtn.styled.ts";

const RedActiveBtn = () => {
  const [active, setActive] = useState(true);

  const handleTouchStart = () => setActive(false);
  const handleTouchEnd = () => setActive(true);
  return (
    <Container onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <MainCircle />
      <Radiant delay="1s" active={active} />
      <Radiant delay="2s" active={active} />
    </Container>
  );
};

export default RedActiveBtn;
