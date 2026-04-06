import { UserRegisterRequest, UserLoginRequest} from "../interfaces/user";
import UserModel from "../models/UserModel";
import { NUMBER_OF_SALT_ROUNDS} from "../constants/auth";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";
import SessionModel from "../models/SessionModel";
import jwt from "jsonwebtoken";

export const register = async (data: UserRegisterRequest) => {
    const { name, email, password } = data;

    const existingUser = await UserModel.findOne({email});
    
    if(existingUser){
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, NUMBER_OF_SALT_ROUNDS);
    return await UserModel.create({name, email, password: hashedPassword});

}

export const login = async (data: UserLoginRequest) => {
    const { email, password} = data;

    const user = await UserModel.findOne({email}).select("password");
    if(!user){
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        throw new Error("Invalid password");
    }
    
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    
    //decoded the refresh token to get the expiry time and store in session collection
    const decoded = jwt.decode(refreshToken) as { exp: number};
    // calculate the expiry time in milliseconds and convert to date object 
    const expiresAt = new Date(decoded.exp * 1000);

    await SessionModel.create({userId: user._id, refreshToken, expiresAt});

    return {
        accessToken, 
        refreshToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
            
        }
    };

}

export const logout = async (refreshToken: string) => {
    await SessionModel.findOneAndDelete({refreshToken});
}

export const generateAccessTokenBasedOnRefreshToken = async (refreshToken: string) => {
    const session = await SessionModel.findOne({refreshToken});

    if(!session){
        throw new Error('Invalid refresh token');
    }

    if(session.expiresAt < new Date()){
        throw new Error('Refresh token expired');

    }

    const user = await UserModel.findById(session.userId);
    if(!user){
        throw new Error('User not found');
    }

    const accessToken = generateAccessToken(user);
    return accessToken;
}

