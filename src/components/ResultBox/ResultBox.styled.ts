import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const RusultGameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 54px 0;
`;

export const IconBox = styled.div`
  width: 170px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  gap: 16px;
`;
export const Icon = styled.svg`
  width: 56px;
  height: 56px;
  stroke: white;
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
