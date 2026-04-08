import { AuthenticatedUser } from './../interfaces/user';
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { errorResponse } from "../utils/responseHelper";

export interface AuthRequest extends Request {
    user?: AuthenticatedUser;
}

export const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return errorResponse(res, {
            message: "Authentication token missing"})
        }
    req.user = jwt.verify(token, config.JWT_SECRET) as AuthenticatedUser;
    next();

}
