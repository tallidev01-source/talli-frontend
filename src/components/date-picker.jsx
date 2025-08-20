"use client";

import React, { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Helpers
function formatDate(date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

// Add `onDateChange` prop
export function Calendar28({ onDateChange, value }) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(value || new Date());

  // Replace internal date state with controlled value
  const date = value || new Date();

  const formattedDate = formatDate(date);

  useEffect(() => {
    if (value && isValidDate(value)) {
      setMonth(value);
    }
  }, [value]);

  // Notify parent of date change
  const handleDateChange = (newDate) => {
    if (isValidDate(newDate)) {
      onDateChange(newDate);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          value={formattedDate}
          placeholder={formattedDate}
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            handleDateChange(newDate);
          }}
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
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              month={month}
              onMonthChange={setMonth}
              onSelect={(selectedDate) => {
                if (selectedDate) {
                  handleDateChange(selectedDate);
                  setMonth(selectedDate);
                  setOpen(false);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
