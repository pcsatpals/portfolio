import { NextRequest, NextResponse } from "next/server"
import { Project } from "@/models/project.model"
import { connectDB } from "@/lib/mongodb"
import { uploadOnCloudinary } from "@/lib/cloudinary"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
    try {
        await connectDB()

        const formData = await req.formData()

        const title = formData.get("title") as string
        const description = formData.get("description") as string
        const live_url = formData.get("live_url") as string
        const git_hub = formData.get("git_hub") as string | undefined
        const technologies = formData.getAll("technologies[]") as string[]

        const imageFile = formData.get("project_image") as File | null
        const videoFile = formData.get("project_video") as File | null

        if (!title || !description || !live_url || !imageFile && !videoFile) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            )
        }

        let project_image: string | undefined;
        let project_video: string | undefined;

        if (imageFile) {
            const res = await uploadOnCloudinary(imageFile, "projects/images");
            project_image = res?.secure_url;
        }

        if (videoFile) {
            const res = await uploadOnCloudinary(videoFile, "projects/videos");
            project_video = res?.secure_url;
        }

        const project = await Project.create({
            title,
            description,
            live_url,
            git_hub,
            technologies,
            project_image,
            project_video,
        })

        return NextResponse.json(
            { message: "Project created successfully", project },
            { status: 201 }
        )
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}


export async function PUT(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = req.nextUrl;
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "Project ID is required" }, { status: 400 });
        }

        const formData = await req.formData();

        // 1. Find the existing project first
        const existingProject = await Project.findById(id);
        if (!existingProject) {
            return NextResponse.json({ message: "Project not found" }, { status: 404 });
        }

        // 2. Extract text fields
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const live_url = formData.get("live_url") as string;
        const git_hub = formData.get("git_hub") as string | undefined;
        const technologies = formData.getAll("technologies[]") as string[];

        // 3. Handle Files (Image/Video)
        // Note: formData.get returns a File object if a new one is uploaded, 
        // or a string (the existing URL) if no new file was selected.
        const imageInput = formData.get("project_image");
        const videoInput = formData.get("project_video");

        let project_image: undefined | string = existingProject.project_image;
        let project_video: undefined | string = existingProject.project_video;

        // If it's a File object, a new file was uploaded -> Upload to Cloudinary
        if (imageInput instanceof File) {
            const res = await uploadOnCloudinary(imageInput, "projects/images");
            project_image = res?.secure_url;
        }
        // If imageInput is null/empty string and you want to allow deletion:
        // else if (!imageInput) { project_image = undefined; }

        if (videoInput instanceof File) {
            const res = await uploadOnCloudinary(videoInput, "projects/videos");
            project_video = res?.secure_url;
        }

        // 4. Update the document
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            {
                title: title || existingProject.title,
                description: description || existingProject.description,
                live_url: live_url || existingProject.live_url,
                git_hub,
                technologies: technologies.length > 0 ? technologies : existingProject.technologies,
                project_image,
                project_video,
            },
            { new: true } // returns the updated document
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