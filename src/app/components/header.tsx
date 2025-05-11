"use client";
import { Building2, User2Icon } from "lucide-react";
// import Image from "next/image";

export default function Header({ userName }: { userName: string }) {
  return (
    <header className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold text-slate-800">
        <Building2 className="w-10 h-10" />
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <span className="text-slate-700 font-medium">{userName}</span>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-300">
          {/* <Image
            src="/profile.png"
            alt="User Profile"
            width={40}
            height={40}
            className="object-cover w-full h-full"
          /> */}
          <User2Icon className="w-10 h-10 text-slate-800" />
        </div>
      </div>
    </header>
  );
}
