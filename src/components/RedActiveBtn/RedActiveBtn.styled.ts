import styled, { keyframes, css } from "styled-components";

type RadiantProps = {
  delay?: number | string;
  active?: boolean;
};

const ripple = keyframes`
  0% {
    transform: scale(1);
    border-color: var(--super-light-grey);
    border-width: 7px;
    border-style: solid;
    opacity: 1;
  }
  100% {
    transform: scale(3);
    border-color: rgba(236, 236, 236, 0.24);
    border-width: 7px;
    border-style: solid;
    opacity: 0;
  }
`;

export const Container = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;
export const MainCircle = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--red);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25), 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;
export const Radiant = styled.div<RadiantProps>`
  position: absolute;
  inset: 0;
  border-radius: 50%;

  ${({ active, delay }) =>
    active
      ? css`
          animation: ${ripple} 2s linear infinite;
          animation-delay: ${typeof delay === "number"
            ? `${delay}s`
            : delay || "0s"};
        `
      : css`
          animation: none;
        `}
`;
