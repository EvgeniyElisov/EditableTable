import {
  getDateTimestamp,
  isValidDateTimestamp,
} from "@/shared/lib/date/getDateTimestamp";

const tableDateFormatter = new Intl.DateTimeFormat("ru-RU");

export const formatTableRowDate = (isoDate: string) => {
  const parsed = getDateTimestamp(isoDate);

  if (!isValidDateTimestamp(parsed)) {
    return isoDate;
  }

  return tableDateFormatter.format(new Date(parsed));
};

export const formatIsoDateForInput = (isoDate: string) => {
  const parsed = getDateTimestamp(isoDate);

  if (!isValidDateTimestamp(parsed)) {
    return "";
  }

  return new Date(parsed).toISOString().slice(0, 10);
};

export const toIsoDateFromInput = (dateValue: string) => {
  if (!dateValue.trim()) {
    return "";
  }

  const parsed = getDateTimestamp(dateValue);

  if (!isValidDateTimestamp(parsed)) {
    return "";
  }

  return new Date(parsed).toISOString();
};
