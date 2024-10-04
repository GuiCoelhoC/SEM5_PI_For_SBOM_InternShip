import { Service, Inject } from "typedi";
import config from "../../config";
import IRobotDTO from "../dto/IRobotDTO";
import { Robot } from "../domain/robot";
import IRobotRepo from "./IRepos/IRobotRepo";
import IRobotService from "./IServices/IRobotService";
import { Result } from "../core/logic/Result";
import { RobotMap } from "../mappers/RobotMap";
import { RobotType } from "../domain/robotType";
import IRobotTypeRepo from "./IRepos/IRobotTypeRepo";
import IAuthRole from "../AuthRole/IAuthRole";

@Service()
export default class RobotService implements IRobotService {

    constructor(
        @Inject(config.repos.robot.name) private robotRepo : IRobotRepo,
        @Inject(config.repos.robotType.name) private robotTypeRepo : IRobotTypeRepo,
        @Inject(config.auth.AuthRole.name) private authRole : IAuthRole
    ) {}

    public async createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
        try {
            if(!await this.authRole.RoleFleet(robotDTO.token)){
                return Result.fail<IRobotDTO>('Unauthorized');
            }

            let robotType : RobotType;

            const robotTypeOrError = await this.getRobotType(robotDTO.type);

            if (robotTypeOrError.isFailure) {
                return Result.fail<IRobotDTO>('Robot type not found');
            }else{
                robotType = robotTypeOrError.getValue();
            }

            const robotOrError = await Robot.create({
                code: robotDTO.code,
                name: robotDTO.name,
                serial_number: robotDTO.serial_number,
                description: robotDTO.description,
                type: robotType
            });

            if (robotOrError.isFailure) {
                return Result.fail<IRobotDTO>(robotOrError.errorValue());
            }

            const robotResult = robotOrError.getValue();

            await this.robotRepo.save(robotResult);

            const robotDTOResult = RobotMap.toDTO(robotResult) as IRobotDTO;

            return Result.ok<IRobotDTO>(robotDTOResult)
        } catch (e) {
            return Result.fail<IRobotDTO>('An unexpected error has occurred');
        }
    }

    private async getRobotType(type: string): Promise<Result<RobotType>> {

        const robotType = await this.robotTypeRepo.findByType(type);
        const found = !!robotType;

        if (found) {
            return Result.ok<RobotType>(robotType);
        }else {
            return Result.fail<RobotType>("Tipo de robo não encontrado");
        }
    }

    public async listActiveRobots(token : string): Promise<Result<Array<IRobotDTO>>> {
        try {
            if(!await this.authRole.RoleFleet(token)){
                return Result.fail<Array<IRobotDTO>>('Unauthorized');
            }
            const robotOrError = await this.robotRepo.findActive();

            if (robotOrError == null) {
                return Result.fail<Array<IRobotDTO>>("No Robos found");
            } else {
              const robotDTOArray = robotOrError.map((robot: Robot) => {
                return RobotMap.toDTO(robot) as IRobotDTO;
              });

              return Result.ok<Array<IRobotDTO>>(robotDTOArray);
            }
        } catch (e) {
            throw e;
        }
    }

    public async listAllRobots(token: string): Promise<Result<Array<IRobotDTO>>> {
        try {
            if(!await this.authRole.RoleFleet(token)){
                return Result.fail<Array<IRobotDTO>>('Unauthorized');
            }
            const robotOrError = await this.robotRepo.findAll();

            if (robotOrError == null) {
                return Result.fail<Array<IRobotDTO>>("No Robos found");
            } else {
              const robotDTOArray = robotOrError.map((robot: Robot) => {
                return RobotMap.toDTO(robot) as IRobotDTO;
              });

              return Result.ok<Array<IRobotDTO>>(robotDTOArray);
            }
        } catch (e) {
            throw e;
        }
    }

    public async inhibitRobo(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
        try {
            if(!await this.authRole.RoleFleet(robotDTO.token)){
                return Result.fail<IRobotDTO>('Unauthorized');
            }
            const robotOrError = await this.robotRepo.findByCode(robotDTO.code);
            if (robotOrError == null) {
                return Result.fail<IRobotDTO>("The robot you are trying to inhibit does not exist");
            } else {
                const robot = robotOrError;

                robot.deactivate();

                await this.robotRepo.update(robot);

                const robotDTOResult = RobotMap.toDTO(robot) as IRobotDTO;

                return Result.ok<IRobotDTO>(robotDTOResult);
            }
        } catch (e) {
            return Result.fail<IRobotDTO>('An unexpected error has occurred');
        }
    }

    public async countRobots(): Promise<Result<number>> {
        try {
            const robotOrError = await this.robotRepo.countRobot();

            return Result.ok<number>(robotOrError);

        } catch (e) {
            throw e;
        }
    }
}
