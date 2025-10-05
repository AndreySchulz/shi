import NavMain from "../../components/NavMain/NavMain";
import TableScore from "../../components/TableScore/TableScore";
import { Container } from "./Table.styled";

const Table = () => {
  return (
    <Container className="page">
      <NavMain />
      <TableScore />
    </Container>
  );
};

export default Table;
