import { IRobotPersistence } from "../../dataschema/IRobotPersistence";
import mongoose from 'mongoose';

const RobotSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        code: { type: String, unique: true, required: true },
        name: { type: String, required: true, unique: true },
        serial_number: { type: String, required: true, unique: true },
        description: { type: String },
        type: { type: String, required: true },
        active: { type: Boolean, required: true, default: true }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', RobotSchema);
