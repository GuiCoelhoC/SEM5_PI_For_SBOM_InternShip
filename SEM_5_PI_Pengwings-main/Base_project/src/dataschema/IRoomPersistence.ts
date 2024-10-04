import { IDimensionDTO } from "../dto/IDimensionDTO";
import IDoorDTO from "../dto/IDoorDTO";

export interface IRoomPersistence {
    domainId: string;
    floor: number;
    building: string;
    name: string;
    description: string;
    roomtype: string;
}