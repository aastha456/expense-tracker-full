import { z } from "zod";

export const createRoleSchema = z.object({
    name: z.string().min(5, "Name is required"),
    description: z.string().min(10, "Description is required"),
    permissions: z.array(z.string()).optional(), // array of permission as strings
})