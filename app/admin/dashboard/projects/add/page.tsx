"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { toast } from "react-toastify"
import SelectComponent from "@/components/common/select-component"

const formSchema = z.object({
    title: z.string().nonempty("Project Title is required"),
    description: z.string().nonempty("Project Title is required"),
    technology: z.array(z.string()).min(0, "Technologies must be defined"),
    project_image: z.string().optional(),
    project_video: z.string().optional(),
    live_url: z.string().nonempty("Please add a live URL of your Project"),
    git_hub: z.string().optional()
}).superRefine((v, ctx) => {
    console.log(v)
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

const techOptions = [
    "Javascript",
    "Typescript",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "ReactJS",
    "NextJS",
    "MongoDB",
    "ExpressJS",
    "NodeJS",
    "Payload CMS",
    "Strapi CMS",
    "Charts",
    "multer",
    "cloudinary",
    "PostgreSQL",
    "SQL",
    "AWS",
    "Vercel",
    "Render",
    "Mongoose"
]

export default function BugReportForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            technology: []
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        toast.error(<>
            <strong>You submitted the following values:</strong>
            <div>{JSON.stringify(data, null, 2)}</div>
        </>
        )
    }
    return (
        <div className="p-4 h-screen overflow-hidden">
            <Card className="w-full h-full bg-transparent text-white">
                <CardHeader>
                    <CardTitle className="text-5xl text-bold font-jakarta-sans">Add Project</CardTitle>
                    <CardDescription>
                        Create a new project or edit an existing project by updating the information below.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grow overflow-auto no-scrollbar">
                    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="title"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            Project Name
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Project Name"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="description"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Description
                                        </FieldLabel>
                                        <InputGroup>
                                            <InputGroupTextarea
                                                {...field}
                                                id="form-rhf-demo-description"
                                                placeholder="Write description for your project"
                                                rows={6}
                                                className="min-h-24 resize-none"
                                                aria-invalid={fieldState.invalid}
                                            />
                                        </InputGroup>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="project_image"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Project Image
                                        </FieldLabel>
                                        <Input
                                            type="file"
                                            {...field}
                                            accept="image/*"
                                            value={undefined}
                                            id="form-rhf-demo-description"
                                            placeholder="Write description for your project"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="project_video"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Project Video
                                        </FieldLabel>
                                        <Input
                                            type="file"
                                            {...field}
                                            accept="video/*"
                                            value={undefined}
                                            id="form-rhf-demo-description"
                                            placeholder="Write description for your project"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="live_url"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            Live URL
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Live URL"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="git_hub"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            GitHub Repo Link
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="www.github/your-profile/repo-name..."
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="technology"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Technologies
                                        </FieldLabel>
                                        <SelectComponent
                                            onChange={field.onChange}
                                            value={field.value}
                                            placeholder="Select technologies that you have used to create this project"
                                            options={techOptions}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="button" variant="ghost" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit" form="form-rhf-demo">
                        Submit
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
