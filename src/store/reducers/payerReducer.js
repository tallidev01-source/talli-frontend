import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const removePayer = createAsyncThunk(
  "auth/removePayer",
  async ( payerId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    console.log(payerId)
    console.log("payerId")
    try {
      const { data } = await api.delete(
        `/payer/remove-payer/${payerId}`,
        config
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
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
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

export const addPayer = createAsyncThunk(
  "payer/addPayer",
  async (
    { name, contact },
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
        "/payer/add-payer",
        {
          name,
          contact,
        },
        config
      );

      console.log(data);
      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);


export const updatePayer = createAsyncThunk(
  "payer/updatePayer",
  async (
    { name, contact, id },
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
        "/payer/update-payer",
        {
          name,
          contact,
          id
        },
        config
      );

      console.log(data);
      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const payerReducer = createSlice({
  name: "payer",
  initialState: {
    loader: false,
    errorMessage: "",
    successMessage: "",
    myPayers: {},
    addedPayer : {},
    updatedPayer : {}
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updatePayer.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(updatePayer.fulfilled, (state, action) => {
      state.loader = false;
      state.successMessage = action.payload.message;
      state.updatedPayer = action.payload.payer;

      // updates-the-list-state
      // state.myPayers = [... state.myPayers, action.payload.payer  ]
       // Update myPayers to reflect the new payment
      const updatedPayer = action.payload.payer;
      const payerIndex = state.myPayers.findIndex(
        (payer) => payer._id === updatedPayer._id
      );

      if (payerIndex !== -1) {
        // Update payer's paymentMade, paymentDetails, and adjust monthly data
        const existingPayer = state.myPayers[payerIndex];
  

        state.myPayers[payerIndex] = {
          ...existingPayer,
          name: updatedPayer.name,
          contact: updatedPayer.contact,
        };
      }

    });

    builder.addCase(updatePayer.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.error;
    });

    

    builder.addCase(addPayer.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(addPayer.fulfilled, (state, action) => {
      state.loader = false;
      state.successMessage = action.payload.message;
      state.addedPayer = action.payload.payer;

      // updates-the-list-state
      state.myPayers = [... state.myPayers, action.payload.payer  ]

    });

    builder.addCase(addPayer.rejected, (state, action) => {
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



    builder.addCase(removePayer.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(removePayer.fulfilled, (state, action) => {
      state.loader = false;
      //   state.successMessage = action.payload.message;
      state.myPayers = action.payload.payers;
    });
    builder.addCase(removePayer.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.error;
    });
  },
});

// export default paymentReducer
export const { messageClear } = payerReducer.actions;
export default payerReducer.reducer;
