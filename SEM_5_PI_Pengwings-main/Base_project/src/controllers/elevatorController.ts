import {NextFunction, Request, Response} from 'express';
import { Inject, Service } from 'typedi';

import IElevatorController from './IControllers/IElevatorController';
import IElevatorService from '../services/IServices/IElevatorService';
import IElevatorDTO from '../dto/IElevatorDTO';
import { Result } from '../core/logic/Result';
import ElevatorService from "../services/elevatorService";

@Service()
export default class ElevatorController implements IElevatorController {
  constructor(
    @Inject(() => ElevatorService) private elevatorServiceInstance: IElevatorService
  ) {}

  public async createElevator(req: Request, res: Response, next: NextFunction) {
    try {
        console.log('Creating Elevator');
      const elevatorOrError = await this.elevatorServiceInstance.createElevator(req.body as IElevatorDTO) as Result<IElevatorDTO>;

      if (elevatorOrError.isFailure) {
        return res.status(402).send(elevatorOrError.errorValue());
      }

      const elevatorDTO = elevatorOrError.getValue();
      return res.json(elevatorDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  }

  public async updateElevator(req: Request, res: Response, next: NextFunction) {
    try{
      const elevatorOrError = await this.elevatorServiceInstance.updateElevator(req.body as IElevatorDTO) as Result<IElevatorDTO>;

      if (elevatorOrError.isFailure) {
        return res.status(402).send(elevatorOrError.errorValue());
      }

      const elevatorDTO = elevatorOrError.getValue();
      return res.json(elevatorDTO).status(201);

    } catch (e){
      return next(e);}
  }

  public async listByBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Listing Elevators by Building');
      const elevatorOrError = await this.elevatorServiceInstance.listByBuilding(req.query.building as unknown as string,req.query.token as unknown as string) as Result<Array<IElevatorDTO>>;

      if (elevatorOrError.isFailure) {
        return res.status(402).send(elevatorOrError.errorValue());
      }


      return res.status(201).json(elevatorOrError);
    } catch (e){
        throw Result.fail<IElevatorDTO>('An unexpected error occurred');
    }
  }

  public async countElevators(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Counting Elevators');
      const elevatorOrError = await this.elevatorServiceInstance.countElevators() as Result<number>;

      if (elevatorOrError.isFailure) {
        return res.status(402).json(elevatorOrError.errorValue());
      }

      const elevatorNumber = elevatorOrError.getValue();

      return res.status(201).json({
        totalElevators: elevatorNumber
      });
    } catch (e){
      throw Result.fail<IElevatorDTO>('An unexpected error occurred');
    }
  }

  public async listAllElevators(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Listing all Elevators');
      const elevatorOrError = await this.elevatorServiceInstance.listAllElevators(req.query.token as unknown as string) as Result<Array<IElevatorDTO>>;

      if (elevatorOrError.isFailure) {
        return res.status(402).send(elevatorOrError.errorValue());
      }
      return res.json(elevatorOrError.getValue()).status(201);
    } catch (e){
      throw Result.fail<IElevatorDTO>('An unexpected error occurred');
    }
  }
}
