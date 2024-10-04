import { IfloorPersistence } from "../../dataschema/IfloorPersistence";
import mongoose from 'mongoose';

const floorSchema = new mongoose.Schema(
  {
      domainId: { type: String, unique: true },
      floorNumber: { type: Number },
      description: { type: String },
      width: { type: Number , required: true},
      length: { type: Number , required: true},
      map: { type: Array },
      building: { type: String }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IfloorPersistence & mongoose.Document>('floor', floorSchema);
