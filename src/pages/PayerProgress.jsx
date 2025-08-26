import React, { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getMyPayersPayment, } from "../store/reducers/paymentReducer";
import PaymentCalendar from "../components/date-payed-shower";
import { MonthPicker } from "../components/month-picker";
import { ChartBarStacked } from "../components/charts/bar-chart";
import { EditPaymentDrawer } from "./../components/payment-edit-form";

const PayerProgress = () => {
  const dispatch = useDispatch();
  const { payerId } = useParams();
  // const hasFetched = useRef(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // const [setSelectedDate,selectedDate] = useState(null);

  const {
    totalPayments,
    totalPaidDays,
    totalAmount,
    allDates,
    loader,
    payer,
    chartData,
    editUpdate
  } = useSelector((state) => state.payment);
 const prevEditUpdate = useRef(editUpdate); // ✅ declare at top level
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = useMemo(() => new Date(), []);
  const [selectedMonthYear, setSelectedMonthYear] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
    monthName: monthNames[currentDate.getMonth() + 1],
  });

  // 🔹 Always fetch when payerId or selectedMonthYear changes
  useEffect(() => {
    if (payerId) {
      dispatch(
        getMyPayersPayment({
          payerId,
          year: selectedMonthYear.year,
          month: selectedMonthYear.month,
        })
      );
    }
  }, [payerId, selectedMonthYear, dispatch]);

  // 🔹 Fetch again when editUpdate goes from false -> true
  useEffect(() => {
    if (prevEditUpdate.current === false && editUpdate === true && payerId) {
      dispatch(
        getMyPayersPayment({
          payerId,
          year: selectedMonthYear.year,
          month: selectedMonthYear.month,
        })
      );
    }

    prevEditUpdate.current = editUpdate;
  }, [editUpdate, payerId, selectedMonthYear, dispatch]);


  const handleMonthChange = (data) => {
    setSelectedMonthYear(data);
    if (payerId) {
      dispatch(
        getMyPayersPayment({
          payerId,
          year: data.year,
          month: data.month,
        })
      );
    }
  };

  return (
    <div className="w-full h-full p-3 flex flex-col lg:flex-row">
      <div className="lg:w-9/12">
        {loader ? (
          <div>Loading payment data...</div>
        ) : allDates ? (
          <div className="p-2">
            <div className="w-full flex flex-col-reverse gap-1.5 md:justify-between items-center">
              <h2 className="font-bold text-xl text-center">
                PAYMENT PROGRESS FOR{" "}
                <span className="uppercase">
                  {monthNames[selectedMonthYear.month - 1]}
                </span>
              </h2>
              <div className="w-fit self-end">
                <MonthPicker
                  onMonthChange={handleMonthChange}
                  selectedMonthYear={selectedMonthYear}
                />
              </div>
            </div>
            <PaymentCalendar
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
              setDrawerOpen={setDrawerOpen}
              totalPayments={totalPayments}
              totalPaidDays={totalPaidDays}
              totalAmount={totalAmount}
              allDates={allDates}
              payer={payer}
            />
          </div>
        ) : (
          <div>No payment data available.</div>
        )}
      </div>
      <div className="lg:w-5/12 h-full ">
        <div className="w-full h-full flex justify-center items-center gap-2">
          <div className="w-full">
            {chartData ? <div className=""></div> : <div className=""></div>}
            <ChartBarStacked
              chartData={chartData}
              selectedMonthYear={selectedMonthYear}
            />
          </div>
        </div>
      </div>

      <EditPaymentDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        selectedPayment={selectedPayment}
        // selectedRow={selectedRow}
        // selectedDate={selectedDate}
        // setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default PayerProgress;
