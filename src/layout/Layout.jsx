import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar/Navbar";


export default function Layout({userdata ,Logout}) {
  return <>
  <Navbar Logout={Logout} userdata={userdata}/>
  <div className="container py-5">
    <div className="row py-3">
    <Outlet/>
    </div>
  </div>
  </>
}
