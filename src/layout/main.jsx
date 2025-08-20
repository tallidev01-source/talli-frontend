import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 ">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Talli</BreadcrumbLink>
                  </BreadcrumbItem>
                  {/* <BreadcrumbSeparator className="hidden md:block" /> */}
                  <BreadcrumbItem>
                    {/* <BreadcrumbPage>Data Fetching</BreadcrumbPage> */}
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <motion.div
              className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"
              initial={{ opacity: 0, y: 20 }} // Start invisible & slightly down
              animate={{ opacity: 1, y: 0 }} // Fade in & move up
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>

            <div className="mt-5 text-center text-xs flex justify-center items-center gap-1">
              {" "}
              © {new Date().getFullYear()} Talli |{" "}
              <a
                className="hover:underline flex justify-center items-center gap-1"
                href="https://ben-ryan-rinconada.vercel.app"
              >
                {" "}
                <img
                  className="h-[20px]"
                  src="/imgs/BR-logo-white.png"
                  alt=""
                />
                Ben Ryan Rinconada
              </a>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Main;
