"use client";

import Header from "@/app/components/header";
import Sidebar from "@/app/components/sidebar";
import { LayoutDashboard, ScrollText, UserRoundX } from "lucide-react";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const router = useRouter();

  const adminId = "1";
  const navItems = [
    {
      href: `/admin/${adminId}/dashboard`,
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      href: `/admin/${adminId}/employee-records`,
      icon: UserRoundX,
      label: "Employee Records",
    },
    {
        href: `/admin/${adminId}/leave-policy`,
        icon: ScrollText,
        label: "Leave Policy",
    }
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
