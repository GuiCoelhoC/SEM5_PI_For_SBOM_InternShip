import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IRobotTypeController from "../../controllers/IControllers/IRobotTypeController";

import config from "../../../config";

const route = Router();

export default (app: Router) => {

    app.use('/robotType', route);

    const ctrl = Container.get(config.controllers.robotType.name) as IRobotTypeController;

    route.post('',
        celebrate({
            body: Joi.object({
                type: Joi.string().required(),
                brand: Joi.string().required(),
                model: Joi.string().required(),
                tasks: Joi.array().required(),
              token: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.createRobotType(req, res, next));

    route.get('',
      celebrate({
        query: Joi.object({
          token: Joi.string().required()
        })
        }),
        (req, res, next) => ctrl.getRobotTypes(req, res, next));

    route.get('/count',
        (req, res, next) => ctrl.countRobotType(req, res, next));
}
