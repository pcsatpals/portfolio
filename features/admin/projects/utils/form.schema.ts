
import * as z from "zod"

const fileOrUrl = z.union([
    z.instanceof(File),
    z.string().url()
]).optional().nullable();

export const formSchema = z.object({
    title: z.string().nonempty("Project Title is required"),
    description: z.string().nonempty("Project Title is required"),
    technologies: z.array(z.string()).min(0, "Technologies must be defined"),
    project_image: fileOrUrl,
    project_video: fileOrUrl,
    live_url: z.string().nonempty("Please add a live URL of your Project"),
    git_hub: z.string().optional().nullable()
}).superRefine((v, ctx) => {
    if (!v.project_video && !v.project_image) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please fill atleast one field from project image and project Video",
            path: ["project_image", "project_video"], // Show error on section
        });
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please fill atleast one field from project image and project Video",
            path: ["project_video"], // Show error on section
        });
    }
})
