"use client";

import { Input } from "antd";
import type { ChangeEvent } from "react";

type TableSearchInputProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};

export const TableSearchInput = ({
  value,
  onChange,
  onClear,
}: TableSearchInputProps) => (
  <Input
    className="editableTable__search"
    allowClear
    value={value}
    onChange={onChange}
    onClear={onClear}
    placeholder="Поиск по таблице"
    aria-label="Поиск по таблице"
  />
);
