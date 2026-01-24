import { models, model, Schema } from "mongoose";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";


export interface Project {
    title: string;
    description: string;
    project_image: string;
    project_video: string;
    position: number;
    technologies: string[];
    live_url: string;
    git_hub?: string;
    createdAt?: Date;
}

const projectSchema = new Schema<Project>(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        project_image: {
            type: String,
        },
        project_video: {
            type: String,
        },
        position: {
            type: Number,
        },
        technologies: {
            type: [String],
            default: [],

        },
        live_url: {
            type: String
        },
        git_hub: {
            type: String
        }
    },
    {
        timestamps: true
    }
)


projectSchema.pre("save", async function () {
    if (!this.isNew) return

    const ProjectModel = this.constructor as typeof Project

    const lastProject = await ProjectModel
        .findOne()
        .sort({ position: -1 })
        .select("position")
        .lean()

    this.position = lastProject ? lastProject.position + 1 : 1
})


export const Project = models.Project || model<Project>("Project", projectSchema);