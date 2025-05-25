"use client";
import { Building2, User2Icon } from "lucide-react";
import Image from "next/image";

export default function Header({
  userName,
  profile,
}: {
  userName: string;
  profile: string;
}) {
  return (
    <header className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl h-10 w-10 font-bold text-slate-800">
        <Image
          src="/logo.png"
          alt="Company Logo"
          width={9999}
          height={9999}
          className="h-full w-full object-cover rounded-full bg-slate-800 p-0.5"
          priority
        />
      </div>

      {/* User Info */}
      <div className="flex items-center gap-2">
        <span className="text-slate-700 font-medium">{userName}</span>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-300">
          {profile ? (
            <Image
              src={profile}
              alt="User Profile"
              width={9999}
              height={9999}
              className="object-cover w-full h-full"
              priority
            />
          ) : (
            <User2Icon className="w-10 h-10 text-slate-800" />
          )}
        </div>
      </div>
    </header>
  );
}
