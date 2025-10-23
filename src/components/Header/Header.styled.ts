import styled from "styled-components";

export const Navigate = styled.div`
  position: fixed;
  top: 0;

  width: 100%;
  height: 88px;
  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #f5f7fb;
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

export const Icon = styled.svg`
  width: 28px;
  height: 28px;
`;
