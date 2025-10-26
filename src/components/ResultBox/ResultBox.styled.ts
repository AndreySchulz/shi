import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 50vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  padding-bottom: 60px;
`;

export const RusultGameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconBox = styled.div`
  width: 170px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 35px 0;
  gap: 16px;
`;
export const Icon = styled.svg`
  width: 56px;
  height: 56px;
  stroke: white;
  fill: white;
`;
export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-right: 9px;
  border: none;
  background: transparent;
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }
  stroke: black;
`;
export const Score = styled.p`
  margin: 0;
  font-weight: 590;
  font-size: 48px;
  line-height: 117%;
  letter-spacing: -0.02em;
  text-align: center;
  color: var(--white);
`;
