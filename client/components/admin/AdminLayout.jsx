"use client";

import Loading from "../Loading";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { useSelector } from "react-redux";

const AdminLayout = ({ children }) => {
  const { user, authLoading } = useSelector((state) => state.auth);

  if (authLoading) {
    return <Loading />;
  }

  if (user?.role !== "seller") {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-semibold text-white">401</h1>
        <div className="w-px h-10 bg-white/30" />
        <p className="text-md text-white">
          You are not authorized to access this page.
        </p>
      </div>
    </div>
  );
}

  return (
    <div className="flex flex-col h-screen">
      <AdminNavbar />

      <div className="flex flex-1 items-start h-full overflow-y-scroll no-scrollbar">
        <AdminSidebar />

        <div className="flex-1 h-full p-5 lg:pl-12 lg:pt-12 overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
