import { Outlet } from "react-router-dom";
import SideMenu from "./sideMenu";

import { ToastContainer, toast } from 'react-toastify';

export default function Layout() {
  return (
    <>
      <div className="flex min-h-screen  w-full ">
        <div className="flex min-h-screen min-w-screen ">

          <SideMenu />
        </div>

        <div className="flex px-4 min-h-screen  w-full">
          <Outlet />

        </div>


      </div>

      <ToastContainer />

    </>
  );
}