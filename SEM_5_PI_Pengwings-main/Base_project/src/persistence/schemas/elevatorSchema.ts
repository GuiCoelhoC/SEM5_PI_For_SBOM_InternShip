import { IElevatorPersistence } from '../../dataschema/IElevatorPersistence';
import mongoose from 'mongoose';

const ElevatorSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    code: { type: String, unique: true },
    building: { type: String, required: true },
    floors: { type: Array , required: true},
    brand: { type: String },
    model: { type: String },
    serialNumber: { type: String },
    description: { type: String }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IElevatorPersistence & mongoose.Document>('Elevator', ElevatorSchema);
