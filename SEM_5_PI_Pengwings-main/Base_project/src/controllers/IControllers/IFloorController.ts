import { Request, Response, NextFunction } from "express";

export default interface IfloorController {
  createfloor(req: Request, res: Response, next: NextFunction);
  updatefloor(req: Request, res: Response, next: NextFunction);
  updateMap(req: Request, res: Response, next: NextFunction);
  listfloors(req: Request, res: Response, next: NextFunction);
  listAllFloors(req: Request, res: Response, next: NextFunction);
  listfloorsComPassagens(req: Request, res: Response, next: NextFunction);
  countfloors(req: Request, res: Response, next: NextFunction);
}
