import { NextResponse } from "next/server"
import { Project } from "@/models/project.model"
import { connectDB } from "@/lib/mongodb"
import { saveFileToTemp } from "@/lib/save-file-temp"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
    try {
        await connectDB()

        const formData = await req.formData()

        const title = formData.get("title") as string
        const description = formData.get("description") as string
        const live_url = formData.get("live_url") as string
        const git_hub = formData.get("git_hub") as string | null
        const technologies = formData.getAll("technologies[]") as string[]

        const imageFile = formData.get("project_image") as File | null
        const videoFile = formData.get("project_video") as File | null

        if (!title || !description || !live_url || !imageFile && !videoFile) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            )
        }

        let imagePath = ""
        let videoPath = ""

        if (imageFile) {
            const saved = await saveFileToTemp(imageFile)
            imagePath = `/uploads/temp/${saved.fileName}`
        }

        if (videoFile) {
            const saved = await saveFileToTemp(videoFile)
            videoPath = `/uploads/temp/${saved.fileName}`
        }

        const project = await Project.create({
            title,
            description,
            live_url,
            git_hub,
            technologies,
            project_image: imagePath,
            project_video: videoPath,
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
