import { z} from 'zod';

export const createPermissionSchema = z.object({
    name: z.string().min(5, "Name is required"),
    description: z.string().min(10, "Description is required")


})