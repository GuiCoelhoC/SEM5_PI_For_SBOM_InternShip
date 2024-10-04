import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IRobotController from "../../controllers/IControllers/IRobotController";

import config from "../../../config";

const route = Router();

export default (app: Router) => {

        app.use('/robot', route);

        const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

        route.post('',
            celebrate({
                body: Joi.object({
                  code: Joi.string().required(),
                  name: Joi.string().required(),
                  serial_number: Joi.string().required(),
                  description: Joi.string().required(),
                  type: Joi.string().required(),
                  token: Joi.string().required(),
                })
            }),
            (req, res, next) => ctrl.createRobot(req, res, next));

        route.patch('',
            celebrate({
                body: Joi.object({
                    code: Joi.string().required(),
                    token: Joi.string().required(),
                })
            }),
            (req, res, next) => ctrl.inhibitRobot(req, res, next));

        route.get('',
            celebrate({
                query: Joi.object({
                    token: Joi.string().required(),
                })
            }),

            (req, res, next) => ctrl.listAllRobots(req, res, next));

        route.get('/active',
            celebrate({
                query: Joi.object({
                    token: Joi.string().required(),
                })
            }),

              (req, res, next) => ctrl.listActiveRobots(req, res, next));

        route.get('/count',(req, res, next) => ctrl.countRobots(req, res, next));



}
