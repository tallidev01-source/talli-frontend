import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const addPayment = createAsyncThunk(
  "payment/addPayment",
  async (
    { amount, paymentMethod, payerId, paidAt },
    { fulfillWithValue, rejectWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.post(
        "/payment/add-payment",
        {
          amount,
          paymentMethod,
          payerId,
          paidAt,
        },
        config
      );

      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getMyPayers = createAsyncThunk(
  "auth/getMyPayers",
  async ({ selectedDate }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await api.get(
        `/payer/get-my-payers/${selectedDate}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);
export const getMyPayersPayment = createAsyncThunk(
  "payments/getMyPayersPayment",
  async (
    { payerId, year, month },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {

    const { token } = getState().auth;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await api.get(
        `/payment/get-payer-payment?payerId=${payerId}&year=${year}&month=${month}`,
        config
      );

      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

export const paymentReducer = createSlice({
  name: "payment",
  initialState: {
    loader: false,
    errorMessage: "",
    successMessage: "",
    payers: {},
    myPayers: {},
    payment: {},
    totalPayments: 0,
    totalPaidDays: 0,
    totalAmount: 0,
    allDates: [],
    chartData: []
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPayment.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(addPayment.fulfilled, (state, action) => {
      state.loader = false;
      state.successMessage = action.payload.message;
      state.payment = action.payload.payment;

      // Update myPayers to reflect the new payment
      const updatedPayment = action.payload.payment;
      const payerIndex = state.myPayers.findIndex(
        (payer) => payer._id === updatedPayment.payer
      );

      if (payerIndex !== -1) {
        // Update payer's paymentMade, paymentDetails, and adjust monthly data
        const existingPayer = state.myPayers[payerIndex];
        const updatedMonthlyCount =
          Number(existingPayer.monthlyProgress.split("/")[0]) + 1;
        const totalDays = Number(existingPayer.monthlyProgress.split("/")[1]);

        state.myPayers[payerIndex] = {
          ...existingPayer,
          paymentMade: true,
          paymentDetails: updatedPayment,
          monthlyProgress: `${updatedMonthlyCount}/${totalDays}`,
          totalMonthlyAmount:
            existingPayer.totalMonthlyAmount + updatedPayment.amount,
        };
      }
    });

    builder.addCase(addPayment.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.error;
    });

    builder.addCase(getMyPayers.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getMyPayers.fulfilled, (state, action) => {
      state.loader = false;
      //   state.successMessage = action.payload.message;
      state.myPayers = action.payload.payers;
    });
    builder.addCase(getMyPayers.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.error;
    });

    builder.addCase(getMyPayersPayment.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getMyPayersPayment.fulfilled, (state, action) => {
      state.loader = false;
      state.successMessage = action.payload.message;
      state.payer = action.payload.payer;
      state.totalPayments = action.payload.totalPayments;
      state.totalPaidDays = action.payload.totalPaidDays;
      state.totalAmount = action.payload.totalAmount;
      state.allDates = action.payload.allDates;
      state.chartData = action.payload.chartData;
    });
    builder.addCase(getMyPayersPayment.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.error;
    });
  },
});

// export default paymentReducer
export const { messageClear, redirectClear, user_reset } =
  paymentReducer.actions;
export default paymentReducer.reducer;
