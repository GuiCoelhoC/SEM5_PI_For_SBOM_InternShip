import { Request, Response, NextFunction } from "express";
import { Inject , Service } from "typedi";
import config from "../../config";

import IRoomController from "./IControllers/IRoomController";
import IRoomService from "../services/IServices/IRoomService";
import IRoomDTO from "../dto/IRoomDTO";
import { Result } from "../core/logic/Result";
import RoomService from "../services/roomService";

@Service()
export default class RoomController implements IRoomController {
    constructor(
        @Inject(() => RoomService) private salaServiceInstance: IRoomService
    ) {}

    public async createRoom(req: Request, res: Response, next: NextFunction) {
        try{
            console.log("RoomController: createRoom");
            const salaOrError = await this.salaServiceInstance.createRoom(req.body as IRoomDTO) as Result<IRoomDTO>;
            console.log("RoomsController 2: createRoom")
            if (salaOrError.isFailure) {
                return res.json(salaOrError.error).status(402);
            }

            const salaDTO = salaOrError.getValue();
            return res.json(salaDTO).status(201);
        } catch (e) {
            console.log(e);
            return res.json(e).status(500);
        }
    }

    public async getRooms(req: Request, res: Response, next: NextFunction) {
        try{
            const salaOrError = await this.salaServiceInstance.getRooms() as Result<Array<IRoomDTO>>;
            if (salaOrError.isFailure) {
                return res.json(salaOrError.error).status(402);
            }

            const salaDTO = salaOrError.getValue();

            return res.json(salaDTO).status(201);
        } catch (e) {
            return res.json(e).status(500);
        }
    }

    public async contarRooms(req: Request, res: Response, next: NextFunction) {
        try{
            const salaOrError = await this.salaServiceInstance.contarRooms() as Result<Number>;
            if (salaOrError.isFailure) {
                return res.json(salaOrError.error).status(402);
            }

            const numeroRoom = salaOrError.getValue();

            return res.status(201).json({
                totalRooms : numeroRoom
            });
        } catch (e) {
            return res.json(e).status(500);
        }
    }
}
