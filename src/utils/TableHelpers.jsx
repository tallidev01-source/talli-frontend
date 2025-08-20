// components/table/TableHelpers.tsx
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SortableHeader = ({ column, title }) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    className="flex items-center gap-2"
  >
    {title}
    <ArrowUpDown className="h-4 w-4" />
  </Button>
);

export const CellText = ({ value }) => (
  <div className="flex justify-between items-center gap-5 text-wrap">
    <span>{value}</span>
  </div>
);
