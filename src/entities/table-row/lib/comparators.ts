import type { TableRow } from "../model/types";
import { getDateTimestamp } from "@/shared/lib/date/getDateTimestamp";
import { compareNumbers } from "@/shared/lib/number/compareNumbers";

export const compareTableRowsByName = (a: TableRow, b: TableRow) =>
  a.name.localeCompare(b.name, "ru");

export const compareTableRowsByDate = (a: TableRow, b: TableRow) =>
  compareNumbers(getDateTimestamp(a.date), getDateTimestamp(b.date));

export const compareTableRowsByValue = (a: TableRow, b: TableRow) =>
  compareNumbers(a.value, b.value);
