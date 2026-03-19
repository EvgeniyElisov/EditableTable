"use client";

import { useState } from "react";

import type { TableRow, TableRowSubmitValues } from "@/entities/table-row";

type ManageTableRowMode = "add" | "edit";

type UseManageTableRowParams = {
  onAdd: (values: TableRowSubmitValues) => void;
  onEdit: (rowId: string, values: TableRowSubmitValues) => void;
};

export const useManageTableRow = ({
  onAdd,
  onEdit,
}: UseManageTableRowParams) => {
  const [mode, setMode] = useState<ManageTableRowMode>("add");
  const [editingRow, setEditingRow] = useState<TableRow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAddModal = () => {
    setMode("add");
    setEditingRow(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (row: TableRow) => {
    setMode("edit");
    setEditingRow(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitModal = (values: TableRowSubmitValues) => {
    if (mode === "add") {
      onAdd(values);
      setIsModalOpen(false);
      return;
    }

    if (!editingRow) {
      return;
    }

    onEdit(editingRow.id, values);
    setIsModalOpen(false);
  };

  return {
    mode,
    editingRow,
    isModalOpen,
    handleOpenAddModal,
    handleOpenEditModal,
    handleCloseModal,
    handleSubmitModal,
  };
};
