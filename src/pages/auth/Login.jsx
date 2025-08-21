import React from "react";
import { LoginForm } from "../../components/login-form";


const Login = () => {


  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#0A0A0A]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="w-full max-w-sm relative z-10">
        <LoginForm className="bg-[#171717]" />
      </div>
    </div>
  );
};

export default Login;
