import { Request, Response, NextFunction } from "express";

export default interface IRobotController {
  createRobot(req: Request, res: Response, next: NextFunction);
  listAllRobots(req: Request, res: Response, next: NextFunction);
  listActiveRobots(req: Request, res: Response, next: NextFunction);
  inhibitRobot(req: Request, res: Response, next: NextFunction);
  countRobots(req: Request, res: Response, next: NextFunction);
}
