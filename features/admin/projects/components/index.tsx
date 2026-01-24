"use client"

import { useEffect } from "react"
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
import { Project } from "@/types/portfolio.types"
import { formSchema } from "../utils/form.schema"
import { FileUploadPreview } from "./common/upload-field"
import { techOptions } from "../constants/tech-options"
import { useRouter } from "next/navigation"

export default function AddEditProjectForm({ editProject }: { editProject?: Project }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: editProject ? editProject : {
            title: "",
            description: "",
            technology: []
        },
    });
    const router = useRouter()

    useEffect(() => {
        if (editProject) {
            form.reset(editProject)
        }
    }, [editProject, form]);

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const isEditing = !!editProject?._id; // Check if an ID exists
        const url = isEditing ? `/api/projects?id=${editProject._id}` : "/api/projects";
        const method = isEditing ? "PUT" : "POST";

        // 1. Prepare FormData (required for file uploads)
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("live_url", data.live_url);
        if (data.git_hub) formData.append("git_hub", data.git_hub);

        // Handle Array of technologies
        data.technology?.forEach((tech) => formData.append("technologies[]", tech));

        // Handle Files (Only append if they are actual File objects)
        if (data.project_image instanceof File) {
            formData.append("project_image", data.project_image);
        } else if (typeof data.project_image === "string") {
            formData.append("project_image", data.project_image); // Send back existing URL
        }

        if (data.project_video instanceof File) {
            formData.append("project_video", data.project_video);
        } else if (typeof data.project_video === "string") {
            formData.append("project_video", data.project_video);
        }

        // 2. Define the Request Promise
        const request = fetch(url, {
            method: method,
            body: formData,
        }).then(async (res) => {
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Something went wrong");
            return result;
        });

        // 3. Execute with toast.promise
        toast.promise(request, {
            pending: isEditing ? "Updating project..." : "Creating project...",
            success: {
                render({ data }) {
                    router.push("/dashboard")
                    // Optional: Redirect or refresh data here
                    return `${data.message} 👌`;
                },
            },
            error: {
                render({ data }: { data: Error }) {
                    return data.message || "Failed to save project 🤯";
                },
            },
        });
    }

    return (
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
                            render={({ field, fieldState }) => {
                                return (
                                    <FileUploadPreview fieldState={fieldState} field={field} label="Project Image" type="image" />
                                )
                            }}
                        />
                        <Controller
                            name="project_video"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <FileUploadPreview fieldState={fieldState} field={field} label="Project Video" type="video" />

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
    )
}

