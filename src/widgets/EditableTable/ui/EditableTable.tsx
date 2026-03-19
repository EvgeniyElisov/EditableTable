"use client";

import { Button, Card, Empty, Flex, Grid, Popconfirm, Space, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useCallback, useMemo, useState } from "react";

import {
  compareTableRowsByDate,
  compareTableRowsByName,
  compareTableRowsByValue,
  formatTableRowDate,
} from "@/entities/table-row";
import type { TableRow, TableRowSubmitValues } from "@/entities/table-row";
import { TableRowModal, useManageTableRow } from "@/features/manage-table-row";
import { filterRows, TableSearchInput, useTableSearch } from "@/features/table-search";

export const EditableTable = () => {
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;
  const [rows, setRows] = useState<TableRow[]>([]);
  const { searchValue, handleSearchChange, handleResetSearch } = useTableSearch();

  const handleAddRow = useCallback((values: TableRowSubmitValues) => {
    const rowId = crypto.randomUUID();

    setRows((prevRows) => [...prevRows, { id: rowId, ...values }]);
  }, []);

  const handleEditRow = useCallback((rowId: string, values: TableRowSubmitValues) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id !== rowId) {
          return row;
        }

        return {
          ...row,
          ...values,
        };
      })
    );
  }, []);

  const handleDeleteRow = useCallback((rowId: string) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
  }, []);

  const {
    mode,
    editingRow,
    isModalOpen,
    handleOpenAddModal,
    handleOpenEditModal,
    handleCloseModal,
    handleSubmitModal,
  } = useManageTableRow({
    onAdd: handleAddRow,
    onEdit: handleEditRow,
  });

  const dataSource = useMemo(
    () => filterRows(rows, searchValue),
    [rows, searchValue]
  );

  const columns: TableColumnsType<TableRow> = useMemo(
    () => [
      {
        title: "Имя",
        dataIndex: "name",
        key: "name",
        sorter: compareTableRowsByName,
      },
      {
        title: "Дата",
        dataIndex: "date",
        key: "date",
        render: (value: TableRow["date"]) => formatTableRowDate(value),
        sorter: compareTableRowsByDate,
      },
      {
        title: "Числовое значение",
        dataIndex: "value",
        key: "value",
        sorter: compareTableRowsByValue,
      },
      {
        title: "Действия",
        key: "actions",
        render: (_, row) => (
          <Space direction={isMobile ? "vertical" : "horizontal"} size={8}>
            <Button
              size={isMobile ? "small" : "middle"}
              aria-label={`Редактировать строку ${row.name}`}
              onClick={() => handleOpenEditModal(row)}
            >
              Редактировать
            </Button>
            <Popconfirm
              title="Удалить строку?"
              okText="Удалить"
              cancelText="Отмена"
              onConfirm={() => handleDeleteRow(row.id)}
            >
              <Button
                danger
                size={isMobile ? "small" : "middle"}
                aria-label={`Удалить строку ${row.name}`}
              >
                Удалить
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [handleDeleteRow, handleOpenEditModal, isMobile]
  );

  return (
    <Card className="tableCard" size={isMobile ? "small" : "default"}>
      <Flex vertical gap={isMobile ? 12 : 16}>
        <Flex justify="flex-start">
          <Button
            type="primary"
            size={isMobile ? "small" : "middle"}
            aria-label="Добавить строку"
            onClick={handleOpenAddModal}
          >
            Добавить
          </Button>
        </Flex>
        <TableSearchInput
          value={searchValue}
          onChange={handleSearchChange}
          onClear={handleResetSearch}
        />
        <Table<TableRow>
          rowKey="id"
          dataSource={dataSource}
          columns={columns}
          bordered
          size={isMobile ? "small" : "middle"}
          scroll={isMobile ? { x: 720 } : undefined}
          locale={{
            emptyText: searchValue ? (
              <Empty description="По вашему запросу ничего не найдено" />
            ) : (
              <Empty description="Таблица пока пустая" />
            ),
          }}
        />
      </Flex>
      <TableRowModal
        key={`${mode}-${editingRow?.id ?? "new"}-${String(isModalOpen)}`}
        mode={mode}
        row={editingRow}
        isOpen={isModalOpen}
        onCancel={handleCloseModal}
        onSubmit={handleSubmitModal}
      />
    </Card>
  );
};
