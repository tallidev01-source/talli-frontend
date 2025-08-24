import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPayers } from "../store/reducers/paymentReducer";
import { columns } from "../app/payments/columns";
import { DataTable } from "../app/payments/data-table";
// import toast from "react-hot-toast";

const UserPaymentsList = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { myPayers } = useSelector((state) => state.payment);

  // ✅ Default to today
  const [selectedDate, setSelectedDate] = useState(new Date());


console.log(selectedDate)
console.log("selectedDate--------------------")

  // ✅ Fetch payers whenever userInfo or selectedDate changes
  useEffect(() => {
    if (userInfo) {
      // toast.success(selectedDate)
      console.log(selectedDate)
      dispatch(getMyPayers({ selectedDate }));
    }
  }, [userInfo, dispatch, selectedDate]);

  return (
    <div className="w-full h-full p-3">
      <DataTable
        columns={columns}
        data={myPayers}
        setSelectedDate={setSelectedDate} // pass setter down so child can update date
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default UserPaymentsList;
