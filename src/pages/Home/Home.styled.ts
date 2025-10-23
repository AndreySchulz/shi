import styled from "styled-components";

export const Container = styled.div`
  background: linear-gradient(180deg, #fff 0%, #19181d 100%);
`;

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainBlock = styled.div`
  width: 100%;
  min-height: 220px;
  margin-bottom: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  border: none;
  background: transparent;
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }
`;
