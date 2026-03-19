import type { TableRow } from "@/entities/table-row";
import { formatTableRowDate } from "@/entities/table-row";
import { normalizeSearchValue } from "@/shared/lib/string/normalizeSearchValue";

export const filterRows = (rows: TableRow[], query: string) => {
  const normalizedQuery = normalizeSearchValue(query);

  if (!normalizedQuery) {
    return rows;
  }

  return rows.filter((row) => {
    const rowValues = [
      row.name,
      row.date,
      formatTableRowDate(row.date),
      String(row.value),
    ];

    return rowValues.some((item) =>
      normalizeSearchValue(item).includes(normalizedQuery)
    );
  });
};
