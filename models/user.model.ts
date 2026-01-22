import { models, model, Schema } from "mongoose";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";


export interface User {
    userName: string;
    email: string;
    password: string;
    createdAt?: Date;
}

const UserSchema = new Schema<User>(
    {
        userName: {
            type: "String",
            required: true
        },
        email: {
            type: "String",
            required: true
        },
        password: {
            type: "String",
            required: true,
            select: false
        }
    },
    {
        timestamps: true
    }
)


UserSchema.pre("save", async function () {
    // 1. GENERIC UNIQUE ID LOGIC (Only runs on first creation)
    if (this.isNew) {
        const slug = this.userName
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

        this.userName = `${slug}-${nanoid(6)}`;
    }

    // 🔹 Hash password ONLY if changed
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

export const User = models.User || model<User>("User", UserSchema);