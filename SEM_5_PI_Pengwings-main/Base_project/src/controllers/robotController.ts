import e, { Request, Response, NextFunction } from "express";
import { Inject , Service} from "typedi";
import config from "../../config";

import IRobotController from "./IControllers/IRobotController";
import IRobotService from "../services/IServices/IRobotService";
import IRobotDTO from "../dto/IRobotDTO";
import { Result } from "../core/logic/Result";

@Service()
export default class RobotController implements IRobotController {

  constructor(
    @Inject(config.services.robot.name)
    private robotServiceInstance: IRobotService
  ) {
  }

  public async createRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = await this.robotServiceInstance.createRobot(req.body as IRobotDTO) as Result<IRobotDTO>;

      if (robotOrError.isFailure) {
        return res.status(402).send(robotOrError.errorValue());
      }

      const robotDTO = robotOrError.getValue();
      return res.json(robotDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async listAllRobots(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = await this.robotServiceInstance.listAllRobots(req.query.token as unknown as string) as Result<Array<IRobotDTO>>;
      if (robotOrError.isFailure) {
        return res.status(402).send(robotOrError.errorValue());
      }

      const robotDTO = robotOrError.getValue();
      return res.json(robotDTO).status(201);

    } catch (e) {
      return next(e);
    }
  }

  public async inhibitRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = await this.robotServiceInstance.inhibitRobo(req.body as IRobotDTO) as Result<IRobotDTO>;
      if (robotOrError.isFailure) {
        return res.status(402).send(robotOrError.errorValue());
      }

      const robotDTO = robotOrError.getValue();
      return res.json(robotDTO).status(201);

    } catch (e) {
      return next(e);
    }
  }

  public async listActiveRobots(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = await this.robotServiceInstance.listActiveRobots(req.query.token as unknown as string) as Result<Array<IRobotDTO>>;
      if (robotOrError.isFailure) {
        return res.status(402).send(robotOrError.errorValue());
      }

      const robotDTO = robotOrError.getValue();
      return res.json(robotDTO).status(201);

    } catch (e) {
      return next(e);
    }
  }

  public async countRobots(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = await this.robotServiceInstance.countRobots() as Result<number>;
      if (robotOrError.isFailure) {
        return res.status(402).send(robotOrError.errorValue());
      }

      const number = robotOrError.getValue();
      return res.status(201).json({
        totalRobos: number
      });

    } catch (e) {
      return next(e);
    }
  }

}
