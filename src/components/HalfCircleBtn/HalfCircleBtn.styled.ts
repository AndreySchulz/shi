import styled, { keyframes } from "styled-components";

const halfSlide = keyframes`
0% {
    transform: translateX(95px);
    opacity: 0;           /* невидим в начале */
  }
  25% {
    transform: translateX(0);
    opacity: 1;           /* приехал и появился */
  }
  50% {
    transform: translateX(0);
    opacity: 1;           /* стоит, видимый */
  }
  60% {
    transform: translateX(0);
    opacity: 0;           /* начинает исчезать */
  }
  100% {
    transform: translateX(95px);
    opacity: 0;           /* вернулся в начало, невидим */
  }
`;

export const Container = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  overflow: visible;
`;
export const HalfLeft = styled.div`
  position: absolute;
  width: 50px;
  height: 100px;
  top: 0;
  left: 0;
  background: var(--red);
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  box-sizing: border-box;
`;
export const Dashed = styled.div`
  position: absolute;
  width: 50px;
  height: 100px;
  top: 0;
  left: 50px;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  border: 4px dashed rgba(236, 236, 236, 0.24);
  border-left: none;
  box-sizing: border-box;
  background: transparent;
`;
export const HalfRight = styled.div`
  position: absolute;
  width: 50px;
  height: 100px;
  top: 0;
  left: 50px;
  background: var(--red);
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  transform: translateX(96px);
  animation: ${halfSlide} 4s ease-in-out infinite;
`;
