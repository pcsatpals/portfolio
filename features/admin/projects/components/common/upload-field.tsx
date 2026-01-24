"use client"

import { useEffect, useState } from "react"
import { ControllerFieldState, ControllerRenderProps, FieldValues, Path } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"


interface FileUploadPreviewProps<
    TFieldValues extends FieldValues,
    TName extends Path<TFieldValues>
> {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    label: string;
    type: "image" | "video";
}

export const FileUploadPreview = <
    TFieldValues extends FieldValues,
    TName extends Path<TFieldValues>
>({
    field,
    fieldState,
    label,
    type
}: FileUploadPreviewProps<TFieldValues, TName>) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!field.value) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPreviewUrl(null);
            return;
        }

        if (typeof field.value === "string") {
            setPreviewUrl(field.value);
        } else if (field.value) {
            const objectUrl = URL.createObjectURL(field.value);
            setPreviewUrl(objectUrl);
            // Cleanup to prevent memory leaks
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [field.value]);

    return (
        <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{label}</FieldLabel>

            {previewUrl ? (
                <div className="relative w-full flex items-center gap-4 font-jakarta-sans justify-between h-30 p-4 mb-2 group border border-white/30 rounded-2xl">
                    <div className="w-40 h-full relative overflow-hidden rounded-md border border-white/10">
                        {type === "image" ? (
                            <Image
                                src={previewUrl}
                                alt="Preview"
                                height={800}
                                width={800}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <video
                                src={previewUrl}
                                className="w-full h-full object-cover"
                                muted
                            />
                        )}
                    </div>

                    <div className="flex flex-col grow gap-2 truncate">
                        <p className="truncate text-sm">
                            {typeof field.value === "string" ? field.value : field.value?.name}
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">{type}</p>
                    </div>

                    <Button
                        type="button"
                        size="sm"
                        className="w-fit outline"
                        onClick={() => field.onChange(null)}
                    >
                        Remove
                    </Button>
                </div>
            ) : (
                <Input
                    type="file"
                    accept={type === "image" ? "image/*" : "video/*"}
                    onChange={(e) => field.onChange(e.target?.files?.[0])}
                    aria-invalid={fieldState.invalid}
                    className="bg-transparent"
                />
            )}

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    );
};