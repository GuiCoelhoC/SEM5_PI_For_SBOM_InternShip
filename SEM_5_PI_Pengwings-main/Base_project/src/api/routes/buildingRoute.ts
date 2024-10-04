import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IBuildingController from '../../controllers/IControllers/IBuildingController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {

    app.use('/building', route);

    const ctrl = Container.get(config.controllers.building.name) as IBuildingController;

    route.post('',
        celebrate({
            body: Joi.object({
                code: Joi.string().required(),
                name: Joi.string().required(),
                description: Joi.string(),
                widthMax: Joi.number().required(),
                lengthMax: Joi.number().required(),
                token: Joi.string().required()
            })
        }),
    (req, res, next) => ctrl.createBuilding(req, res, next));

    route.patch('',
        celebrate({
            body: Joi.object({
                code: Joi.string().required(),
                name: Joi.string(),
                description: Joi.string(),
                widthMax: Joi.number(),
                lengthMax: Joi.number(),
                token: Joi.string().required()
            })
        }),
    (req, res, next) => ctrl.updateBuilding(req, res, next));

    route.get('',
    celebrate({
        query: Joi.object({
          token: Joi.string().required()
        })
    }),
    (req, res, next) => ctrl.listBuildings(req, res, next));

    route.get('/minmax',
      celebrate({
        query: Joi.object({
          min: Joi.number().required(),
          max: Joi.number().required(),
          token: Joi.string().required()
        })
    }),
    (req, res, next) => ctrl.listMinMax(req, res, next));

    route.get('/contar',
    (req, res, next) => ctrl.contarBuildings(req, res, next));
}
