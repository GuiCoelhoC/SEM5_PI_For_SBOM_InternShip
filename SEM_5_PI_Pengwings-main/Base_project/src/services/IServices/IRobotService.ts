import { Result } from "../../core/logic/Result";
import IRobotDTO from "../../dto/IRobotDTO";

export default interface IRobotService {
    createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;

    listAllRobots(token:string): Promise<Result<Array<IRobotDTO>>>;

    listActiveRobots(token:string): Promise<Result<Array<IRobotDTO>>>;

    inhibitRobo(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;

    countRobots(): Promise<Result<number>>;
}

