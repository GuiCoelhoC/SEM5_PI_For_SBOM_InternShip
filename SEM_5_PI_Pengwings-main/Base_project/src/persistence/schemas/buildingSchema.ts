import { IBuildingPersistence } from "../../dataschema/IBuildingPersistence";
import mongoose from 'mongoose';

const BuildingSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    code: { type: String, unique: true },
    name: { type: String , required: true},
    description: { type: String, required: false },
    widthMax: { type: Number, required: true },
    lengthMax: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', BuildingSchema);