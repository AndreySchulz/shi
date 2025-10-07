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
  TableWrapper,
} from "./TableScore.styled";

type Person = {
  name: string;
  game: number;
  score: string;

  procent: string;
};

const data: Person[] = [
  { name: "Harper", game: 19, score: "435", procent: "83" },
  { name: "Mason", game: 31, score: "622", procent: "74" },
  { name: "Ella", game: 24, score: "571", procent: "72" },
  { name: "Logan", game: 28, score: "605", procent: "75" },
  { name: "Grace", game: 22, score: "489", procent: "69" },
  { name: "Lucas", game: 33, score: "731", procent: "78" },
  { name: "Chloe", game: 25, score: "518", procent: "73" },
  { name: "Henry", game: 27, score: "642", procent: "77" },
  { name: "Zoe", game: 30, score: "697", procent: "79" },
  { name: "Jack", game: 20, score: "461", procent: "70" },
  { name: "Scarlett", game: 29, score: "623", procent: "76" },
  { name: "Owen", game: 23, score: "512", procent: "71" },
  { name: "Layla", game: 32, score: "729", procent: "80" },
  { name: "Elijah", game: 26, score: "581", procent: "74" },
  { name: "Nora", game: 18, score: "425", procent: "81" },
  { name: "Caleb", game: 21, score: "488", procent: "68" },
  { name: "Hazel", game: 24, score: "534", procent: "73" },
  { name: "Wyatt", game: 27, score: "615", procent: "75" },
  { name: "Violet", game: 22, score: "499", procent: "72" },
  { name: "Daniel", game: 30, score: "693", procent: "78" },
  { name: "Evelyn", game: 25, score: "563", procent: "74" },
  { name: "Nathan", game: 19, score: "441", procent: "82" },
  { name: "Lucy", game: 28, score: "614", procent: "76" },
  { name: "Carter", game: 33, score: "742", procent: "79" },
  { name: "Hannah", game: 21, score: "496", procent: "70" },
  { name: "Levi", game: 29, score: "628", procent: "77" },
  { name: "Luna", game: 23, score: "523", procent: "71" },
  { name: "Sebastian", game: 27, score: "603", procent: "75" },
  { name: "Aria", game: 20, score: "478", procent: "69" },
  { name: "Julian", game: 32, score: "718", procent: "80" },
  { name: "Ella", game: 18, score: "429", procent: "82" },
  { name: "Matthew", game: 24, score: "556", procent: "74" },
  { name: "Avery", game: 26, score: "589", procent: "75" },
  { name: "Gabriel", game: 31, score: "707", procent: "78" },
  { name: "Sofia", game: 19, score: "437", procent: "81" },
  { name: "Isaac", game: 22, score: "495", procent: "70" },
  { name: "Harper", game: 28, score: "624", procent: "76" },
  { name: "Liam", game: 25, score: "578", procent: "73" },
  { name: "Aurora", game: 30, score: "688", procent: "79" },
  { name: "Mila", game: 23, score: "519", procent: "72" },
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
    return [...data].sort((a, b) => Number(a.score) - Number(b.score));
  }, []);

  const table = useReactTable<Person>({
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableWrapper>
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
    </TableWrapper>
  );
};

export default TableScore;
