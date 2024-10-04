import 'reflect-metadata';

import 'mocha';
import * as sinon from 'sinon';
import Container, { Service } from 'typedi';
import config from '../config';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../src/core/logic/Result';
import IRobotTypeDTO from '../src/dto/IRobotTypeDTO';
import RobotTypeController from '../src/controllers/robotTypeController';
import IRobotTypeService from '../src/services/IServices/IRobotTypeService';
import { RobotType } from '../src/domain/robotType';
import { UniqueEntityID} from '../src/core/domain/UniqueEntityID';
/*
describe('Tipo Robot Controller', function () {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
        this.timeout(100000);
        Container.reset();

        let robotTypeschema = require('../src/persistence/schemas/robotTypeSchema').default;
        Container.set('floorSchema', robotTypeschema);

        let robotTypeRepoC = require('../src/repos/robotTypeRepo').default;
        let robotTypeRepo = Container.get(robotTypeRepoC);
        Container.set('RobotTypeRepo', robotTypeRepo);

        let robotTypeServiceC = require('../src/services/robotTypeService').default;
        let robotTypeService = Container.get(robotTypeServiceC);
        Container.set('RobotTypeService', robotTypeService);

    });

    afterEach(function () {
        sandbox.restore();
    });

it('robotTypeController unit test usando floor service stub - create', async function () {
    // preparar

    let body = {
        tipo: "surveillance",
        marca: "marca1",
        modelo: "modelo1",
    };
    let req: Partial<Request> = {}
    req.body = body;
    let res: Partial<Response> = {
        json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {};

    let robotTypeService = Container.get("RobotTypeService");

    sinon.stub(robotTypeService, "createrobotType").returns(Result.ok<IRobotTypeDTO>({
        id: "123dsd",
        tipo: "surveillance",
        marca: "marca1",
        modelo: "modelo1",
    }));

    const ctrl = new RobotTypeController(robotTypeService as IRobotTypeService);

    // executar

    await ctrl.createRobotType(req as Request, res as Response, next as NextFunction);

    // avaliar

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json as sinon.SinonSpy, sinon.match({
        id: "123dsd",
        tipo: "surveillance",
        marca: "marca1",
        modelo: "modelo1",
    }));
});

it('robotTypeController + robotTypeService itegration test usando stub de robotTypeRepo e RobotType', async function () {
    // preparar
    let body = {
        tipo: "surveillance",
        marca: "marca1",
        modelo: "modelo1",
    };
    let req: Partial<Request> = {}
    req.body = body;

    let res: Partial<Response> = {
        json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {};

    const robo = sinon.stub(RobotType, "create").returns(Result.ok({
        id: "123dsd",
        tipo: "surveillance",
        marca: "marca1",
        modelo: "modelo1",
    }));

    let robotTypeRepo = Container.get("RobotTypeRepo");
    sinon.stub(robotTypeRepo, "save").returns(new Promise((resolve, reject) => {
        resolve(RobotType.create({
            id: "123dsd",
            tipo: "surveillance",
            marca: "marca1",
            modelo: "modelo1",
        }).getValue());
    }));

    let robotTypeService = Container.get("RobotTypeService");

    const ctrl = new RobotTypeController(robotTypeService as IRobotTypeService);

    // executar

    await ctrl.createRobotType(req as Request, res as Response, next as NextFunction);

    // avaliar
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json as sinon.SinonSpy, sinon.match({
        id: "123dsd",
        tipo: "surveillance",
        marca: "marca1",
        modelo: "modelo1",
    }));
});

it ('robotTypeController + robotTypeService itegration test usando spy no robotTypeService', async function () {
    // preparar
    let body = {
        tipo: "surveillance",
        marca: "marca1",
        modelo: "modelo1",
    };
    let req: Partial<Request> = {}
    req.body = body;

    let res: Partial<Response> = {
        json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {};

    let robotTypeRepo = Container.get("RobotTypeRepo");
    sinon.stub(robotTypeRepo, "save").returns(new Promise((resolve, reject) => {
        resolve(RobotType.create({
            id: "123dsd",
            tipo: "surveillance",
            marca: "marca1",
            modelo: "modelo1",
        }).getValue());
    }));

    let robotTypeService = Container.get("RobotTypeService");
    const spy = sinon.spy(robotTypeService, "createrobotType");

    const ctrl = new RobotTypeController(robotTypeService as IRobotTypeService);

    let expected = {
        id: "123dsd",
        tipo: "surveillance",
        marca: "marca1",
        modelo: "modelo1",
    } as IRobotTypeDTO;

    // executar

    await ctrl.createRobotType(req as Request, res as Response, next as NextFunction);

    // avaliar
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, sinon.match({
        tipo: "surveillance",
        marca: "marca1",
        modelo: "modelo1",
    }));
});

});
*/
