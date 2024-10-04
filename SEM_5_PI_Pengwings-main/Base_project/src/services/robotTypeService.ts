import { Service, Inject } from "typedi";
import config from "../../config";
import IRobotTypeDTO from "../dto/IRobotTypeDTO";
import { RobotType } from "../domain/robotType";
import IRobotTypeRepo from "./IRepos/IRobotTypeRepo";
import IRobotTypeService from "./IServices/IRobotTypeService";
import { Result } from "../core/logic/Result";
import { RobotTypeMap } from "../mappers/RobotTypeMap";
import IfloorDTO from "../dto/IFloorDTO";
import {floorMap} from "../mappers/FloorMap";
import IAuthRole from "../AuthRole/IAuthRole";

@Service()
export default class RobotTypeService implements IRobotTypeService {

    constructor(
        @Inject(config.repos.robotType.name) private robotTypeRepo : IRobotTypeRepo,
        @Inject(config.auth.AuthRole.name) private authRole : IAuthRole
    ) {}

    public async createRobotType(RobotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>> {

        try{
            if(!await this.authRole.RoleFleet(RobotTypeDTO.token)){
                return Result.fail<IRobotTypeDTO>('Unauthorized');
            }
            const robotTypeOrError = await RobotType.create(RobotTypeDTO);

            if (robotTypeOrError.isFailure) {
                return Result.fail<IRobotTypeDTO>(robotTypeOrError.errorValue());
            }

            const robotTypeResult = robotTypeOrError.getValue();

            await this.robotTypeRepo.save(robotTypeResult);

            const robotTypeDTOResult = RobotTypeMap.toDTO(robotTypeResult) as IRobotTypeDTO;
            return Result.ok<IRobotTypeDTO>(robotTypeDTOResult)
        }catch(e){
            return Result.fail<IRobotTypeDTO>('An unexpected error has ocurred.');
        }
    }

    public async getRobotTypes(token: string): Promise<Result<Array<IRobotTypeDTO>>> {
      try {
        if(!await this.authRole.RoleFleet(token)){
            return Result.fail<Array<IRobotTypeDTO>>('Unauthorized');
        }
        const robotTypesOrError = await this.robotTypeRepo.findAll();
        if (robotTypesOrError == null) {
          return Result.fail<IRobotTypeDTO[]>('No robot type found');
        } else {
          const robotTypeDTO = robotTypesOrError.map((robotType) => {
            return RobotTypeMap.toDTO(robotType);
          });
          return Result.ok<IRobotTypeDTO[]>(robotTypeDTO);
        }
      } catch (e) {
        return Result.fail<IRobotTypeDTO[]>('An unexpected error has occurred');
      }
    }

    public async contarRobotType(): Promise<Result<number>> {
        try {
            const robotTypeCount = await this.robotTypeRepo.countRobotType();
            return Result.ok<number>(robotTypeCount);
        }
        catch (e) {
            throw e;
        }
    }
}
