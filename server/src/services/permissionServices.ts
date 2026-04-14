import { PermissionRequest } from "../interfaces/permission"
import PermissionModel from "../models/PermissionModel";

export const create = async (data: PermissionRequest) => {
    const {name, description} = data;

    const existingPermission = await PermissionModel.findOne({name});

    if(existingPermission){
        throw new Error("Permission already exists")
    }

    return await PermissionModel.create({name, description})
    
}

export function getAll() {
    throw new Error('Function not implemented.');
}
