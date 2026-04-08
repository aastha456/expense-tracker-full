export interface CreateRoleRequest{
    name: string;
    description: string;
    permissions?: string[]; // array of permission as strings
}