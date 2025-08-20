"use client";

import {
  ArrowUpDown,
  Plus,
  BadgeCheck,
  CircleAlert,
  CalendarIcon,
  EllipsisVertical,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const columns = (setDrawerOpen, setSelectedRow) => [
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
      const rowData = row.original;
      const isPaid = row.getValue("paymentMade"); // or rowData.paymentMade
      // const details = row.getValue("paymentDetails"); // or rowData.paymentMade

      console.log(rowData);
      console.log("rowData");
      return (
        <div className="text-wrap items-center gap-5 flex justify-between ">
          <span>{value}</span>
          <Button
            variant="secondary"
            size="sm"
            className="md:hidden"
            disabled={isPaid}
            onClick={() => {
              setSelectedRow(rowData);
              setDrawerOpen(true);
            }}
          >
            {isPaid ? (
              <div className="flex gap-1 justify-start items-center w-[50px] text-green-200">
                <BadgeCheck />
                {/* Paid */}
                {rowData.paymentDetails ? (
                  <div className="">{rowData.paymentDetails.amount}</div>
                ) : (
                  <div className="">asd</div>
                )}
                {/* {details.amount} */}
              </div>
            ) : (
              <div className="flex gap-1 justify-center items-center w-[50px] text-orange-300">
                <Plus />
                Pay
              </div>
            )}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "paymentMade",
    header: ({ column }) => (
      <div className="hidden md:table-cell">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payment
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const rowData = row.original;
      const isPaid = row.getValue("paymentMade");

      return isPaid ? (
        <div className="hidden md:flex gap-1 justify-center items-center w-fit text-green-200">
          <BadgeCheck size={20} />
          <span>{rowData.paymentDetails?.amount}</span>
          Paid
        </div>
      ) : (
        <div className="hidden md:flex gap-1 justify-center items-center w-fit text-orange-300">
          <CircleAlert size={20} />
          Not Paid
        </div>
      );
    },
  },
  {
    accessorKey: "monthlyProgress",
    header: ({ column }) => (
      <div className="">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <h2 className="hidden md:block">Monthly Progress</h2>

          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const value = row.getValue("monthlyProgress");
      const rowData = row.original;

      return (
        <div className="flex items-center gap-5">
          <span>{value}</span>
          <Button className={"hidden md:block"} variant="outline" size="sm">
            <a href={`/view-progress/${rowData._id}`}>View Progress</a>
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "totalMonthlyAmount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <h2 className="hidden md:block">Monthly Total</h2>
        {/* <h2></h2> */}

        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("totalMonthlyAmount");
      return `₱ ${Number(amount).toLocaleString()}`;
    },
  },

  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const rowData = row.original;
      const isPaid = row.getValue("paymentMade"); // or rowData.paymentMade

      return (
        <div className="flex gap-2">
          <Button
            className={
              "md:hidden block bg-transparent outline-0 border-0 hover:bg-transparent"
            }
            variant="outline"
            size="xs"
          >
            <a
              className="py-1 px-2 rounded-sm border-2"
              href={`/view-progress/${rowData._id}`}
            >
              MORE
            </a>
          </Button>
          <Button
            // className={`hidden md:block ${isPaid ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            className={`hidden md:block`}
            variant="secondary"
            disabled={isPaid}
            size="sm"
            onClick={() => {
              setSelectedRow(rowData);
              setDrawerOpen(true);
            }}
          >
            {isPaid ? (
              <div className="flex gap-1 justify-center items-center w-fit text-green-200">
                <BadgeCheck />
                Paid
              </div>
            ) : (
              <div className="flex gap-1 justify-center items-center w-fit ">
                <Plus />
                Add Payment
              </div>
            )}
            {/* Add Payment */}
          </Button>
        </div>
      );
    },
  },
];
