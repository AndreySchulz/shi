import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import sprite from "../../common/image/svg/sprite.svg";
import type { ColumnDef, Row } from "@tanstack/react-table";

type Person = {
  name: string;
  game: string;
  score: string;

  procent: string;
};

const data: Person[] = [
  { name: "SHI", game: "28", score: "521", procent: "73" },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  {
    id: "index",
    header: "#",
    cell: ({ row }: { row: Row<Person> }) => row.index + 1,
  },
  columnHelper.accessor("name", { header: "" }),
  columnHelper.accessor("game", {
    header: () => (
      <svg width={20} height={20}>
        <use href={`${sprite}#MedalStarCircle`} />
      </svg>
    ),
  }),
  columnHelper.accessor("score", {
    header: () => (
      <svg width={20} height={20}>
        <use href={`${sprite}#Spedometer`} />
      </svg>
    ),
  }),
  columnHelper.accessor("procent", {
    header: () => (
      <svg width={20} height={20}>
        <use href={`${sprite}#arrows`} />
      </svg>
    ),
  }),
] as ColumnDef<Person>[];

const TableScore: React.FC = () => {
  const table = useReactTable<Person>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{
                  borderBottom: "2px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                style={{ borderBottom: "1px solid #eee", padding: "8px" }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableScore;
