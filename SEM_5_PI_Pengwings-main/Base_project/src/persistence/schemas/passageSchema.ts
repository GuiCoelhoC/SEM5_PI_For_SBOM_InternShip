import { IPassagePersistence} from "../../dataschema/IPassagePersistence";
import mongoose from 'mongoose';

const PassageSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        code: { type: String , unique: true },
        floor1Id: { type: Number, unique: false },
        floor2Id: { type: Number, unique: false },
        building1Id: { type: String, unique: false },
        building2Id: { type: String, unique: false },
    },
    {
        timestamps: true //??
    }
);

export default mongoose.model<IPassagePersistence & mongoose.Document>('passage', PassageSchema);




