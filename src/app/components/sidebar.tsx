"use client";

import { LayoutDashboard, LogOut, Menu, UserRoundX, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  employeeId: string; // 👈 Pass this from parent or get from route
}

const Sidebar = ({ isOpen, toggleSidebar, employeeId }: SidebarProps) => {
  const router = useRouter();

  const handleLogout = () => {
    console.log("Logging out...");
    router.push("/");
  };

  const navItemClass =
    "flex items-center p-3 hover:bg-gray-700 rounded-md transition-colors duration-200 text-sm font-medium";

  const navItems = [
    {
      href: `/employee/${employeeId}/dashboard`,
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      href: `/employee/${employeeId}/leaves`,
      icon: UserRoundX,
      label: "Total Leaves",
    },
  ];

  return (
    <div
      className={`bg-gray-900 text-white min-h-screen relative z-40 transform ${
        isOpen ? "min-w-60" : "w-20"
      } transition-all duration-300 flex flex-col`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between p-4 bg-gray-800">
        {isOpen && <h2 className="text-lg font-semibold">Menu</h2>}
        <button
          onClick={toggleSidebar}
          className={`text-white focus:outline-none ${
            isOpen ? "ml-auto" : "mx-auto"
          } cursor-pointer`}
        >
          {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Sidebar Content */}
      <nav className="mt-4 flex-grow overflow-y-auto px-2">
        <ul className="space-y-2">
          {navItems.map(({ href, icon: Icon, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${navItemClass} ${
                  isOpen ? "justify-start" : "justify-center"
                }`}
              >
                <Icon className="h-6 w-6" />
                {isOpen && <span className="ml-4 text-base">{label}</span>}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className={`${navItemClass} cursor-pointer ${
                isOpen ? "justify-start" : "justify-center"
              } bg-red-600 hover:bg-red-700 w-full`}
            >
              <LogOut className="h-6 w-6" />
              {isOpen && <span className="ml-4 text-base">Logout</span>}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
