"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function SingleStaffPage() {
  const { mode } = useParams();

  return (
    <div className="min-h-screen bg-[#f8f9fa] lg:p-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {mode === "create" ? "New Staff" : "Edit Staff"}
        </h1>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-6">
        <div className="flex flex-col gap-4 text-gray-500 bg-white p-4 shadow-md rounded">
          <h3 className="text-lg font-bold uppercase">Personal Details</h3>

          <div className="flex flex-col gap-1">
            <label htmlFor="profile" className="w-1/3 font-semibold">
              Profile Picture: <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="profile"
              className="w-full border p-2 rounded"
              accept="image/*"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="w-1/3 font-semibold">
              First Name: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full border p-2 rounded"
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="middleName" className="w-1/3 font-semibold">
              Middle Name:
            </label>
            <input
              type="text"
              id="middleName"
              className="w-full border p-2 rounded"
              placeholder="Enter middle name"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="w-1/3 font-semibold">
              Last Name: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full border p-2 rounded"
              placeholder="Enter last name"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phoneNo" className="w-1/3 font-semibold">
              Phone Number: <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNo"
              className="w-full border p-2 rounded"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="designation" className="w-1/3 font-semibold">
              Designation: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="designation"
              className="w-full border p-2 rounded"
              placeholder="Enter address"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="gender" className="w-1/3 font-semibold">
              Gender: <span className="text-red-500">*</span>
            </label>

            <div className="flex gap-4">
              {["Male", "Female", "Other"].map((g) => (
                <div className="flex items-center gap-2" key={g}>
                  <input name="gender" type="radio" value={g} /> {g}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 bg-white shadow-md rounded">
          <div className="flex flex-col gap-4 text-gray-500 p-4">
            <h3 className="text-lg font-bold uppercase">Company Details</h3>

            <div className="flex flex-col gap-1">
              <label htmlFor="department" className="w-1/3 font-semibold">
                Department: <span className="text-red-500">*</span>
              </label>
              <select
                id="department"
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select department</option>
                {["HR", "IT", "Finance"].map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="staffId" className="w-1/3 font-semibold">
                Staff ID: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="staffId"
                className="w-full border bg-gray-400 text-white placeholder:text-white p-2 rounded cursor-not-allowed"
                placeholder="Enter staff ID"
                disabled
                readOnly
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="w-1/3 font-semibold">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full border p-2 rounded"
                placeholder="Enter staff email"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="w-1/3 font-semibold">
                Password: <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                className="w-full border p-2 rounded"
                placeholder="Enter password"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword" className="w-1/3 font-semibold">
                Confirm Password: <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full border p-2 rounded"
                placeholder="Confirm password"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="role" className="w-1/3 font-semibold">
                Role Type: <span className="text-red-500">*</span>
              </label>

              <div className="flex gap-4">
                {["Staff", "Manager", "Admin"].map((g) => (
                  <div className="flex items-center gap-2" key={g}>
                    <input name="role" type="radio" value={g} /> {g}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 px-4">
            <Link href="/admin/staff" className="w-full">
              <button className="mx-auto w-full bg-red-500 text-white py-2 rounded cursor-pointer">
                Cancel
              </button>
            </Link>

            <button className="w-full bg-green-500 text-white py-2 rounded cursor-pointer">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
