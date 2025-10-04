import styled from "styled-components";

export const FooterBox = styled.div`
  width: 100%;
  height: 60px;
  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--super-light-dark);
`;
export const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const InfoText = styled.p`
  font-size: 18px;
  line-height: 156%;
  letter-spacing: -0.06em;
  text-align: center;
  color: var(--super-light-grey);
`;

export const HoldText = styled.span`
  font-weight: 400;
  color: var(--grey);
`;

export const Icon = styled.svg`
  width: 28px;
  height: 28px;
  margin-right: 9px;
  stroke: var(--red);
`;
