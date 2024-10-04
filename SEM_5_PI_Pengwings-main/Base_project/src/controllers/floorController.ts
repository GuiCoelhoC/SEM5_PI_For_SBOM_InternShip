import { Request, Response, NextFunction } from "express";
import { Inject , Service} from "typedi";
import config from "../../config";

import IfloorController from "./IControllers/IFloorController";
import IfloorService from "../services/IServices/IFloorService";
import IfloorDTO from "../dto/IFloorDTO";

import { Result } from "../core/logic/Result";
import floorService from "../services/floorService";
import IBuildingDTO from "../dto/IBuildingDTO";
import { IOrientdimensDTO } from "../dto/IOrientdimensDTO";
import IUpdateFloorDTO from "../dto/IUpdateFloorDTO";
@Service()
export default class floorController implements IfloorController {
    constructor(
        @Inject(() => floorService) private floorServiceInstance: IfloorService
    ) {}

    public async createfloor(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("floorController: createfloor");
            const floorOrError = await this.floorServiceInstance.createfloor(req.body as IfloorDTO) as Result<IfloorDTO>;
            if (floorOrError.isFailure) {
                return res.status(402).send(floorOrError.errorValue());
            }
            const floorDTO = floorOrError.getValue();
            return res.json(floorDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async updatefloor(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("floorController: updatefloor");
            const floorOrError = await this.floorServiceInstance.updatefloor(req.body as IUpdateFloorDTO) as Result<IfloorDTO>;

            if (floorOrError.isFailure) {
                return res.status(402).send(floorOrError.errorValue());
            }

            const floorDTO = floorOrError.getValue();
            return res.json(floorDTO).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async updateMap(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("floorController: updateMapa");
            const floorOrError = await this.floorServiceInstance.updateMap(req.body.building as string, req.body.floor as number, req.body.passagem as Array<IOrientdimensDTO>, req.body.elevador as IOrientdimensDTO,req.body.token as string) as Result<IfloorDTO>;

            if (floorOrError.isFailure) {
                console.error(floorOrError.errorValue());
                return res.json(floorOrError.errorValue).status(402);
            }

            const floorDTO = floorOrError.getValue();
            return res.json(floorDTO).status(201);
        }
        catch (e) {
            return res.json(e).status(500);
        }
    }

    public async listfloors(req: Request, res: Response, next: NextFunction) {
      try {
        console.log("floorController: listfloors");
        const floorsOrError = await this.floorServiceInstance.listfloors(req.query.building as string,req.query.token as string) as Result<Array<IfloorDTO>>;
        if (floorsOrError.isFailure) {
          return res.status(402).send(floorsOrError.errorValue());
        }
        return res.status(201).json(floorsOrError);
      } catch (e) {
        return next(e);
      }
    }

    public async listAllFloors(req: Request, res: Response, next: NextFunction) {
        try{
            console.log("listing all floors");
            const floorsOrError = await this.floorServiceInstance.listAllFloors(req.query.token as unknown as string) as Result<Array<IfloorDTO>>;
            if (floorsOrError.isFailure){
                return res.status(402).send(floorsOrError.errorValue());
            }
            return res.status(201).json(floorsOrError);
        } catch (e) {
            return next(e);
        }
    }
    public async countfloors(req: Request, res: Response, next: NextFunction){
        try{
            const floorsOrError = await this.floorServiceInstance.countfloors() as Result<number>;

            if(floorsOrError.isFailure){
                return res.status(402).json(floorsOrError.errorValue());
            }

            const floorNumber = floorsOrError.getValue();

            return res.status(201).json({
                totalfloors: floorNumber
            });
        }catch(e){
            return next(e);
        }
    }

    // US 220 - Listar floors de um building com passagens para outros buildings (GET)

    public async listfloorsComPassagens (req: Request, res: Response, next: NextFunction) {
        try{
            console.log("floorController: listfloorsComPassagens");
            const floorsOrError = await this.floorServiceInstance.listfloorsComPassagens(req.query.building as unknown as string,req.query.token as string) as Result<Array<IfloorDTO>>;
            if(floorsOrError.isFailure){
                return res.status(402).send(floorsOrError.errorValue());
            }
            const floorsDTO = floorsOrError.getValue();
            return res.json(floorsDTO).status(201);
        }catch(e){
            return next(e);
        }
    }

}

