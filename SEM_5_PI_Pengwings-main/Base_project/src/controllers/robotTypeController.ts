import { Request, Response, NextFunction } from "express";
import { Inject , Service} from "typedi";
import config from "../../config";

import IRobotTypeController from "./IControllers/IRobotTypeController";
import IRobotTypeService from "../services/IServices/IRobotTypeService";
import IRobotTypeDTO from "../dto/IRobotTypeDTO";
import { Result } from "../core/logic/Result";

@Service()
export default class RobotTypeController implements IRobotTypeController {

    constructor(
        @Inject(config.services.robotType.name)
        private robotTypeServiceInstance: IRobotTypeService
    ) {}

    public async createRobotType(req: Request, res: Response, next: NextFunction) {
        try {
            const robotTypeOrError = await this.robotTypeServiceInstance.createRobotType(req.body as IRobotTypeDTO) as Result<IRobotTypeDTO>;

            if (robotTypeOrError.isFailure) {
                return res.status(402).send(robotTypeOrError.errorValue());
            }

            const robotTypeDTO = robotTypeOrError.getValue();
            return res.json(robotTypeDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async getRobotTypes(req: Request, res: Response, next: NextFunction) {
      try {
        console.log("RobotTypeController: getRobotTypes");
        const robotTypeOrError = await this.robotTypeServiceInstance.getRobotTypes(req.query.token as unknown as string) as Result<Array<IRobotTypeDTO>>;

        if (robotTypeOrError.isFailure) {
          console.log(robotTypeOrError.errorValue());
          return res.status(402).send(robotTypeOrError.errorValue());
        }

        const robotTypeDTO = robotTypeOrError.getValue();
        return res.json(robotTypeDTO).status(201);

      }catch (e) {
        return next(e);
      }
    }

    public async countRobotType(req: Request, res: Response, next: NextFunction) {
        try {
            const robotTypeOrError = await this.robotTypeServiceInstance.contarRobotType() as Result<number>;



            if (robotTypeOrError.isFailure) {
                return res.status(402).send(robotTypeOrError.errorValue());
            }

            const robotTypeCount = robotTypeOrError.getValue();
            return res.status(201).json({
                totalrobotTypes: robotTypeCount
            });
        }
        catch (e) {
            return next(e);
        }
    }
}
