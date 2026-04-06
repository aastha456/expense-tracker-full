import { Request, Response, NextFunction} from 'express';
import * as permissionServices from '../services/permissionServices';
import { successResponse } from "../utils/responseHelper";

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const response = await permissionServices.create(req.body);
        return successResponse(res, {data: response});

    }catch(error){
        next(error)
    }
}