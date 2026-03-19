"use client";

import { Form, Grid, Input, InputNumber, Modal } from "antd";
import { useState } from "react";
import type { ChangeEvent } from "react";

import {
  formatIsoDateForInput,
  toIsoDateFromInput,
  validateTableRow,
} from "@/entities/table-row";
import type {
  TableRow,
  TableRowFormValues,
  TableRowSubmitValues,
} from "@/entities/table-row";

type TableRowModalProps = {
  mode: "add" | "edit";
  isOpen: boolean;
  row: TableRow | null;
  onCancel: () => void;
  onSubmit: (values: TableRowSubmitValues) => void;
};

const getInitialValues = (row: TableRow | null): TableRowFormValues => ({
  name: row?.name ?? "",
  date: row ? formatIsoDateForInput(row.date) : "",
  value: row?.value ?? null,
});

export const TableRowModal = ({
  mode,
  isOpen,
  row,
  onCancel,
  onSubmit,
}: TableRowModalProps) => {
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.sm;
  const [values, setValues] = useState<TableRowFormValues>(getInitialValues(row));
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  const errors = validateTableRow(values);

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({ ...prevValues, name: event.target.value }));
  };

  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({ ...prevValues, date: event.target.value }));
  };

  const handleChangeValue = (value: number | null) => {
    setValues((prevValues) => ({ ...prevValues, value }));
  };

  const handleSubmit = () => {
    setIsSubmitAttempted(true);

    if (Object.keys(errors).length > 0) {
      return;
    }

    onSubmit({
      name: values.name.trim(),
      date: toIsoDateFromInput(values.date),
      value: values.value as number,
    });
  };

  return (
    <Modal
      title={mode === "add" ? "Добавить строку" : "Редактировать строку"}
      open={isOpen}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText={mode === "add" ? "Добавить" : "Сохранить"}
      cancelText="Отмена"
      width={isMobile ? "calc(100vw - 24px)" : 520}
      destroyOnHidden
    >
      <Form layout="vertical">
        <Form.Item
          label="Имя"
          validateStatus={isSubmitAttempted && errors.name ? "error" : ""}
          help={isSubmitAttempted ? errors.name : undefined}
        >
          <Input value={values.name} onChange={handleChangeName} />
        </Form.Item>
        <Form.Item
          label="Дата"
          validateStatus={isSubmitAttempted && errors.date ? "error" : ""}
          help={isSubmitAttempted ? errors.date : undefined}
        >
          <Input type="date" value={values.date} onChange={handleChangeDate} />
        </Form.Item>
        <Form.Item
          label="Числовое значение"
          validateStatus={isSubmitAttempted && errors.value ? "error" : ""}
          help={isSubmitAttempted ? errors.value : undefined}
        >
          <InputNumber
            style={{ width: "100%" }}
            value={values.value}
            onChange={handleChangeValue}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
