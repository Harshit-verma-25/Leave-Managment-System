"use client";

import axios from "axios";
import {
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  UserRoundX,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRole } from "@/app/types/user";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  role: UserRole;
  userId: string;
}

const Sidebar = ({ isOpen, toggleSidebar, role, userId }: SidebarProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await axios.post("/api/adminAuth/logout");
    if (response.status === 200) {
      router.push("/");
    } else {
      console.error("Logout failed");
    }
  };

  const navItemClass =
    "flex items-center p-3 hover:bg-gray-700 rounded-md transition-colors duration-200 text-sm font-medium";

  const commonItems = [
    {
      label: "Dashboard",
      href: `/${role}/${userId}/dashboard`,
      icon: LayoutDashboard,
    },
  ];

  const roleBasedItems = {
    admin: [
      {
        label: "Staff",
        href: `/admin/${userId}/staff`,
        icon: User2Icon,
      },
      // You can add more admin-specific items here
    ],
    manager: [
      {
        label: "Leave Records",
        href: `/manager/${userId}/leaves`,
        icon: UserRoundX,
      },
    ],
    employee: [
      {
        label: "Leave Records",
        href: `/employee/${userId}/leaves`,
        icon: UserRoundX,
      },
    ],
  };

  const navItems = [...commonItems, ...(roleBasedItems[role] || [])];

  return (
    <div
      className={`bg-black text-white min-h-screen relative z-40 transform ${
        isOpen ? "min-w-60" : "w-20"
      } transition-all duration-300 flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 bg-black">
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
              } bg-red-600 hover:bg-red-400 w-full`}
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
