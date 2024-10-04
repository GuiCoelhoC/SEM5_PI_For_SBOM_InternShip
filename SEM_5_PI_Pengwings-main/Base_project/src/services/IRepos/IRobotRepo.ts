import { Repo } from "../../core/infra/Repo";
import { Robot } from "../../domain/robot";
import { RobotID } from "../../domain/robotID";

export default interface IRobotRepo extends Repo<Robot> {
    save(robot: Robot): Promise<Robot>;
    findAll(): Promise<Array<Robot>>;
    findActive(): Promise<Array<Robot>>;
    findByCode(code: string): Promise<Robot>;
    update(robot: Robot): Promise<Robot>;
    countRobot(): Promise<number>;
}
