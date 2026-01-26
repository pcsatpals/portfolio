export interface Project {
    _id: string;

    title: string;
    description: string;

    project_image?: string; // Cloudinary URL
    project_video?: string; // Cloudinary URL

    position: number;
    technologies: string[];

    live_url: string;
    git_hub?: string;

    createdAt: Date;
    updatedAt: Date;
}
