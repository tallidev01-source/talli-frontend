// import { combineReducers } from "redux";
import authReducer  from "./reducers/authReducer";
import paymentReducer  from "./reducers/paymentReducer";
import payerReducer  from "./reducers/payerReducer";
// import userReducer from "./reducers/userReducer";

const rootReducer = {
  auth: authReducer,
  payer : payerReducer,
  payment : paymentReducer
};

export default rootReducer;