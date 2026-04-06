import { Schema, model, Document} from 'mongoose';

export interface IPermission extends Document {
    name: string;
    description: string;
}

const permissionSchema = new Schema <IPermission>({
    name: {
        type: String,
        unique: true,
        required: true

    },
    description: {
        type: String,
        required: true
    }
})

const PermissionModel = model<IPermission>("Permission", permissionSchema);
export default PermissionModel;
