import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";

export default function MainLayout() {
  return (
    <div className="xs:px-6 sm:px-14 lg:px-[123px]">
      <Navbar />
      <div className="mt-[29.5px]">
        <Outlet />
      </div>
    </div>
  );
}
