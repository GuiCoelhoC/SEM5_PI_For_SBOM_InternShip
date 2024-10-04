import 'reflect-metadata';

import 'mocha';
import * as sinon from 'sinon';
import Container, { Service } from 'typedi';
import config from '../config';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../src/core/logic/Result';
import IRobotDTO from '../src/dto/IRobotDTO';
import RobotController from '../src/controllers/robotController';
import IRobotService from '../src/services/IServices/IRobotService';
import { Robot } from '../src/domain/robot';
import { UniqueEntityID} from '../src/core/domain/UniqueEntityID';
import { RobotType } from '../src/domain/robotType';

/*
describe('Robot Controller', function () {
  const sandbox = sinon.createSandbox();

  beforeEach(function () {
    this.timeout(100000);
    Container.reset();

    let roboSchema = require('../src/persistence/schemas/robotSchema').default;
    Container.set('roboSchema', roboSchema);

    let robotTypeSchema = require('../src/persistence/schemas/robotTypeSchema').default;
    Container.set('robotTypeSchema', robotTypeSchema);

    let robotTypeRepoC = require('../src/repos/robotTypeRepo').default;
    let robotTypeRepo = Container.get(robotTypeRepoC);
    Container.set('RobotTypeRepo', robotTypeRepo);

    let roboRepoC = require('../src/repos/robotRepo').default;
    let roboRepo = Container.get(roboRepoC);
    Container.set('RobotRepo', roboRepo);

    let roboServiceC = require('../src/services/robotService').default;
    let roboService = Container.get(roboServiceC);
    Container.set('RobotService', roboService);


  });

  afterEach(function () {
    sandbox.restore();
  });

  it('roboController unit test usando robo service stub - create', async function () {
    // preparar

    let body = {
      code: "123",
      name: "robo1",
      numero_serie: "123",
      description: "robo 1",
      tipo: "tipo1",
    };
    let req: Partial<Request> = {}
    req.body = body;
    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {
    };

    let roboService = Container.get("RobotService");

    sinon.stub(roboService, "createRobo").returns(Result.ok<IRobotDTO>({
      id: "123dsd",
      code: "123",
      name: "robo1",
      numero_serie: "123",
      description: "robo 1",
      tipo: "tipo1",
      ativo: true,
    }));

    const ctrl = new RobotController(roboService as IRobotService);

    // executar

    await ctrl.createRobot(req as Request, res as Response, next as NextFunction);

    // avaliar

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
      id: "123dsd",
      code: "123",
      name: "robo1",
      numero_serie: "123",
      description: "robo 1",
      tipo: "tipo1",
      ativo: true,
    }));
  });

  it('roboController unit test usando robo service stub - inibir', async function () {
    // preparar

    let body = {
      code: "123",
    };
    let req: Partial<Request> = {};
    req.body = body;
    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {
    };

    let roboService = Container.get("RobotService");
    sinon.stub(roboService, "inibirRobo").returns(Result.ok<IRobotDTO>({
      id: "123dsd",
      code: "123",
      name: "robo1",
      numero_serie: "123",
      description: "robo 1",
      tipo: "tipo1",
      ativo: false,
    }));

    const ctrl = new RobotController(roboService as IRobotService);

    // executar
    await ctrl.inhibitRobot(req as Request, res as Response, next as NextFunction);

    // avaliar
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
      id: "123dsd",
      code: "123",
      name: "robo1",
      numero_serie: "123",
      description: "robo 1",
      tipo: "tipo1",
      ativo: false,
    }));
  });

  it('roboController unit test usando robo service stub - list', async function () {
    let body = {};
    let req: Partial<Request> = {};
    req.body = body;
    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {
    };

    let roboService = Container.get("RobotService");
    let listRobos = [] as IRobotDTO[];
    listRobos = [
      {
        id: "123dsd",
        code: "123",
        name: "robo1",
        numero_serie: "123",
        description: "robo 1",
        tipo: "tipo1",
        ativo: false,
      },
      {
        id: "123dsd",
        code: "123",
        name: "robo1",
        numero_serie: "123",
        description: "robo 1",
        tipo: "tipo1",
        ativo: false,
      },
    ];
    sinon.stub(roboService, "listAllRobos").returns(Result.ok<IRobotDTO[]>(listRobos));

    const ctrl = new RobotController(roboService as IRobotService);

    // executar
    await ctrl.listAllRobots(req as Request, res as Response, next as NextFunction);

    // avaliar
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(listRobos));


  });

  it('roboController + roboService itegration test usando stub de robotTypeRepo e RobotType', async function () {
    // preparar
    let body = {
        code: "123",
        name: "robo1",
        numero_serie: "123",
        description: "robo 1",
        tipo: "surveillance",
    };
    let req: Partial<Request> = {}
    req.body = body;

    let res: Partial<Response> = {
        json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {};

    let roboService = Container.get("RobotService");
    const robotTypeRepo = Container.get("RobotTypeRepo");
    const roboRepo = Container.get("RobotRepo");

    let robo = Robot.create({
        code: "123",
        name: "robo1",
        serial_number: "123",
        description: "robo 1",
        type: RobotType.create({
            id: "123",
            tipo: "surveillance",
            marca: "marca1",
            modelo: "modelo1",
        }, new UniqueEntityID("123")).getValue(),
    }, new UniqueEntityID("123"));

    sinon.stub(roboRepo, "save").returns(Promise.resolve(robo));

    sinon.stub(robotTypeRepo,"findByTipo").returns(Promise.resolve(RobotType.create({
        id: "123",
        tipo: "surveillance",
        marca: "marca1",
        modelo: "modelo1",
        }, new UniqueEntityID("123")).getValue()));

    const ctrl = new RobotController(roboService as IRobotService);

    // executar

    await ctrl.createRobot(req as Request, res as Response, next as NextFunction);

    // avaliar

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
        //devia dar para ter aqui o id : "123" mas res.json faz um id diferente
        code: "123",
        name: "robo1",
        numero_serie: "123",
        description: "robo 1",
        tipo: "surveillance",
    }));
});

it ('roboController + roboService itegration test spy no roboService', async function () {
    // preparar
    let body = {
        code: "123",
        name: "robo1",
        numero_serie: "123",
        description: "robo 1",
        tipo: "surveillance",
    };
    let req: Partial<Request> = {}
    req.body = body;
    let res: Partial<Response> = {
        json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {};

    let roboService = Container.get("RobotService");
    const robotTypeRepo = Container.get("RobotTypeRepo");
    const roboRepo = Container.get("RobotRepo");

    sinon.stub(roboRepo, "save").returns(new Promise((resolve, reject) => {
        resolve(Robot.create({
            code: "123",
            name: "robo1",
            serial_number: "123",
            description: "robo 1",
            type: RobotType.create({
                id: "123",
                tipo: "surveillance",
                marca: "marca1",
                modelo: "modelo1",
            }, new UniqueEntityID("123")).getValue(),
        }, new UniqueEntityID("123")).getValue());
    }));

    sinon.stub(robotTypeRepo,"findByTipo").returns(Promise.resolve(RobotType.create({
        id: "123",
        tipo: "surveillance",
        marca: "marca1",
        modelo: "modelo1",
        }, new UniqueEntityID("123")).getValue()));

    const spy = sinon.spy(roboService, "createRobo");

    const ctrl = new RobotController(roboService as IRobotService);

    let expected = {
        code: "123",
        name: "robo1",
        numero_serie: "123",
        description: "robo 1",
        tipo: "surveillance",
    } as IRobotDTO;

    // executar

    await ctrl.createRobot(req as Request, res as Response, next as NextFunction);

    // avaliar
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, sinon.match(expected));
});
});

 */
