import React from "react";
import { X, Clock, CircleAlert, EllipsisVertical } from "lucide-react"; // Clock icon for past dates

const PaymentCalendar = ({
  allDates,
  totalPayments,
  totalPaidDays,
  totalAmount,
  payer,
  setDrawerOpen,
  // selectedPayment,
  setSelectedPayment,
}) => {
  // Prevent crash if allDates is undefined or empty
  if (!allDates || allDates.length === 0) {
    return <div className="p-4">Loading calendar...</div>;
  }

  console.log(payer)
  console.log("payer")

  // Compute blanks before the 1st of the month
  const firstDayIndex = new Date(allDates[0].date).getDay(); // 0 = Sun, ... 6 = Sat
  const leadingBlanks = Array(firstDayIndex).fill(null);

  // Pad to full weeks
  const allCells = [...leadingBlanks, ...allDates];
  const trailingBlanksCount = (7 - (allCells.length % 7)) % 7;
  const calendarCells = [...allCells, ...Array(trailingBlanksCount).fill(null)];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date();
  today.setHours(0, 0, 0, 0); // remove time for accurate comparison

  const formatAmountNumber = (number) => {
    if (number == null || isNaN(number)) return "";
    return number.toLocaleString();
  };

  // Get today's date in PH timezone
  const todayString = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Manila",
  });

  return (
    <div className="pb-10 ">
      <h2 className="text-center text-2xl font-semibold mt-2">
        {/* Payment Status: August 2025 */}
      </h2>
      <p className="text-center mb-3 text-sm">{payer.name}</p>

      <div className="flex justify-between text-sm mb-6 px-2 ">
        <div>
          Total Payments: <span className="font-medium">{totalPayments}</span>
        </div>
        <div>
          Paid Days:{" "}
          <span className="font-medium">
            {totalPaidDays} / {allDates.length}
          </span>
        </div>
        <div>
          Total Amount:{" "}
          <span className="font-medium">{formatAmountNumber(totalAmount)}</span>
          {/* Total Amount: <span className="font-medium">{totalAmount}</span> */}
        </div>
      </div>
      <div className="flex  justify-center items-center gap-3 text-xs font-semibold mb-2">
        <div className="flex justify-center items-center gap-1">
          <div className="w-5 h-3 border-2 rounded border-purple-500 animate-pulse-border-purple"></div>
          <h2>CURRENT DATE</h2>
        </div>
        <div className="flex justify-center items-center gap-1">
          <div className="w-5 h-3 border-2 rounded border-[#90C841]"></div>
          <h2>PAID</h2>
        </div>
        <div className="flex justify-center items-center gap-1">
          <div className="w-5 h-3 border-2 rounded border-[#FFCC08]/90"></div>
          <h2>Past Date</h2>
        </div>
        <div className="flex justify-center items-center gap-1">
          <div className="w-5 h-3 border-2 rounded border-[#00ADF0]"></div>
          <h2>NOT PAID</h2>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 px-2">
        {weekDays.map((wd) => (
          <div
            key={wd}
            className="text-center text-xs font-medium uppercase text-zinc-200 border-2 rounded py-2 hover:border-2 hover:border-zinc-500 transition-all duration-300 "
          >
            {wd}
          </div>
        ))}

        {/* Date Cells */}
        {calendarCells.map((day, idx) => {
          if (!day) {
            return (
              <div
                key={`empty-${idx}`}
                className="h-16 border rounded bg-transparent hover:border-2 hover:border-zinc-700 transition-all duration-300"
              />
            );
          }

          const dayNum = new Date(day.date).getDate();
          const paid = day.paid;
          const amountPayed = day.amount;
          const isPast = new Date(`${day.date}T00:00:00`) < today;

          return (
            <div
              key={day.date}
              onClick={() => {
                if (paid) {
                  // ✅ only trigger when paid is true
                  setDrawerOpen(true);
                  setSelectedPayment({day,payer});
                }
              }}
              className={`
    h-16 rounded flex flex-col items-center justify-between text-sm border-none relative text-center 
    ${
      day.date === todayString
        ? " animate-pulse-border-purple bg-gradient-to-t to-transparent from-purple-500 hover:from-purple-600 transition-colors duration-300 ease-in-out"
        : paid
        ? "  bg-gradient-to-t to-transparent from-[#90C841]/40  hover:from-[#90C841]/50  transition-colors duration-300 ease-in-out"
        : isPast
        ? " bg-gradient-to-t to-transparent from-[#FFCC08]/10  hover:from-[#FFCC08]/50  transition-colors duration-300 ease-in-out"
        : "border-none bg-gradient-to-t to-transparent from-[#00ADF0]/20 hover:from-[#00ADF0]/50  transition-colors duration-300 ease-in-out"
    }
  `}
            >
              <div className="flex justify-center items-center gap-1 w-full relative">
                <span className="font-bold text-lg">{dayNum}</span>
                {/* <span className="absolute right-2 text-xs "><EllipsisVertical opacity={40} className="opacity-50 hover:opacity-100" size={16} /></span> */}
              </div>

              <div className="flex gap-1 absolute bottom-0 lg:bottom-2 left-0 right-0 justify-center">
                <div className="mt-1 font-bold text-wrap ">
                  {paid ? (
                    <div className="flex gap-1 text-xs ">
                      <span className="hidden md:block">&#8369;</span>
                      <span>{formatAmountNumber(amountPayed)}</span>
                    </div>
                  ) : new Date(`${day.date}T00:00:00`) < today ? (
                    <h2 className="text-xs 2xl:text-sm">Past Date</h2>
                  ) : (
                    <h2 className="text-xs 2xl:text-sm">Not Paid</h2>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentCalendar;
