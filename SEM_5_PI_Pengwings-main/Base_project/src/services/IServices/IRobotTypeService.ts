import { Result } from "../../core/logic/Result";
import IRobotTypeDTO from "../../dto/IRobotTypeDTO";

export default interface IRobotTypeService {
    createRobotType(RobotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;
    getRobotTypes(token : string): Promise<Result<Array<IRobotTypeDTO>>>;
    contarRobotType(): Promise<Result<number>>;
}
