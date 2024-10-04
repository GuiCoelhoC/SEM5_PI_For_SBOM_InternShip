import { IRoomPersistence } from "../../dataschema/IRoomPersistence";
import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        floor: { type: Number, required: true},
        building: { type: String, required: true},
        name: { type: String , required: true},
        description: { type: String },
        roomtype: { type: String , required: true}
    },
    {
        timestamps: true
    }
    );

export default mongoose.model<IRoomPersistence & mongoose.Document>('Room', RoomSchema);