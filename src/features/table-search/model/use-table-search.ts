"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";

export const useTableSearch = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleResetSearch = () => {
    setSearchValue("");
  };

  return {
    searchValue,
    handleSearchChange,
    handleResetSearch,
  };
};
