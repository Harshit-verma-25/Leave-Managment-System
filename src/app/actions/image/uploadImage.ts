"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

function toBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export async function uploadImage(
  file: File,
  name: string,
  folderName: string
): Promise<string> {
  try {
    const base64 = await toBase64(file);

    if (typeof base64 !== "string") {
      throw new Error("Failed to convert file to base64");
    }

    const result = await cloudinary.uploader.upload(base64, {
      folder: folderName,
      public_id: name,
      overwrite: true,
      allowed_formats: ["jpg", "png", "jpeg", "pdf"],
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}
