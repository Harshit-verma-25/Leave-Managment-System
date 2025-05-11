"use client";

import Header from "@/app/components/header";
import Sidebar from "@/app/components/sidebar";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmployeeDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }

    // const subscribe = auth.onAuthStateChanged((user) => {
    //   if (!user) {
    //     router.push("/login");
    //   }
    // });

    // return () => subscribe();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Header userName="John Doe" />
      <div className="flex flex-grow relative">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          employeeId="1"
          toggleSidebar={toggleSidebar}
        />

        {/* Main content */}
        <div className={`flex-grow py-4 lg:px-6 px-4 transition-all duration-300`}>
          {children}
        </div>
      </div>
    </>
  );
}
