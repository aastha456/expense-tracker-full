import { CreateRoleRequest } from "../interfaces/role";
import RoleModel from "../models/RoleModel";
import PermissionModel from "../models/PermissionModel";
import mongoose from "mongoose";

export const create = async (data: CreateRoleRequest) => {
    const { name, description, permissions} = data;

    const existingRole = await RoleModel.findOne({name});

    if(existingRole){
        throw new Error("Role is already exists")
    }


    let permissionIds: mongoose.Types.ObjectId[] = [];

    if(permissions && permissions.length > 0){
        const perms = await PermissionModel.find({name: {$in: permissions}});
        // get ids of permission returned from the database and assign it to the permissionIds array
        permissionIds = perms.map(p => p._id);
        // check if all the permissions provided in the request exist in the database
        if(permissionIds.length !== permissions.length){
            throw new Error("One or more permission does not exist")
        }

    }

    return RoleModel.create({
        name,
        description,
        ...(permissionIds.length > 0 && { permissions: permissionIds })
    })

}

export const getAll = async () => {
    return await RoleModel.find().populate("permissions", "name description");
    
    // return roles.map(role => ({
    //     id: role._id,
    //     name: role.name,
    //     description: role.description,
    //     permissions: role.permissions
    // }));
}