"use client";

import {
  ArrowUpDown,
  Plus,
  UserRoundMinus
} from "lucide-react";

import { Button } from "@/components/ui/button";
// import { DeleteAlertDialog } from './../../components/customUI/deleteAlertDialog';
import DeleteAlertDialog from './../../components/custom/alertDialog';

export const payersColumns = (setDrawerOpen, setSelectedRow,selectedRow,toDeleteRow,setToDeleteRow,handleDelete) => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const value = row.getValue("name");

      return (
        <div className="text-wrap items-center gap-5 flex justify-between ">
          <span>{value}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: ({ column }) => (
      <div className="">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contact
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const value = row.getValue("contact");

      return (
        <div className="text-wrap items-center gap-5 flex justify-between ">
          <span>{value}</span>
        </div>
      );
    },
  },


 {
  id: "actions",
  header: "Actions",
  cell: ({ row }) => {
    const rowData = row.original;
    const isDeleting = toDeleteRow === rowData;
      const isRowSelected = selectedRow === rowData

    return (
      <>
        <div className="flex gap-2">
          {/* Update Info button (unchanged) */}
       
          <Button
            // className={`hidden md:block ${isPaid ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            className={`hidden md:block`}
            variant="secondary"
            disabled={isRowSelected}
            size="sm"
            onClick={() => {
              setSelectedRow(rowData);
            }}
          >
            {isRowSelected ? (
              <div className="flex gap-1 justify-center items-center w-fit text-green-200">
                ...
                Editing
              </div>
            ) : (
              <div className="flex gap-1 justify-center items-center w-fit ">
                <Plus />
                Update Info
              </div>
            )}
            {/* Add Payment */}
          </Button>

          {/* Remove button opens dialog */}
          <Button
            className="bg-gradient-to-l to-transparent from-red-500 hover:from-red-600 transition-colors duration-300 ease-in-out flex "
            variant="secondary"
            size="sm"
            onClick={() => setToDeleteRow(rowData)}
          >
            <UserRoundMinus />
            REMOVE PAYER
          </Button>
        </div>

        {/* DeleteAlertDialog */}
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
