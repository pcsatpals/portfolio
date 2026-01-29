import { NextRequest, NextResponse } from "next/server"
import { Project } from "@/models/project.model"
import { connectDB } from "@/lib/mongodb"
import { uploadOnCloudinary } from "@/lib/cloudinary"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
    try {
        await connectDB();

        const formData = await req.formData();

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const live_url = formData.get("live_url") as string;
        const git_hub = formData.get("git_hub") as string | undefined;
        const technologies = formData.getAll("technologies[]") as string[];
        const long_description = formData.get("long_description") as string | undefined;
        const key_features = formData.get("key_features") as string | undefined;

        const imageFile = formData.get("project_image") as File | null;
        const videoFile = formData.get("project_video") as File | null;

        // 🔥 Other Images (FILES ONLY on POST)
        const otherImageFiles = formData.getAll("other_images[]") as File[];

        if (!title || !description || !live_url) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        let project_image: string | undefined;
        let project_video: string | undefined;
        const other_images: string[] = [];

        // ===== Main Image =====
        if (imageFile instanceof File) {
            const res = await uploadOnCloudinary(imageFile, "projects/images");
            project_image = res?.secure_url;
        }

        // ===== Video =====
        if (videoFile instanceof File) {
            const res = await uploadOnCloudinary(videoFile, "projects/videos");
            project_video = res?.secure_url;
        }

        // ===== 🔥 Upload Other Images =====
        for (const file of otherImageFiles) {
            if (file instanceof File) {
                const res = await uploadOnCloudinary(file, "projects/other-images");
                if (res?.secure_url) {
                    other_images.push(res.secure_url);
                }
            }
        }

        const project = await Project.create({
            title,
            description,
            live_url,
            git_hub,
            technologies,
            project_image,
            project_video,
            other_images,
            key_features,
            long_description,
        });

        return NextResponse.json(
            { message: "Project created successfully", project },
            { status: 201 }
        );
    } catch (err) {
        console.error("POST Error:", err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}


export async function PUT(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = req.nextUrl;
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { message: "Project ID is required" },
                { status: 400 }
            );
        }

        const formData = await req.formData();

        const existingProject = await Project.findById(id);
        if (!existingProject) {
            return NextResponse.json(
                { message: "Project not found" },
                { status: 404 }
            );
        }

        // ===== Text Fields =====
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const live_url = formData.get("live_url") as string;
        const git_hub = formData.get("git_hub") as string | undefined;
        const technologies = formData.getAll("technologies[]") as string[];
        const long_description = formData.get("long_description") as string | undefined;
        const key_features = formData.get("key_features") as string | undefined;
        // ===== Main Image / Video =====
        const imageInput = formData.get("project_image");
        const videoInput = formData.get("project_video");

        let project_image = existingProject.project_image;
        let project_video = existingProject.project_video;

        if (imageInput instanceof File) {
            const res = await uploadOnCloudinary(imageInput, "projects/images");
            project_image = res?.secure_url || "";
        }

        if (videoInput instanceof File) {
            const res = await uploadOnCloudinary(videoInput, "projects/videos");
            project_video = res?.secure_url || "";
        }

        // ===== 🔥 Other Images =====
        const existingOtherImages =
            formData.getAll("existed_images[]") as string[];

        const newOtherImageFiles =
            formData.getAll("other_images[]") as File[];

        const uploadedOtherImages: string[] = [];
        for (const file of newOtherImageFiles) {
            if (file instanceof File) {
                const res = await uploadOnCloudinary(file, "projects/other-images");
                if (res?.secure_url) {
                    uploadedOtherImages.push(res.secure_url);
                }
            }
        }

        // ✅ Final images = kept + newly uploaded
        const other_images = [
            ...existingOtherImages,
            ...uploadedOtherImages,
        ];
        console.log(uploadedOtherImages, other_images, newOtherImageFiles)

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            {
                $set: {
                    title: title || existingProject.title,
                    description: description || existingProject.description,
                    live_url: live_url || existingProject.live_url,
                    git_hub,
                    key_features,
                    long_description,
                    technologies:
                        technologies.length > 0
                            ? technologies
                            : existingProject.technologies,
                    project_image,
                    project_video,
                    other_images,
                }
            },
            { new: true, runValidators: true }
        );

        return NextResponse.json(
            { message: "Project updated successfully", project: updatedProject },
            { status: 200 }
        );
    } catch (err) {
        console.error("PUT Error:", err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}



export async function DELETE(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = req.nextUrl;
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "Project ID is required" }, { status: 400 });
        }

        await Project.findByIdAndDelete(id)
        return NextResponse.json(
            { message: "Project Deleted Successfully successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.error("Delete Error:", err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {

    const { searchParams } = req.nextUrl;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const options = {
        page: Math.max(1, page),
        limit: Math.max(1, limit),
    };

    try {
        await connectDB();
        const myAggregate = Project.aggregate([
            { $sort: { position: 1 } } // Sort by position ascending
        ]);
        const projects = await Project.aggregatePaginate(myAggregate, options)

        return NextResponse.json(
            projects,
            { status: 200 }
        )
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}