import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userServices";
import { successResponse } from "../utils/responseHelper";
import { AuthRequest } from "../middlewares/authenticate";

export const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const response = await userService.getAll();
        return successResponse(res, { data: response})

    } catch(error){
        next(error)
    }
}

export const getMe = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const response = await userService.getById(userId);

        return successResponse(res, { data: response })

    } catch (error) {
        next(error);
    }
}

export const getById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        const response = await userService.getById(String(id));
        return successResponse(res, { data: response})


    }catch(error){
        next(error)
    }
}

export const update = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id
        const data = req.body;
        const response = await userService.update(String(id), data);
        return successResponse(res, { data: response})


    }catch(error){
        next(error)
    }
}

export const remove = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id
        const response = await userService.remove(String(id));
        return successResponse(res, { data: response})


    }catch(error){
        next(error)
    }
}

