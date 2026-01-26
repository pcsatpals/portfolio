import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});


export const uploadOnCloudinary = async (
    file: File,
    folder = "projects"
) => {
    try {
        if (!file) return null;

        console.log("Uploading started...");

        const buffer = Buffer.from(await file.arrayBuffer());

        const res = await new Promise<UploadApiResponse | undefined>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        resource_type: "auto",
                        folder,
                    },
                    (error, result) => {
                        console.log(error)
                        if (error) reject(new Error("Cloudinary upload failed"));
                        else resolve(result);
                    }
                )
                .end(buffer);
        });

        return res;
    } catch (err) {
        console.error("Cloudinary upload failed:", err);
        throw new Error("Cloudinary upload failed")
    }
};



