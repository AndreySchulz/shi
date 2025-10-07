import Header from "../../components/Header/Header";
import TableScore from "../../components/TableScore/TableScore";
import { Container } from "./Table.styled";

const Table = () => {
  return (
    <Container className="page">
      <Header />
      <TableScore />
    </Container>
  );
};

export default Table;
