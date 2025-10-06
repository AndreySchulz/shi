import styled from "styled-components";

export const Navigate = styled.div`
  width: 100%;
  height: 88px;
  padding: 16px 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
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
`;

export const Icon = styled.svg`
  width: 28px;
  height: 28px;
`;
