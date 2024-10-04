import { Result } from "../../core/logic/Result";
import IBuildingDTO from "../../dto/IBuildingDTO";
import IfloorDTO from "../../dto/IFloorDTO";
import { IOrientdimensDTO } from "../../dto/IOrientdimensDTO";
import IUpdateFloorDTO from "../../dto/IUpdateFloorDTO";

export default interface IfloorService {
    createfloor(floorDTO: IfloorDTO): Promise<Result<IfloorDTO>>;

    updatefloor(floorDTO: IUpdateFloorDTO): Promise<Result<IfloorDTO>>;

    updateMap(building: string, floor: number, passage: Array<IOrientdimensDTO>, elevator: IOrientdimensDTO,token: string): Promise<Result<IfloorDTO>>;

    listfloors(building: string, token: string): Promise<Result<IfloorDTO[]>>;

    listAllFloors(token : string): Promise<Result<IfloorDTO[]>>;

    listfloorsComPassagens(building1Id: string,token:string): Promise<Result<IfloorDTO[]>>;

    countfloors(): Promise<Result<number>>;
}
