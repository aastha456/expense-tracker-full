import { AuthRequest } from "./authenticate"
import { Response, NextFunction } from "express";

export interface AuthorizeOptions {
    permission: string;
}

export const authorizeWithPermissions = (options: AuthorizeOptions) => {
    const { permission } = options;

    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const user = req.user;

        if(!user){
            throw next(new Error("User not authenticated"));
        }
        
        // This will move to the next service hanlder in the router
        if(user?.roles.includes("SUPER_ADMIN")){
            return next();
        }

        const userPermissions = user?.permissions || [];

        const isAuthorized = userPermissions.includes(permission);

        if(!isAuthorized){
            throw next(new Error("User is not authorized to perform this action"));
        }
        next();
    };

};
