import { IRobotTypePersistence } from "../../dataschema/IRobotTypePersistence";
import mongoose from 'mongoose';

const RobotTypeSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        type: { type: String, required: true },
        brand: { type: String, required: true, unique: true },
        model: { type: String, required: true, unique: true },
        tasks: { type: Array, required: true }
    }
);

export default mongoose.model<IRobotTypePersistence & mongoose.Document>('RobotType', RobotTypeSchema);
