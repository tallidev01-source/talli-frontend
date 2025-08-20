import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Main from "./layout/main";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UserPaymentsList from "./pages/UserPaymentsList";
import PayersList from "./pages/PayersList";
import PayerProgress from "./pages/PayerProgress";
import ChangePassword from "./pages/ChangePassword";
import ProtectUser from "./utils/ProtectUser";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {get_user_info} from "./store/reducers/authReducer"

function App() {
  // const dispatch = useDispatch()
  // const {token} = useSelector(state=>state.auth)
  //   useEffect(()=>{
  //   if(token){
  //     dispatch(get_user_info())
  //   }
  // },[token, dispatch])


  
  return (
       <Routes>
        <Route path="/login" element={<Login />} />
        {/* Protected routes */}
        <Route element={<ProtectUser />}>
          <Route element={<Main />}>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/" element={<UserPaymentsList />} />
            <Route path="/payers" element={<PayersList />} />
            <Route path="/view-progress/:payerId" element={<PayerProgress />} />
            <Route path="/change-my-password" element={<ChangePassword />} />
          </Route>
        </Route>
      </Routes>
  );
}

export default App;
