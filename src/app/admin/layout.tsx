"use client";

import Header from "@/app/components/header";
import Sidebar from "@/app/components/sidebar";
import {
  // CalendarClock,
  LayoutDashboard,
  Network,
  User2Icon,
} from "lucide-react";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const router = useRouter();

  const navItems = [
    {
      href: `/admin/dashboard`,
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      href: `/admin/departments`,
      icon: Network,
      label: "Departments",
    },
    {
      href: `/admin/staff`,
      icon: User2Icon,
      label: "Staff",
    },
    // {
    //   href: `/admin/leave-type`,
    //   icon: CalendarClock,
    //   label: "Leave Type",
    // },
  ];

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
          toggleSidebar={toggleSidebar}
          navItems={navItems}
        />

        {/* Main content */}
        <div
          className={`flex-grow py-4 lg:px-6 px-4 transition-all duration-300`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
