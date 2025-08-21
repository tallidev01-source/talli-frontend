import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Main from "./layout/main";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UserPaymentsList from "./pages/UserPaymentsList";
import PayersList from "./pages/PayersList";
import PayerProgress from "./pages/PayerProgress";
import ChangePassword from "./pages/ChangePassword";
import ProtectUser from "./utils/ProtectUser";


function App() {  
  return (
       <Routes>
        <Route path="/login" element={<Login />} />
        {/* Protected routes */}
        <Route element={<ProtectUser />}>
          <Route element={<Main />}>
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
