import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IfloorController from "../../controllers/IControllers/IFloorController";

import config from "../../../config";

const route = Router();

export default (app: Router) => {

    app.use('/floor', route);

    const ctrl = Container.get(config.controllers.floor.name) as IfloorController;

    route.post('',
        celebrate({
            body: Joi.object({
                floorNumber: Joi.number().required(),
                description: Joi.string().required(),
                length: Joi.number().required(),
                width: Joi.number().required(),
                building: Joi.string().required(),
                token: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.createfloor(req, res, next));


    route.patch('',
        celebrate({
            body: Joi.object({
                oldFloorNumber: Joi.number().required(),
                floorNumber: Joi.number(),
                description: Joi.string(),
                building: Joi.string().required(),
                token: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.updatefloor(req, res, next));

    route.get('',
        celebrate({
            query: Joi.object({
                building: Joi.string().required(),
                token: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.listfloors(req, res, next));

    route.get('/count', (req, res, next) => ctrl.countfloors(req, res, next));

    route.get('/all-with-passage',
        celebrate({
            query: Joi.object({
                building: Joi.string().required(),
                token: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.listfloorsComPassagens(req, res, next));

    route.get('/all',
      celebrate({
        query: Joi.object({
          token: Joi.string().required()
        })
      }),
      (req, res, next) => ctrl.listAllFloors(req, res, next));

    route.patch('/map',
        celebrate({
            body: Joi.object({
                building: Joi.string().required(),
                floor: Joi.number().required(),
                /*room: Joi.array().items(
                    Joi.object({
                        id: Joi.string().required(),
                        x1: Joi.number().required(),
                        y1: Joi.number().required(),
                        x2: Joi.number().required(),
                        y2: Joi.number().required(),
                        doorx: Joi.number().required(),
                        doory: Joi.number().required(),
                    })
                ),*/
                passagem: Joi.array().items(
                    Joi.object({
                        id: Joi.string().required(),
                        x: Joi.number().required(),
                        y: Joi.number().required(),
                        orientacao: Joi.string().required()
                    })
                ),
                elevador: Joi.object({
                    id: Joi.string().required(),
                    x: Joi.number().required(),
                    y: Joi.number().required(),
                    orientacao: Joi.string().required()
                }),
                token: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.updateMap(req, res, next));

    /* Json example for /mapa:
        {
"building": "building1",
"floor": 1,
"passagem": [
{
  "id": "passagem1",
  "x": 0,
  "y": 5,
  "orientacao": "norte"
},
{
  "id": "passagem2",
  "x": 6,
  "y": 3,
  "orientacao": "oeste"
}
],
"elevador": {
"id": "elevador1",
"x": 3,
"y": 5,
"orientacao": "oeste"
}
}

    */


    // US 220 - Listar floors de um edifício com passagem para outros buildings

    route.get('/listfloorscompassagens',
        celebrate({
            query: Joi.object({
                building1: Joi.string().required(),
                token: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.listfloorsComPassagens(req, res, next));

}


