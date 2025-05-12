import { Card } from "@/app/components/card";
import { User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function StaffPage() {
  const data = [
    {
      id: 1,
      name: "John Doe",
      position: "Software Engineer",
      image: null,
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Product Manager",
      image: null,
    },
    {
      id: 3,
      name: "Alice Johnson",
      position: "UX Designer",
      image: null,
    },
    {
      id: 4,
      name: "Bob Brown",
      position: "Data Analyst",
      image: null,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] lg:p-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Staff</h1>
      </div>

      <div className="mb-6 flex items-center justify-end">
        <Link href="/admin/staff/create/new">
          <button
            className="rounded bg-black px-4 py-2 text-white cursor-pointer"
            //   onClick={openAddModal}
          >
            Add New Staff
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.map((staff) => (
          <Card key={staff.id} className="p-4 flex flex-col items-center">
            <div className="mb-4 h-32 w-32 rounded-full flex items-center justify-center">
              {staff.image ? (
                <Image
                  src={staff.image}
                  alt={staff.name}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              ) : (
                <User2 className="h-32 w-32 rounded-full border-2 border-gray-300" />
              )}
            </div>
            <h2 className="text-lg font-semibold">{staff.name}</h2>
            <p className="text-gray-600">{staff.position}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
