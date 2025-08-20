"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { CgUnavailable } from "react-icons/cg";
import { TbPassword } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { userLogout } from "@/store/reducers/authReducer";
// import { user_reset, userLogout } from "@/store/reducers/authReducer";
// import { useNavigate } from "react-router";
// import api from "@/api/api";
// import toast from "react-hot-toast";

export function NavUser({ user }) {
  const { isMobile } = useSidebar();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const logout = ()=>{
  //   dispatch(userLogout())

  //   console.log("LOGOUT")
  // }

  //  const logout = async () => {
  //       try {
  //           const { data } = await api.get('/auth/user-logout')
  //           localStorage.removeItem('accessToken')
  //           toast.success("asdasdasd")
  //           dispatch(user_reset())
  //           // dispatch(reset_count())
  //           navigate('/login')
  //       } catch (error) {
  //           console.log(error.response.data)
  //       }
  //   }

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      dispatch(userLogout());
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg font-bold">
                  {user.userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.userName}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg font-bold">
                    {user.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* <DropdownMenuItem>
                <div className="flex gap-2 justify-center items-center relative w-full h-full">
                  <BadgeCheck />
                  Account

                  <div className="absolute bg-black/90 inset-0 text-sm text-center flex justify-center items-center gap-1.5"><CgUnavailable /> UNAVAILABLE</div>
                </div>
              </DropdownMenuItem> */}
              <DropdownMenuItem>
                <a
                  href="/change-my-password"
                  className="flex justify-center items-center gap-2"
                >
                  <TbPassword />
                  Change Password
                </a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button
                onClick={handleLogout}
                className={
                  "flex gap-2 justify-center items-center hover:cursor-pointer"
                }
              >
                <LogOut />
                Log out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
