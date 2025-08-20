import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
// import { Button } from "@/components/ui/button";

import { login } from "../../src/store/reducers/authReducer"; // import it
import toast from "react-hot-toast";
import { messageClear} from "../store/reducers/authReducer"; // Make sure this path is correct
import { useNavigate } from "react-router";

export function LoginForm({ className, ...props }) {
  const dispatch = useDispatch();
    const navigate = useNavigate();


  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(login({ Credential: { email, password } }));
    } catch (err) {
      setError(err);
    }
  };
  

    const { userInfo, successMessage, errorMessage, redirect } = useSelector(
    (state) => state.auth
  );

    useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
       navigate("/");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate("/");
    } 
    
  }, [successMessage, errorMessage, userInfo, redirect, navigate, dispatch]);

  return (
    <div className={cn("flex flex-col gap-6 mx-4 md:mx-0")} {...props}>
      <Card className={cn("flex flex-col gap-6 text-slate-100", className)}>
        <CardHeader>
          <div className="text-center w-full">
            <h2 className="font-bold text-2xl">Welcome back!</h2>
          </div>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6 text-slate-100">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="m@example.com"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 focus:outline-none pr-1"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-slate-100 text-gray-700 font-bold hover:bg-purple-500 hover:text-white transition-all duration-300"
                >
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
