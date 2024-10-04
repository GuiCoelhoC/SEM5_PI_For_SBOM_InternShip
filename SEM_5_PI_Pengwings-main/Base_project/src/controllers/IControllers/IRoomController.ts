import { Request, Response, NextFunction } from "express";

export default interface IRoomController  {
    createRoom(req: Request, res: Response, next: NextFunction): Promise<Response>;
    getRooms(req: Request, res: Response, next: NextFunction): Promise<Response>;
    contarRooms(req: Request, res: Response, next: NextFunction): Promise<Response>;
}
