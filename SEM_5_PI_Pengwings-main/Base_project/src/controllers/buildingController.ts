import { Request, Response, NextFunction } from "express";
import { Inject , Service } from "typedi";
import config from "../../config";

import IBuildingController from "./IControllers/IBuildingController";
import IBuildingService from "../services/IServices/IBuildingService";
import IBuildingDTO from "../dto/IBuildingDTO";
import { Result } from "../core/logic/Result";

@Service()
export default class BuildingController implements IBuildingController {
    constructor(
        @Inject(config.services.building.name) private buildingServiceInstance: IBuildingService
    ) {}

    public async createBuilding(req: Request, res: Response, next: NextFunction) {
        console.log("buildingcontroller - createBuilding");
        try{
            const buildingOrError = await this.buildingServiceInstance.createBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;

            if (buildingOrError.isFailure) {
                return res.status(402).send(buildingOrError.errorValue());
            }

            const buildingDTO = buildingOrError.getValue();
            console.log(buildingDTO);
            return res.json(buildingDTO).status(201);
        } catch(e) {
            next(e);
        }
    };

    public async updateBuilding(req: Request, res: Response, next: NextFunction) {
        console.log("Updating building...");
        try{
            const buildingOrError = await this.buildingServiceInstance.updateBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;
            if (buildingOrError.isFailure) {
                return res.status(402).send(buildingOrError.errorValue());
            }
            const buildingDTO = buildingOrError.getValue();
            return res.json(buildingDTO).status(201);
        } catch(e) {
            next(e);
        }
    }

    public async listBuildings(req: Request, res: Response, next: NextFunction) {
        console.log("Listing buildings...");
        try{
            const buildingOrError = await this.buildingServiceInstance.listBuildings(req.query.token as unknown as string) as Result<Array<IBuildingDTO>>;
            if (buildingOrError.isFailure) {
              return res.status(402).send(buildingOrError.errorValue());
            }
            return res.json(buildingOrError.getValue()).status(201);
        } catch(e) {
            next(e);
        }
    }

  public async listMinMax(req : Request,res: Response, next : NextFunction){
    try{
      console.log("floorController: listMinMax");
      const floorsOrError = await this.buildingServiceInstance.listMinMax(req.query.min as unknown as number, req.query.max as unknown as number,req.query.token as unknown as string) as Result<Array<IBuildingDTO>>;
      if(floorsOrError.isFailure){
        return res.status(402).send(floorsOrError.errorValue());
      }
      const floorsDTO = floorsOrError.getValue();
      return res.json(floorsDTO).status(201);
    }catch(e){
      return next(e);
    }
  }

    public async contarBuildings(req: Request, res: Response, next: NextFunction) {
        try{
            const buildingOrError = await this.buildingServiceInstance.contarBuildings() as Result<number>;
            if (buildingOrError.isFailure) {
                return res.status(402).send(buildingOrError.errorValue());
            }
            const numeroBuildings = buildingOrError.getValue();
            return res.status(201).json({
                totalBuildings : numeroBuildings
            });

        } catch(e) {
            next(e);
        }
    }
}
