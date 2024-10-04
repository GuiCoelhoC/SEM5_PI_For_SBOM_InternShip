import { Repo } from "../../core/infra/Repo";
import { Elevator } from "../../domain/elevator";
import {Result} from "../../core/logic/Result";

export default interface IElevatorRepo extends Repo<Elevator> {
    save(elevator: Elevator): Promise<Elevator>;
    update(elevator: Elevator): Promise<Result<Elevator>>;
    findByBuildingId(building: string): Promise<Elevator[]>;
    findByCode(code: string): Promise<Elevator>;
    findAll(): Promise<Elevator[]>;
    countElevators(): Promise<number> ;
}
