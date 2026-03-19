export const getDateTimestamp = (value: string) => Date.parse(value);

export const isValidDateTimestamp = (timestamp: number) =>
  Number.isFinite(timestamp);
