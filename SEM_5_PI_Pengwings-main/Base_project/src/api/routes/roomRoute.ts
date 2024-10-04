import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IRoomController from "../../controllers/IControllers/IRoomController";

import config from "../../../config";

const route = Router();

export default (app: Router) => {

    app.use('/rooms', route);

    const ctrl = Container.get(config.controllers.room.name) as IRoomController;

    route.post('',
        celebrate({
            body: Joi.object({
                floor: Joi.number().required(),
                building: Joi.string().required(),
                name: Joi.string().required(),
                description: Joi.string().required(),
                roomtype: Joi.string().required(),
                token: Joi.string().required(),
                /*
                dimensions: Joi.array().items(
                    Joi.number().required(),
                    Joi.number().required(),
                    Joi.number().required(),
                    Joi.number().required()
                ).required(),
                door: Joi.array().items(
                    Joi.number().required(),
                    Joi.number().required()
                ).required()
                */
            })
        }),
        (req, res, next) => ctrl.createRoom(req, res, next));

    route.get('', (req, res, next) => ctrl.getRooms(req, res, next));

    route.get('/contar', (req, res, next) => ctrl.contarRooms(req, res, next));
}
