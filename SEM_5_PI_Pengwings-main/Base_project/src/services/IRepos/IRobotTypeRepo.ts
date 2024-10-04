import { Repo } from "../../core/infra/Repo";
import { RobotType } from "../../domain/robotType";
import { RobotTypeID } from "../../domain/robotTypeID";

export default interface IRobotTypeRepo extends Repo<RobotType> {
    save(robotType: RobotType): Promise<RobotType>;
    findByType(type: string): Promise<RobotType>;
    findAll(): Promise<RobotType[]>;
    countRobotType(): Promise<number>;
}
