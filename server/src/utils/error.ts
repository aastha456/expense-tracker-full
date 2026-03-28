import { NotFound } from "../interfaces/error";

export const notFound = (message?: string) : NotFound => {
    return {
        message: message || "Item not found",
        status: 404
    }
}