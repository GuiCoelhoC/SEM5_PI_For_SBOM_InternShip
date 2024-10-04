/*import {Request, Response, NextFunction} from "express";
import {Inject, Service} from "typedi";
import config from "../../config";

import IPassageController from "./IControllers/IPassageController";
import IPassageService from "../services/IServices/IPassageService";
import IPassageDTO from "../dto/IPassageDTO";
import { Result } from "../core/logic/Result";


@Service()
export class PassageController implements IPassageController {

  constructor(
    @Inject(config.services.passagem.name) private passagemServiceInstance : IPassageService
  ) {}

  public async createPassage(req: Request, res: Response, next: NextFunction) {
    try {
      const passagemOrError = await this.passagemServiceInstance.createPassage(req.body);

      if (passagemOrError.isFailure) {
        return res.status(402).send();
      }

      const passagemDTO = passagemOrError.getValue();
      return res.json(passagemDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  }
}*/
import {Request, Response, NextFunction} from "express";
import {Inject, Service} from "typedi";
import config from "../../config";

import IPassageController from "./IControllers/IPassageController";
import IPassageService from "../services/IServices/IPassageService";
import PassageService from "../services/passageService";
import IPassageDTO from "../dto/IPassageDTO";
import { Result } from "../core/logic/Result";

@Service()
export default class PassageController implements IPassageController {

  constructor(
    @Inject(() => PassageService) private passageServiceInstance : IPassageService
  ) {}

  public async createPassage(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("PassageController: createPassage");
      const passagemOrError = await this.passageServiceInstance.createPassage(req.body as IPassageDTO) as Result<IPassageDTO>;

      if (passagemOrError.isFailure) {
        return res.status(402).send(passagemOrError.errorValue());
      }

      const passagemDTO = passagemOrError.getValue();
      return res.json(passagemOrError).status(201);
    }
    catch (e) {
      return next(e);
    }
  }

  public async countPassages(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("PassageController: countPassages");
      const passageOrError = await this.passageServiceInstance.countPassages() as Result<number>;

      if (passageOrError.isFailure) {
        return res.status(402).send(passageOrError.errorValue());
      }

      const passagesDTO = passageOrError.getValue();
      return res.status(201).json({totalPassages: passagesDTO})
    }
    catch (e) {
      return next(e);
    }
  }

  public async updatePassage(req: Request, res: Response, next: NextFunction) {
    try{
        console.log("PassageController: updatePassage");

      const passageOrError = await this.passageServiceInstance.updatePassage(req.body as IPassageDTO) as Result<IPassageDTO>

      if (passageOrError.isFailure) {
        return res.status(402).send(passageOrError.errorValue());
      }

      const passageDTO = passageOrError.getValue();
      return res.json(passageDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  }

  public async listPassagesBetweenBuildings(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("PassageController: listPassagesBetweenBuildings");
      const passagesOrError = await this.passageServiceInstance.listPassagesBetweenBuildings
      (req.query.building1Id as unknown as string, req.query.building2Id as unknown as string,req.query.token as unknown as string) as Result<Array<IPassageDTO>>;

      if (passagesOrError.isFailure) {
        return res.status(402).send(passagesOrError.errorValue());
      }

      const passagesDTO = passagesOrError.getValue();
      return res.json(passagesOrError).status(201);
    }
    catch (e) {
      return next(e);
    }
  }

  public async listAllPassages(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("PassageController: listAllPassages");
      const passagesOrError = await this.passageServiceInstance.listAllPassages(req.query.token as unknown as string) as Result<Array<IPassageDTO>>;

      if (passagesOrError.isFailure) {
        return res.status(402).send(passagesOrError.errorValue());
      }

      return res.json(passagesOrError).status(201);
    }
    catch (e) {
      return next(e);
    }
  }
}
