import { Result } from "../../core/logic/Result";
import IElevatorDTO from "../../dto/IElevatorDTO";

export default interface IElevatorService {
    createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;

    updateElevator(body: IElevatorDTO): Promise<Result<IElevatorDTO>>;

    listByBuilding(query: string,token: string): Promise<Result<Array<IElevatorDTO>>>;

    countElevators(): Promise<Result<number>>;

    listAllElevators(token: string): Promise<Result<IElevatorDTO[]>>;
}
