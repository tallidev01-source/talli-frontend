import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPayers } from ".././store/reducers/paymentReducer";
// import { getMyPayers } from '/store/reducers/payerReducer';

import { payersColumns } from "../app/payments/payers-columns";
import { PayersTable } from "../app/payments/payers-table";
import { PayerAddForm } from "./../components/user-add-form";
import DeleteAlertDialog from "./../components/custom/alertDialog";
import { removePayer } from "@/store/reducers/payerReducer";

const PayersList = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { myPayers } = useSelector((state) => state.payer);

  // ✅ New (defaults to today)
  const [selectedDate, setSelectedDate] = useState(new Date());

  // isEditing State
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [toDeleteRow, setToDeleteRow] = useState(null);

  console.log(toDeleteRow);
  console.log("toDeleteRow");

  useEffect(() => {
    if (userInfo) {
      dispatch(getMyPayers({ selectedDate }));
    }
  }, [userInfo, dispatch, selectedDate]);

  useEffect(() => {
    console.log("Selected date from child:", selectedDate);
    setSelectedDate(selectedDate);
  }, [selectedDate]);

  function handleDelete(payerId) {
    // perform your deletion logic (API call, state update…)
    dispatch(removePayer(payerId))
    console.log("Deleting payer with id:", payerId);
  }

  return (
    <div className="w-full h-full p-3">
      <h2 className="font-bold text-lg">Payers List</h2>
      <div className="grid lg:grid-cols-12 gap-3">
        <div className="md:col-span-8">
          <PayersTable
            columns={payersColumns}
            data={myPayers}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            toDeleteRow={toDeleteRow}
            setToDeleteRow={setToDeleteRow}
            handleDelete={handleDelete}
          />
        </div>
        <div className="lg:col-span-4 flex justify-center items-center">
          <PayerAddForm
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            
          />
        </div>
      </div>

      <div className="">
        <DeleteAlertDialog
          isOpen={Boolean(toDeleteRow)}
          title="Delete Payer"
          message={`Really delete ${toDeleteRow?.name}?`}
          onConfirm={() => {
            handleDelete(toDeleteRow._id);
            setToDeleteRow(null);
          }}
          onCancel={() => setToDeleteRow(null)}
        />
      </div>
    </div>
  );
};

export default PayersList;
