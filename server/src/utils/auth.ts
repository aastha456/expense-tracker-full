import jwt from "jsonwebtoken";
import { IUser } from "../models/UserModel";
import { config } from "../config";
import { UsersWithRolesAndPermissions } from "../interfaces/user";

export const generateAccessToken = (user: UsersWithRolesAndPermissions, roles: string[], permissions: string[]) => {

    return jwt.sign(
        {
            userId: user._id,
            email: user.email,
            roles,
            permissions
        },
        config.JWT_SECRET,{
            expiresIn: "1d"
        }
    )
}

export const generateRefreshToken = ( user: UsersWithRolesAndPermissions) => {
    return jwt.sign(
        {
            userId: user._id,
            email: user.email
        },
        config.JWT_SECRET,{
            expiresIn: "30d"
        }
    )
}


