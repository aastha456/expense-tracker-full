import { UserAuthRequest } from "../interfaces/user";
import UserModel from "../models/UserModel";

export const register = async (data: UserAuthRequest) => {
    const { name, email, password } = data;

    const existingUser = await UserModel.findOne({email});
    
    if(existingUser){
        throw new Error("User already exists");
    }

    return await UserModel.create({name, email, password});


}