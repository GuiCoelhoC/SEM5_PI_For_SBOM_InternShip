import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPassageController from "../../controllers/IControllers/IPassageController";

import config from "../../../config";

const route = Router();

export default (app: Router) => {

        app.use('/passages', route);

        const ctrl = Container.get("PassageController") as IPassageController;

        route.post('',
            celebrate({
                body: Joi.object({
                    code: Joi.string().required(),
                    floor1Id: Joi.number().required(),
                    floor2Id: Joi.number().required(),
                    building1Id: Joi.string().required(),
                    building2Id: Joi.string().required(),
                  token: Joi.string().required()
                })
            }),
            (req, res, next) =>{ console.log("Creating Passage"); ctrl.createPassage(req, res, next)});

        route.patch('',
            celebrate({
                body: Joi.object({
                    code: Joi.string().required(),
                    floor1Id: Joi.number().required(),
                    floor2Id: Joi.number().required(),
                    building1Id: Joi.string().required(),
                    building2Id: Joi.string().required(),
                    token: Joi.string().required()
                })
            }),
            (req, res, next) => {console.log("Updating Passage"); ctrl.updatePassage(req, res, next)});

        route.get('/count',(req, res, next) => ctrl.countPassages(req, res, next));


        route.get('',
            celebrate({
                query: Joi.object({
                    building1Id: Joi.string().required(),
                    building2Id: Joi.string().required(),
                    token: Joi.string().required()
                })
            }),
            (req, res, next) => ctrl.listPassagesBetweenBuildings(req, res, next));

        route.get('/all',celebrate({
            query: Joi.object({
                token: Joi.string().required()
            })
        }), (req, res, next) => ctrl.listAllPassages(req, res, next));
}


