import { useEffect, useState } from "react";
import { Outlet, Link, Router } from "react-router-dom";
import { MenuIcon } from "@heroicons/react/outline";
import Sidebar from "components/Sidebar";
import Profile from "components/Profile";
import { Toast } from "components";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  // Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  // Bars3Icon,
} from "@heroicons/react/solid";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = "FinSplit - Dashboard";
  }, []);

  return (
    <>
      <div className="h-full">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}   />

        <div className="bg-gray-100 lg:pl-64 flex flex-col flex-1 h-full">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>

           
            <Navbar
      color={1 ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        1
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={false}
    >
      <div className="flex flex-col-reverse justify-end gap-6 md:flex-row md:items-center">
        
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Type here" />
          </div>
         
          <Profile/>
          
        </div>
      </div>
    </Navbar>
          </div>
          <main className="flex-1 flex-shrink h-[calc(100vh-64px)]">
            <Outlet />
          </main>
        </div>
        <Toast />
      </div>
    </>
  );
}
