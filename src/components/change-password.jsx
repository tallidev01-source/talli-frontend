import { useState } from "react";
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
import { useDispatch } from "react-redux";

// import { login } from "../../src/store/reducers/authReducer"; // import it
import toast from "react-hot-toast";
import { ChangeUserPassWord } from "@/store/reducers/authReducer";

export function ChangePassForm({ className, ...props }) {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showNewRPassword, setShowRPassword] = useState(false);
  // const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangePass = (e) => {
    e.preventDefault();

    try {
      if (!currentPassword || !newPassword || !retypedPassword) {
        toast.error("All fields are required");
        return;
      }

      if (newPassword !== retypedPassword) {
        toast.error("New passwords do not match");
        return;
      }

      // Dispatch password change action
      dispatch(
        ChangeUserPassWord({
          Credential: {
            currentPassword,
            newPassword,
            retypedPassword,
          },
        })
      );

      // dispatch(ChangeUserPassWord({ currentPassword, newPassword, retypedPassword }));
      // dispatch(ChangeUserPassWord({ currentPassword, newPassword }));

      // toast.success("Password updated successfully");
    } catch (err) {
      console.error("Error changing password:", err);
      setError(err.message || "Something went wrong");
      toast.error("Failed to update password");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 mx-4 md:mx-0")} {...props}>
      <Card className={cn("flex flex-col gap-6 text-slate-100", className)}>
        <CardHeader>
          <div className="text-center w-full">
            <h2 className="font-bold text-lg">Welcome back!</h2>
          </div>
          <CardDescription className="text-xs">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePass}>
            <div className="flex flex-col gap-3 text-slate-100">
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Current Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
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
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">New Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setNewShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 focus:outline-none pr-1"
                    tabIndex={-1}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showNewRPassword ? "text" : "password"}
                    value={retypedPassword}
                    onChange={(e) => setRetypedPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowRPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 focus:outline-none pr-1"
                    tabIndex={-1}
                  >
                    {showNewRPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-slate-100 text-gray-700 font-bold hover:bg-purple-500 hover:text-white transition-all duration-300"
                >
                  Update Password
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
