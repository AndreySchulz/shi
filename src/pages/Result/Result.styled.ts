import styled from "styled-components";

export const Container = styled.div`
  background: var(--super-light-dark);
  padding: 0;
  gap: 0;

  & > div:nth-child(1) {
    transform: rotate(180deg);
    background-color: var(--red);
  }
`;
