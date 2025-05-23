"use client";

import Header from "@/app/components/header";
import Sidebar from "@/app/components/sidebar";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UserRole } from "@/app/types/user";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const adminId = params?.id as string;

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<{
    name: string;
    role: UserRole;
  }>({
    name: "",
    role: "employee",
  });

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    const getUser = () => {
      const user = sessionStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);

        setUser({
          name: parsedUser.name,
          role: parsedUser.role,
        });
      }
    };

    getUser();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header userName={user.name} />
      <div className="flex flex-grow relative">
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          role={user.role}
          userId={adminId}
        />

        <div className="flex-grow py-4 lg:px-6 px-4 transition-all duration-300">
          {children}
        </div>
      </div>
    </>
  );
}
