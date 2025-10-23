import styled from "styled-components";

export const TableIcon = styled.svg`
  width: 20px;
  height: 20px;
  stroke: var(--grey);
`;
export const TableTh = styled.th`
  text-align: center;
  color: var(--grey);

  padding: 10px 0;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #f5f7fb;
  backdrop-filter: blur(6px);

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: rgba(140, 138, 145, 0.12);
  }
`;
export const TableTd = styled.td`
  padding: 14px 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.06em;
  text-align: center;
  color: var(--dark);
  &:first-child {
    width: 44px;
  }
`;
export const NameInTr = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.06em;
  text-align: center;
  color: var(--dark);
  display: block;
`;
export const RankCircle = styled.span<{ index: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;

  font-weight: 600;
  color: white;
  color: ${({ index }) => (index <= 3 ? "white" : "var(--dark)")};
  background-color: ${({ index }) =>
    index === 1
      ? "#ffbf00"
      : index === 2
      ? "#aaa"
      : index === 3
      ? "#ae9976"
      : "var(--light-gray)"};
`;
export const TableWrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 88px;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 12px;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
