import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import sprite from "../../common/image/svg/sprite.svg";
import type { ColumnDef, Row } from "@tanstack/react-table";
import {
  TableIcon,
  TableTd,
  TableTh,
  NameInTr,
  RankCircle,
} from "./TableScore.styled";

type Person = {
  name: string;
  game: number;
  score: string;

  procent: string;
};

const data: Person[] = [
  { name: "Alex", game: 28, score: "521", procent: "73" },
  { name: "Mia", game: 32, score: "525", procent: "68" },
  { name: "Ethan", game: 19, score: "418", procent: "82" },
  { name: "Liam", game: 24, score: "600", procent: "71" },
  { name: "Olivia", game: 30, score: "750", procent: "76" },
  { name: "Noah", game: 27, score: "630", procent: "69" },
  { name: "Ava", game: 21, score: "555", procent: "75" },
  { name: "Sophia", game: 26, score: "490", procent: "70" },
  { name: "James", game: 33, score: "610", procent: "78" },
  { name: "Isabella", game: 29, score: "580", procent: "72" },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  {
    id: "index",
    header: "#",
    cell: ({ row }: { row: Row<Person> }) => {
      const index = row.index + 1;
      return <RankCircle index={index}>{index}</RankCircle>;
    },
  },
  columnHelper.accessor("name", {
    header: "",
    cell: ({ getValue }) => <NameInTr>{getValue()}</NameInTr>,
  }),
  columnHelper.accessor("game", {
    header: () => (
      <TableIcon>
        <use href={`${sprite}#MedalStarCircle`} />
      </TableIcon>
    ),
  }),
  columnHelper.accessor("score", {
    header: () => (
      <TableIcon>
        <use href={`${sprite}#Spedometer`} />
      </TableIcon>
    ),
  }),
  columnHelper.accessor("procent", {
    header: () => (
      <TableIcon>
        <use href={`${sprite}#arrows`} />
      </TableIcon>
    ),
  }),
] as ColumnDef<Person>[];

const TableScore: React.FC = () => {
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => Number(a.score) - Number(b.score)); // по возрастанию
  }, []);

  const table = useReactTable<Person>({
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableTh key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableTh>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableTd key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableTd>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableScore;
