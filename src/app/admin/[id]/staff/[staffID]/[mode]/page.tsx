"use client";

import { rltdb } from "@/app/firebase";
import { get, ref } from "firebase/database";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { StaffData } from "@/app/types/user";
import axios from "axios";

type StaffMode = "create" | "edit" | "view";

export default function SingleStaffPage() {
  const { id, mode, staffID } = useParams<{
    id: string;
    mode: StaffMode;
    staffID: string;
  }>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const [ID, setID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState<StaffData>({
    profile: null,
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNo: "",
    designation: "",
    gender: "",
    role: "",
    assignedUnder: [],
  });

  useEffect(() => {
    if (staffID === "new") {
      const getStaffID = async () => {
        const response = await get(ref(rltdb, "LastStaffID"));
        const lastStaffID = response.val();
        setID(lastStaffID);
      };
      getStaffID();
    } else {
      setID(staffID);
    }
  }, [staffID]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 1 * 1024 * 1024; // 1 MB

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload JPG, JPEG, or PNG.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size exceeds 1 MB. Please upload a smaller file.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setData((prev) => ({
      ...prev,
      profile: file,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const requiredFields = [
      { name: "firstName", label: "First Name" },
      { name: "lastName", label: "Last Name" },
      { name: "phoneNo", label: "Phone Number" },
      { name: "designation", label: "Designation" },
      { name: "gender", label: "Gender" },
      { name: "role", label: "Role" },
      { name: "assignedUnder", label: "Assigned Under" },
    ];

    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const missingFields = requiredFields.filter((field) => !data[field.name]);

    if (missingFields.length > 0) {
      const missingNames = missingFields.map((f) => f.label).join(", ");
      toast.error(`Please fill in: ${missingNames}`);
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    const response = await axios.post("/api/signup", {
      email,
      password,
      data,
      staffID: ID,
    });

    // if (response.status === 200) {
    //   sessionStorage.setItem(
    //     "user",
    //     JSON.stringify({ name: response.name, role: response.role })
    //   );
    //   toast.success("User created successfully");

    // } else {
    //   setError(response.message);
    // }

    console.log(response);
    router.push(`/admin/${id}/staff`);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] lg:p-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {mode === "create" ? "New Staff" : "Edit Staff"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-6"
      >
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
              accept=".png, .jpg, .jpeg"
              required
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="w-1/3 font-semibold">
              First Name: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full border p-2 rounded"
              placeholder="Enter first name"
              required
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="w-1/3 font-semibold">
              Last Name: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
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
              name="phoneNo"
              onChange={handleChange}
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
              name="designation"
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter address"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="gender" className="w-1/3 font-semibold">
              Gender: <span className="text-red-500">*</span>
            </label>

            <div className="flex gap-4">
              {["male", "female", "other"].map((g) => (
                <div className="flex items-center gap-2" key={g}>
                  <input
                    id="gender"
                    name="gender"
                    type="radio"
                    value={g}
                    onChange={handleChange}
                  />{" "}
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 bg-white shadow-md rounded">
          <div className="flex flex-col gap-4 text-gray-500 p-4">
            <h3 className="text-lg font-bold uppercase">Company Details</h3>

            {/* <div className="flex flex-col gap-1">
              <label htmlFor="department" className="w-1/3 font-semibold">
                Department: <span className="text-red-500">*</span>
              </label>
              <select
                id="department"
                name="department"
                onChange={handleChange}
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
            </div> */}

            <div className="flex flex-col gap-1">
              <label htmlFor="staffId" className="w-1/3 font-semibold">
                Staff ID: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="staffId"
                value={ID}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Enter staff email"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="w-1/3 font-semibold">
                Password: <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border p-2 rounded"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword" className="w-1/3 font-semibold">
                Confirm Password: <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border p-2 rounded"
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="role" className="w-1/3 font-semibold">
                Role Type: <span className="text-red-500">*</span>
              </label>

              <div className="flex gap-4">
                {["Employee", "Manager", "Admin"].map((r) => (
                  <div className="flex items-center gap-2" key={r}>
                    <input
                      id="role"
                      name="role"
                      type="radio"
                      value={r}
                      onChange={handleChange}
                    />{" "}
                    {r}
                  </div>
                ))}
              </div>
            </div>

            {data.role === "Employee" && (
              <div className="flex flex-col gap-1">
                <label className="w-1/3 font-semibold" htmlFor="assignedUnder">
                  Assigned Under: <span className="text-red-500">*</span>
                </label>
                <select
                  id="assignedUnder"
                  name="assignedUnder"
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                >
                  <option value="">Not Selected</option>
                  {["Manager 1", "Manager 2", "Manager 3"].map((m, index) => (
                    <option key={index} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 px-4">
            <Link href={`/admin/${staffID}/staff`} className="w-full">
              <button className="mx-auto w-full bg-red-500 text-white py-2 rounded cursor-pointer">
                Cancel
              </button>
            </Link>

            <button
              className="w-full bg-green-500 text-white py-2 rounded cursor-pointer"
              type="submit"
              disabled={loading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
