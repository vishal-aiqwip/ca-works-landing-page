"use client";

import type { Table } from "@tanstack/react-table";
import { Search, Settings2 } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "..";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  isView?: boolean;
}

/**
 * @file column-toggle.tsx
 * @description Data Table column toggle
 */
export function DataTableViewOptions<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  isView = true,
}: DataTableViewOptionsProps<TData>) {
  // table.getFilteredRowModel().rows.length
  return (
    <div className="flex w-full flex-wrap justify-between gap-3">
      <InputGroup className="max-w-sm">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Type to search..."
          value={globalFilter}
          type="search"
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        {/* {globalFilter && (
          <InputGroupAddon align="inline-end">
            {table.getFilteredRowModel().rows.length} results
          </InputGroupAddon>
        )} */}
      </InputGroup>
      <div className="flex gap-2">
        {isView && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="md"
                className="ml-auto hidden h-auto lg:flex"
              >
                <Settings2 className="mr-2 h-4 w-4" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide(),
                )
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id === "id"
                      ? "Action"
                      : column.id === "isEnabled"
                        ? "Status"
                        : column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
