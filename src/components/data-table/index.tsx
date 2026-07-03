"use client";

import { useState } from "react";

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { RefreshCcwIcon } from "lucide-react";
import { TbError404 } from "react-icons/tb";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDebounce } from "@/hooks";
import { cn } from "@/lib";

import {
  Button,
  DataTableColumnHeader,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "..";
import { DataTableViewOptions } from "./column-toggle";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  noIndexCol?: boolean;
  className?: string;
}

/**
 * @file index.tsx
 * @description Generic, fully-typed Data Table component with column visibility, filtering, sorting & pagination
 * @version 0.0.1
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  noIndexCol = false,
  className,
}: DataTableProps<TData, TValue>) {
  //-------------- State --------------//
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const debouncedGlobalFilter = useDebounce(globalFilter, 300);

  //-------------- Column Enhancement --------------//

  // Add index column automatically if needed
  const enhancedColumns: ColumnDef<TData, TValue>[] = [
    {
      id: "index",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="SR No." />
      ),
      cell: (info) => `${info.row.index + 1}.`,
      size: 20,
    },
    ...columns,
  ];

  //-------------- Table Instance --------------//
  const table = useReactTable({
    data,
    columns: noIndexCol ? columns : enhancedColumns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    // Global filter
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",

    state: {
      sorting,
      columnFilters,
      globalFilter: debouncedGlobalFilter,
      rowSelection,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: 12,
      },
    },
  });

  //-------------- Render --------------//
  return (
    <div className={cn("w-full space-y-4", className)}>
      <DataTableViewOptions
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <div className="w-full overflow-hidden rounded-md border">
        <Table className="relative">
          <TableHeader className="sticky top-0 z-1 bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="pl-4!">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={enhancedColumns.length}>
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <TbError404 />
                      </EmptyMedia>
                      <EmptyTitle>Results not found</EmptyTitle>
                      {globalFilter && (
                        <EmptyDescription>
                          No results found. Please try again with a different
                          filter.
                        </EmptyDescription>
                      )}
                    </EmptyHeader>
                    <EmptyContent>
                      {globalFilter && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGlobalFilter("")}
                        >
                          <RefreshCcwIcon /> Reset filters
                        </Button>
                      )}
                    </EmptyContent>
                  </Empty>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
