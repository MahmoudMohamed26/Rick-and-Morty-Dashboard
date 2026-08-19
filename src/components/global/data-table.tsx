"use client";

import { useState } from "react";
import { flexRender, type SortingState } from "@tanstack/react-table";
import {
  useLegacyTable,
  getCoreRowModel,
  getSortedRowModel,
  type LegacyColumnDef as ColumnDef,
  type LegacyRow as Row,
} from "@tanstack/react-table/legacy";
import { ChevronsUpDown, ChevronUp, ChevronDown, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const SKELETON_ROWS = 10;

export interface DataTableColumn<TData> {
  key: string;
  name: string;
  sortable?: boolean;
  cell?: (value: unknown, row: TData) => React.ReactNode;
  sortingFn?: (a: TData, b: TData) => number;
}

interface DataTableProps<TData extends { id: number | string }> {
  columns: DataTableColumn<TData>[];
  data: TData[];
  isLoading?: boolean;
  entityLabel?: string;
  showRowNumber?: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onView?: (row: TData) => void;
}

function getNestedValue(obj: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce(
      (acc: unknown, key) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      obj
    );
}

export function DataTable<TData extends { id: number | string }>({
  columns,
  data,
  isLoading = false,
  entityLabel = "item",
  showRowNumber = true,
  page = 1,
  totalPages = 1,
  onPageChange,
  onView,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const tanstackColumns: ColumnDef<TData, unknown>[] = [
    ...(showRowNumber
      ? ([
          {
            id: "#",
            header: "#",
            enableSorting: false,
            cell: ({ row }) => {
              const sortedIndex = table
                .getSortedRowModel()
                .rows.findIndex((r: Row<TData>) => r.id === row.id);
              return (sortedIndex >= 0 ? sortedIndex : row.index) + 1;
            },
          },
        ] as ColumnDef<TData, unknown>[])
      : []),
    ...columns.map(
      (col, idx): ColumnDef<TData, unknown> => ({
        id: col.key,
        accessorKey: col.key as never,
        header: col.name,
        enableSorting: col.sortable ?? idx !== 0,
        sortFn: col.sortingFn
          ? (a, b) => col.sortingFn!(a.original, b.original)
          : undefined,
        cell: ({ row }) => {
          const value = getNestedValue(row.original, col.key);

          if (col.cell) {
            return col.cell(value, row.original);
          }

          return value !== undefined && value !== null ? (
            <span>{String(value)}</span>
          ) : (
            "\u2014"
          );
        },
      })
    ),
    ...(onView
      ? ([
          {
            id: "actions",
            header: "Actions",
            enableSorting: false,
            cell: ({ row }) => (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-card text-foreground shadow-sm transition-all hover:scale-105 hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
                  onClick={() => onView(row.original)}
                  title="View"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            ),
          },
        ] as ColumnDef<TData, unknown>[])
      : []),
  ];

  const table = useLegacyTable<TData>({
    data,
    columns: tanstackColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    manualPagination: true,
    pageCount: totalPages,
  });

  const totalCols = tanstackColumns.length;

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      ) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="space-y-4 ">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const sorted = header.column.getIsSorted();
                return (
                  <TableHead
                    key={header.id}
                    className="text-left text-muted-foreground font-semibold"
                  >
                    {header.isPlaceholder ? null : canSort ? (
                      <button
                        type="button"
                        className="flex items-center gap-1 cursor-pointer select-none"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {sorted === "asc" ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : sorted === "desc" ? (
                          <ChevronDown className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronsUpDown className="h-3.5 w-3.5" />
                        )}
                      </button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: SKELETON_ROWS }).map((_, rowIdx) => (
              <TableRow
                key={`skeleton-${rowIdx}`}
                className={rowIdx % 2 === 0 ? "bg-muted/20" : ""}
              >
                {Array.from({ length: totalCols }).map((_, colIdx) => (
                  <TableCell key={`skeleton-cell-${colIdx}`}>
                    <Skeleton className="h-4 w-full rounded" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                className={index % 2 === 0 ? "bg-muted/20" : ""}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={totalCols} className="h-24 text-center">
                No {entityLabel}s found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                text="Prev"
                onClick={() => onPageChange?.(page - 1)}
                aria-disabled={page <= 1}
                className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {getPageNumbers().map((p, i) =>
              p === "..." ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <span className="flex h-9 w-9 items-center justify-center text-muted-foreground">
                    ...
                  </span>
                </PaginationItem>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink
                    isActive={p === page}
                    onClick={() => onPageChange?.(p)}
                    className="cursor-pointer"
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                text="Next"
                onClick={() => onPageChange?.(page + 1)}
                aria-disabled={page >= totalPages}
                className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
