import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IElevatorController from "../../controllers/IControllers/IElevatorController";

import config from "../../../config";
import ElevatorController from "../../controllers/elevatorController";

const route = Router();

export default (app: Router) => {

      app.use('/elevator', route);

      const ctrl = Container.get(ElevatorController);

      /* Create */
      route.post('',
          celebrate({
              body: Joi.object({
                  building: Joi.string().required(),
                  floors: Joi.array().required(),
                  brand: Joi.string().optional(),
                  model: Joi.string().optional(),
                  serialNumber: Joi.string().optional(),
                  description: Joi.string().optional(),
                  token: Joi.string().required()
              })
          }),
          (req, res, next) => ctrl.createElevator(req, res,next));

      /* List By Building */
      route.get('',
          celebrate({
              query: Joi.object({
                  building: Joi.string().required(),
                  token: Joi.string().required()
              })
          }),
          (req, res, next) => ctrl.listByBuilding(req, res, next));

      route.get('/all',
        celebrate({
            query: Joi.object({
                token: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.listAllElevators(req, res, next));


      /* Count */
      route.get('/count',(req, res, next) => ctrl.countElevators(req, res, next));

      /* Update */
      route.patch('',
          celebrate({
              body: Joi.object({
                code: Joi.string().required(),
                floors: Joi.array().optional(),
                brand: Joi.string().optional(),
                model: Joi.string().optional(),
                serialNumber: Joi.string().optional(),
                description: Joi.string().optional(),
                token: Joi.string().required()
              })
          }),
          (req, res, next) => ctrl.updateElevator(req, res,next));
}
