"use client";

import {
  ArrowUpDown,
  Plus,
  UserRoundMinus,
  // optional: MoreHorizontal for dropdown trigger
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import DeleteAlertDialog from "@/components/custom/alertDialog";

export const payersColumns = (
  setDrawerOpen,
  setSelectedRow,
  selectedRow,
  toDeleteRow,
  setToDeleteRow,
  handleDelete
) => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-wrap flex justify-between items-center gap-5">
          <span>{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Contact
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-wrap flex justify-between items-center gap-5">
        <span>{row.getValue("contact")}</span>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const rowData = row.original;
      const isDeleting = toDeleteRow === rowData;
      const isRowSelected = selectedRow === rowData;

      return (
        <>
          {/* Inline buttons on md+ */}
          <div className="hidden md:flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={isRowSelected}
              onClick={() => setSelectedRow(rowData)}
            >
              {isRowSelected ? (
                <div className="flex items-center gap-1 text-green-200">
                  … Editing
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Plus />
                  Update Info
                </div>
              )}
            </Button>
            <Button
              className="bg-gradient-to-l from-red-500 to-transparent hover:from-red-600"
              variant="secondary"
              size="sm"
              onClick={() => setToDeleteRow(rowData)}
            >
              <UserRoundMinus />
              REMOVE PAYER
            </Button>
          </div>

          {/* Dropdown on small screens */}
          <div className="flex md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  •••
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onSelect={() => setSelectedRow(rowData)}
                  disabled={isRowSelected}
                >
                  {isRowSelected ? "Editing" : "Update Info"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setToDeleteRow(rowData)}
                >
                  REMOVE PAYER
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Confirm delete dialog */}
          <DeleteAlertDialog
            isOpen={isDeleting}
            title="Delete Payer"
            message={`Are you sure you want to delete ${rowData.name}?`}
            onConfirm={() => {
              handleDelete(rowData._id);
              setToDeleteRow(null);
            }}
            onCancel={() => setToDeleteRow(null)}
          />
        </>
      );
    },
  },
];
