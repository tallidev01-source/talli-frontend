import React from "react";
import { ChangePassForm } from "./../components/change-password";

const ChangePassword = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-full lg:w-[500px] px-3">
        <ChangePassForm />
      </div>
    </div>
  );
};

export default ChangePassword;
