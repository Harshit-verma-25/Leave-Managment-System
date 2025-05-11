"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, MoveLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type LoginFormProps = {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
};

const LoginForm = ({ type, setType }: LoginFormProps) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      alert("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      // Simulate login API delay (optional)
      await new Promise((res) => setTimeout(res, 1000));

      // Navigate without full reload
      router.push(`/${type.toLowerCase()}/1/dashboard`);
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
      <h1>
        <span className="text-2xl font-bold text-slate-900">
          Login as {type}
        </span>
        <p className="mt-2 text-sm text-slate-600">
          Please enter your {type} credentials
        </p>
      </h1>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={`Enter your ${type} email`}
          required
          className="mt-1 block w-full rounded-md border border-slate-300 p-2 shadow-sm focus:border-slate-500 focus:ring focus:ring-slate-200"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-700"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={`Enter your ${type} password`}
            required
            className="mt-1 block w-full rounded-md border border-slate-300 p-2 shadow-sm focus:border-slate-500 focus:ring focus:ring-slate-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-700"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-between">
        <button
          type="submit"
          disabled={loading}
          className={`w-3/4 py-2 text-base text-white rounded-md ${
            loading
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-slate-800 hover:bg-slate-700 cursor-pointer"
          }`}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Link
          href={"/"}
          className="w-1/4 border py-2 rounded-md text-slate-500 hover:text-slate-700 cursor-pointer inline-flex items-center justify-center gap-1"
        >
          <button
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => setType("")}
          >
            <MoveLeftIcon className="w-5" /> Back
          </button>
        </Link>
      </div>
    </form>
  );
};

export default function Home() {
  const [type, setType] = useState("");

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Logo Section - 50% */}
      <div className="flex w-full items-center justify-center bg-slate-50 p-8 md:w-1/2 md:p-12">
        <div className="flex max-w-md flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-slate-100">
            <Building2 className="h-16 w-16 text-slate-800" />
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            LeaveTrack Pro
          </h1>
          <p className="text-slate-600">
            Streamline your organization&apos;s leave management process with
            our comprehensive solution
          </p>
        </div>
      </div>

      {/* Login Section - 50% */}
      <div className="flex w-full items-center justify-center bg-white p-8 md:w-1/2 md:p-12">
        {type === "" && (
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Please select your role to continue
              </p>
            </div>

            <div className="space-y-4 text-white">
              <button
                className="w-full h-12 cursor-pointer rounded-md px-8 bg-slate-800 text-base hover:bg-slate-700 hover:scale-105"
                onClick={() => setType("employee")}
              >
                Login as Employee
              </button>

              <button
                className="w-full h-12 cursor-pointer rounded-md px-8 border-slate-300 text-base text-slate-800 hover:bg-slate-50 hover:scale-105"
                onClick={() => setType("manager")}
              >
                Login as Manager
              </button>

              <button
                className="w-full h-12 cursor-pointer rounded-md px-8 border-slate-300 bg-slate-100 text-base text-slate-800 hover:bg-slate-200 hover:scale-105"
                onClick={() => setType("admin")}
              >
                Login as HR/Admin
              </button>
            </div>

            <div className="mt-8 text-center text-sm text-slate-500">
              <p>
                © {new Date().getFullYear().toLocaleString()} LeaveTrack Pro.
                All rights reserved.
              </p>
            </div>
          </div>
        )}

        {type === "employee" && <LoginForm type="Employee" setType={setType} />}
        {type === "manager" && <LoginForm type="Manager" setType={setType} />}
        {type === "admin" && <LoginForm type="Admin" setType={setType} />}
      </div>
    </div>
  );
}
