import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authServices";
import httpCodes from "../constants/httpCodes";
import { successResponse } from "../utils/responseHelper"

export const register = async(
    req: Request, 
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await authService.register(req.body);
        return successResponse(res, {status: httpCodes.RESOURCE_CREATED.statusCode,
            data: response
        })

        res.status(httpCodes.RESOURCE_CREATED.statusCode).send({});


    } catch(error){
        next(error)
    }

}

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const response = await authService.login(req.body);
        return successResponse( res, { data: response})

    } catch(error){
        next(error)
    }

}


// login, logout, generateAccessTokenBasedOnRefreshToken

