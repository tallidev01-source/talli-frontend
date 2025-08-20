"use client";

import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar28 } from "@/components/date-picker";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PaymentDrawer } from "@/components/payment-add-form"; 

/**
 * @param {{ columns: any[], data: any[] }} props
 */
export function DataTable({ columns, data ,setSelectedDate,selectedDate,toDeleteRow,setToDeleteRow}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  



  const table = useReactTable({
    data,
   columns: columns(setDrawerOpen, setSelectedRow,toDeleteRow,setToDeleteRow), 
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  // const [selectedDate] = useState(null);

  return (
    <div className="w-full">
      {/* Filter + Calendar */}
      <div className="flex flex-col-reverse gap-3 md:flex-row justify-center items-center md:justify-between py-4 md:items-end ">
        <Input
          placeholder="Search Name..."
          value={table.getColumn("name")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="lg:max-w-sm max-w-full"
        />

        <div className="self-end flex md:flex-col justify-between items-center md:items-end w-full md:w-fit">
          <h1 className="text-sm font-bold text-end pr-2 md:mb-1 ">
            {selectedDate?.toLocaleDateString("en-US", { weekday: "long" }) || "None"}
          </h1>
         <Calendar28 onDateChange={setSelectedDate} value={selectedDate} />

        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 p-4 text-xs">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      {/* Drawer */}
      < PaymentDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        selectedRow={selectedRow}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      
        
      />
    </div>
  );
}
