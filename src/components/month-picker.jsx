"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

export function MonthPicker({ onMonthChange, value,selectedMonthYear }) {

  const initialDate = value && isValidDate(value) ? value : new Date();

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const monthNames = useMemo(
    () => [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    []
  );

  // Computed display value for input


  // Sync with external value
  useEffect(() => {
    if (value && isValidDate(value)) {
      setSelectedDate(value);
    }
  }, [value]);

  const handleMonthSelect = (monthIndex) => {
    const newDate = new Date(selectedDate.getFullYear(), monthIndex, 1);
    setSelectedDate(newDate);
    onMonthChange?.({
      month: monthIndex + 1,
      year: newDate.getFullYear(),
      monthName: monthNames[monthIndex],
    });
    setOpen(false);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    if (!isNaN(newYear)) {
      const newDate = new Date(newYear, selectedDate.getMonth(), 1);
      setSelectedDate(newDate);
      onMonthChange?.({
        month: newDate.getMonth() + 1,
        year: newDate.getFullYear(),
        monthName: monthNames[newDate.getMonth()],
      });
    }
  };

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          value={`${selectedMonthYear.monthName} | ${selectedMonthYear.year}`}
          placeholder="Select month and year"
          readOnly
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="month-year-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-4"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <div className="flex flex-col gap-4">
              {/* Year Selector */}
              <select
                value={selectedDate.getFullYear()}
                onChange={handleYearChange}
                className="border rounded px-2 py-1 bg-[#27272A] outline-2 outline-slate-200"
              >
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>

              {/* Month Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {monthNames.map((name, i) => (
                  <Button
                    key={i}
                    className="bg-[#27272A] hover:bg-[#17171A]"
                    variant={
                      i === selectedDate.getMonth() ? "default" : "outline"
                    }
                    onClick={() => handleMonthSelect(i)}
                  >
                    {name.slice(0, 3)}
                  </Button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
