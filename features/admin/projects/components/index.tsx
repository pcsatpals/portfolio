"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useFieldArray, useForm, UseFormReturn } from "react-hook-form"
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
import { toast } from "react-toastify"
import SelectComponent from "@/components/common/select-component"
import { Project } from "@/types/portfolio.types"
import { formSchema } from "../utils/form.schema"
import { FileUploadPreview } from "./common/upload-field"
import { techOptions } from "../constants/tech-options"
import { useRouter } from "next/navigation"
import FormFieldWrapper from "@/components/common/form-field-wrapper"
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Trash2 } from "lucide-react"
import RichTextEditor from "@/components/common/text-editor"

export default function AddEditProjectForm({ editProject }: { editProject?: Project }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: editProject ? editProject : {
            title: "",
            description: "",
            technologies: [],
            git_hub: "",
            key_features: "",
            live_url: "",
            long_description: "",
            other_images: [],
            project_image: null,
            project_video: null
        },
    });
    const router = useRouter()

    useEffect(() => {
        if (editProject) {
            form.reset(editProject)
        }
    }, [editProject, form]);

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const isEditing = !!editProject?._id;
        const url = isEditing
            ? `/api/projects?id=${editProject._id}`
            : "/api/projects";
        const method = isEditing ? "PUT" : "POST";

        const formData = new FormData();

        // ===== Basic Fields =====
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("long_description", data.long_description || "");
        formData.append("key_features", data.key_features || "");
        formData.append("live_url", data.live_url);

        if (data.git_hub) {
            formData.append("git_hub", data.git_hub);
        }

        // ===== Technologies Array =====
        data.technologies?.forEach((tech) => {
            formData.append("technologies[]", tech);
        });

        // ===== Main Image =====
        if (data.project_image instanceof File) {
            formData.append("project_image", data.project_image);
        } else if (typeof data.project_image === "string") {
            formData.append("project_image", data.project_image);
        }

        // ===== Video =====
        if (data.project_video instanceof File) {
            formData.append("project_video", data.project_video);
        } else if (typeof data.project_video === "string") {
            formData.append("project_video", data.project_video);
        }

        data.other_images?.forEach((img) => {
            if (img instanceof File) {
                // New upload
                formData.append("other_images[]", img);
            } else if (typeof img === "string") {
                // Existing image URL (edit mode)
                formData.append("existed_images[]", img);
            }
            // null values are ignored automatically
        });

        // ===== Request =====
        const request = fetch(url, {
            method,
            body: formData,
        }).then(async (res) => {
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Something went wrong");
            return result;
        });

        // ===== Toast Handling =====
        toast.promise(request, {
            pending: isEditing ? "Updating project..." : "Creating project...",
            success: {
                render({ data }) {
                    router.push("/admin/dashboard");
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
                <Form {...form}>
                    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className="flex flex-col gap-4">
                            <FormFieldWrapper
                                component={Input}
                                control={form.control}
                                name="title"
                                label="Title"
                                placeholder="Enter Projects Title here"
                                required
                            />
                            <FormFieldWrapper
                                component={Textarea}
                                control={form.control}
                                name="description"
                                label="Description"
                                placeholder="Enter project's description here"
                                required
                            />
                            <FormField
                                control={form.control}
                                name="long_description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex gap-[2px] font-inter text-sm items-center [&_svg]:size-3">
                                            Long Description
                                        </FormLabel>
                                        <RichTextEditor
                                            value={field.value ?? ""}
                                            onChange={field.onChange}
                                        />
                                    </FormItem>
                                )}
                            />
                            <Controller
                                name="project_image"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <FileUploadPreview
                                            fieldState={fieldState}
                                            field={field}
                                            label="Project Image"
                                            type="image"
                                        />
                                    )
                                }}
                            />
                            <Controller
                                name="project_video"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <FileUploadPreview
                                        fieldState={fieldState}
                                        field={field}
                                        label="Project Video"
                                        type="video"
                                    />
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="key_features"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex gap-[2px] font-inter text-sm items-center [&_svg]:size-3">
                                            Key Features
                                        </FormLabel>
                                        <RichTextEditor
                                            value={field.value ?? ""}
                                            onChange={field.onChange}
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormFieldWrapper
                                component={Input}
                                control={form.control}
                                name="live_url"
                                label="Live URL"
                                placeholder="Enter Projects Live URL"
                                required
                            />

                            <FormFieldWrapper
                                component={Input}
                                control={form.control}
                                name="git_hub"
                                label="GitHub Repo Link"
                                placeholder="www.github/your-profile/repo-name..."
                            />

                            <Controller
                                name="technologies"
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

                            <OtherImages form={form} />
                        </FieldGroup>
                    </form>
                </Form>
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


const OtherImages = ({
    form
}: {
    form: UseFormReturn<z.infer<typeof formSchema>>;
}) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "other_images" as never
    })

    return (
        <div className="flex flex-col gap-4 w-full py-3 mt-2 border-y border-white/30">
            <div className="flex items-center justify-between w-full">
                <p className="font-medium text-lg">Other Images</p>

                <Button
                    type="button"
                    onClick={() => append(null)}
                    className="text-sm"
                >
                    + Add Image
                </Button>
            </div>
            {fields.map((item, index) => (
                <FormField
                    key={item.id}
                    control={form.control}
                    name={`other_images.${index}`}
                    render={({ field, fieldState }) => (
                        <div className="flex items-start gap-2">
                            <FileUploadPreview
                                field={field}
                                fieldState={fieldState}
                                label={`Image ${index + 1}`}
                                type="image"
                            />

                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => remove(index)}
                                className=" mt-8"
                            >
                                <Trash2 />
                                Remove
                            </Button>
                        </div>
                    )}
                />
            ))}
        </div>
    )

}