import { Schema, model, Document, Types} from "mongoose";

export interface IRole extends Document {
    name: string;
    description: string;
    permissions?: Types.ObjectId[];

}

const roleSchema = new Schema<IRole>({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    permissions: [{
        type: Schema.Types.ObjectId,
        ref: "Permission"
    }]
})

const RoleModel = model<IRole>("Role", roleSchema);
export default RoleModel;