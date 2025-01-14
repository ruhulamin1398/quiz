import { Outlet } from "react-router-dom";  
import SideMenu from "./sideMenu";



export default function Layout() {
    return (
      <div className="flex  h-[100vh]"> 
      <div className="flex"> 

       <SideMenu />
      </div>
      
      <div className="flex px-4"> 
        <Outlet />

      </div>


      </div>
    );
  }