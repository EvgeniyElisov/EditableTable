import {
  getDateTimestamp,
  isValidDateTimestamp,
} from "@/shared/lib/date/getDateTimestamp";

export type TableRowFormValues = {
  name: string;
  date: string;
  value: number | null;
};

export type TableRowSubmitValues = {
  name: string;
  date: string;
  value: number;
};

export type TableRowValidationErrors = Partial<
  Record<keyof TableRowFormValues, string>
>;

const isValidDateValue = (value: string) => {
  if (!value.trim()) {
    return false;
  }

  const parsed = getDateTimestamp(value);

  return isValidDateTimestamp(parsed);
};

export const validateTableRow = (
  values: TableRowFormValues
): TableRowValidationErrors => {
  const errors: TableRowValidationErrors = {};

  if (!values.name.trim()) {
    errors.name = "Имя обязательно";
  }

  if (!isValidDateValue(values.date)) {
    errors.date = "Укажите корректную дату";
  }

  if (values.value === null || Number.isNaN(values.value)) {
    errors.value = "Укажите числовое значение";
  }

  return errors;
};
