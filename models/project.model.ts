import { models, model, Schema, AggregatePaginateModel } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface Project {
    title: string;
    description: string;
    long_description?: string | null;
    key_features?: string | null;
    project_image: string;
    project_video: string;
    position: number;
    technologies: string[];
    other_images: string[];
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
        },
        long_description: {
            type: String,
        },
        key_features: {
            type: String,
        },
        other_images: {
            type: [String],
            default: [],
        }
    },
    {
        timestamps: true,
        strict: false
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

projectSchema.plugin(mongooseAggregatePaginate);



export const Project = (models.Project as AggregatePaginateModel<Project>) ||
    model<Project, AggregatePaginateModel<Project>>("Project", projectSchema);