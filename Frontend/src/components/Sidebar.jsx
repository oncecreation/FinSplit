import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  HomeIcon,
  XIcon,
  UserGroupIcon,
  GlobeAltIcon,
} from "@heroicons/react/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import Logo from "components/Logo";
import { classNames } from "utils";
import { Link, useLocation } from "react-router-dom";
import { useMaterialTailwindController, setOpenSidenav } from "contexts";

const Sidebar = ({ sidebarOpen, setSidebarOpen,brandImg, brandName }) => {
  const [navigation, setNavigation] = useState([
    { name: "Home", href: "/", icon: HomeIcon, current: false },
    { name: "Groups", href: "/groups", icon: UserGroupIcon, current: false },
  ]);
  const { pathname } = useLocation();
  useEffect(() => {
    const updatePathName = pathname.split("/")[1].toLowerCase();

    setNavigation(
      navigation.map((item) => {
        if (
          item.name.toLowerCase() === updatePathName ||
          (pathname === "/" && item.name.toLowerCase() === "home") ||
          ((updatePathName === "group" || updatePathName === "addgroup") &&
            item.name.toLowerCase() === "groups")
        ) {
          item.current = true;
        } else {
          item.current = false;
        }

        return item;
      })
    );
  }, [pathname]);
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              
                <Logo />
              
              <nav
                className="mt-20 flex-1 flex-shrink-0 divide-y divide-gray-300 overflow-y-auto"
                aria-label="Sidebar"
              >
                <div className="space-y-1 px-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-blue-600 text-white"
                          : " text-gray-800 hover:bg-gray-200",
                        "group flex items-center rounded-md px-2 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "mr-4 h-6 w-6 flex-shrink-0"
                            : "mr-4 h-6 w-6 flex-shrink-0 text-zinc-600"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                      
                    </Link>

                  ))}
                </div>
              </nav>
             
            </div>
          </Transition.Child>
          <div className="w-14 flex-shrink-0" aria-hidden="true"></div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-100 my-0 ml-0 h-[calc(100vh)] w-64  transition-transform duration-300 xl:translate-x-0`}
    >
        <div
        className={`relative border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
      >
        <Link to="/" className="flex items-center gap-4 py-6 px-8">

          <Typography
            variant="h4"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
        <div className="">
          <div
            className="m-4"
            aria-label="Sidebar"
          >
            <ul className="mb-4 flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    "group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  
                   <Button
                      variant={item.current ? "gradient" : "text"}
                      color={
                        item.current
                          ? sidenavColor
                          : sidenavType === "dark"
                          ? "white"
                          : "blue-gray"
                      }
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      <item.icon
                    className={classNames(
                      item.current
                        ? "mr-4 h-6 w-6 flex-shrink-0"
                        : "mr-4 h-6 w-6 flex-shrink-0 text-zinc-600"
                    )}
                    aria-hidden="true"
                  />
                  <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {item.name}
                      </Typography>
                    </Button>
                    
                </Link>
              ))}
            </ul>
          </div>
          
        </div>
      </aside>

      </div>
    </>
  );
};
Sidebar.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "FinSplit",
};

export default Sidebar;
