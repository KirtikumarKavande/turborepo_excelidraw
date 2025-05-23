import { z } from "zod";

export const CreateUserSchema = z.object({
    email: z.string(),
    password: z.string(),
    name: z.string(),
    photo: z.string().url().optional(),
})

export const SigninSchema = z.object({
    email: z.string(),
    password: z.string(),
})

