import styled, { keyframes } from "styled-components";

const halfSlide = keyframes`
  0% {
    transform: translateX(95px); 
  }
  25% {
    transform: translateX(0); 
  }
  50% {
    transform: translateX(0);
  }
  75% {
    transform: translateX(95px);
  }
  100% {
    transform: translateX(95px); 
  }
`;

export const Container = styled.div`
  position: relative;
  width: 148px;
  height: 148px;
  overflow: visible;
`;
export const HalfLeft = styled.div`
  position: absolute;
  width: 74px;
  height: 148px;
  top: 0;
  left: 0;
  background: #e93838;
  border-top-left-radius: 148px;
  border-bottom-left-radius: 148px;
  box-sizing: border-box;
`;
export const Dashed = styled.div`
  position: absolute;
  width: 74px;
  height: 148px;
  top: 0;
  left: 74px;
  border-top-right-radius: 148px;
  border-bottom-right-radius: 148px;
  border: 4px dashed rgba(236, 236, 236, 0.24);
  border-left: none;
  box-sizing: border-box;
  background: transparent;
`;
export const HalfRight = styled.div`
  position: absolute;
  width: 74px;
  height: 148px;
  top: 0;
  left: 74px;
  background: #e93838;
  border-top-right-radius: 148px;
  border-bottom-right-radius: 148px;
  transform: translateX(96px);
  animation: ${halfSlide} 4s ease-in-out infinite;
`;
