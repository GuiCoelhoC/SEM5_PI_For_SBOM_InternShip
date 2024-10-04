import { Result } from "../../core/logic/Result";
import IBuildingDTO from "../../dto/IBuildingDTO";

export default interface IBuildingService  {
    createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
    updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
    listBuildings(token : string): Promise<Result<Array<IBuildingDTO>>>;
    listMinMax(min: number, max: number, token: string): Promise<Result<IBuildingDTO[]>>;
    contarBuildings(): Promise<Result<number>>;
}
