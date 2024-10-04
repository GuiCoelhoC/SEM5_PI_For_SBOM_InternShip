import { Repo } from "../../core/infra/Repo";
import { Result } from "../../core/logic/Result";
import { Floor } from "../../domain/floor";
import IfloorDTO from "../../dto/IFloorDTO";
import { IOrientdimensDTO } from "../../dto/IOrientdimensDTO";
import IUpdateFloorDTO from "../../dto/IUpdateFloorDTO";

export default interface IFloorRepo extends Repo<Floor> {
    save(floor: Floor): Promise<Floor>;
    findByNumber(number: number): Promise<Floor>;
    findByNumberAndBuilding(number: number, building: string): Promise<Floor>;
    findAllByNumber(number: number): Promise<Floor[]>;
    findAllByBuilding(building: string): Promise<Floor[]>;
    findAll(): Promise<Floor[]>;
    findfloorsComPassagens(building1Id: string, building2Id: string): Promise<Floor[]>;
    // findByfloorID(floorID: floorID): Promise<floor>;
    update(floorDTO: IUpdateFloorDTO): Promise<Result<Floor>>;
    updateMap(floorDTO: IfloorDTO): Promise<Result<Floor>>;
    countfloors(): Promise<number>;
}
