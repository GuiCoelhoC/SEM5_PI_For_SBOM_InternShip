import 'reflect-metadata';

import 'mocha';
import * as sinon from 'sinon';
import Container, { Service } from 'typedi';
import config from '../config';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../src/core/logic/Result';
import IfloorDTO from '../src/dto/IfloorDTO';
import floorController from '../src/controllers/floorController';
import IfloorService from '../src/services/IServices/IfloorService';
import { Floor } from '../src/domain/floor';
import { UniqueEntityID } from '../src/core/domain/UniqueEntityID';
import IBuildingDTO from '../src/dto/IBuildingDTO';
import { Building } from '../src/domain/building';

describe('floor Controller', function () {
  const sandbox = sinon.createSandbox();

  beforeEach(function () {
    this.timeout(100000);
    Container.reset();

    let floorSchema = require('../src/persistence/schemas/floorSchema').default;
    Container.set('floorSchema', floorSchema);

    let buildingSchema = require('../src/persistence/schemas/buildingSchema').default;
    Container.set('buildingSchema', buildingSchema);

    let salaSchema = require('../src/persistence/schemas/salaSchema').default;
    Container.set('salaSchema', salaSchema);

    let passagemSchema = require('../src/persistence/schemas/passageSchema').default;
    Container.set('passagemSchema', passagemSchema);

    let elevatorSchema = require('../src/persistence/schemas/elevatorSchema').default;
    Container.set('elevatorSchema', elevatorSchema);

    let buildingRepoC = require('../src/repos/buildingRepo').default;
    let buildingRepo = Container.get(buildingRepoC);
    Container.set('BuildingRepo', buildingRepo);

    let floorRepoC = require('../src/repos/floorRepo').default;
    let floorRepo = Container.get(floorRepoC);
    Container.set('floorRepo', floorRepo);

    let salaRepoC = require('../src/repos/salaRepo').default;
    let salaRepo = Container.get(salaRepoC);
    Container.set('RoomRepo', salaRepo);

    let passagemRepoC = require('../src/repos/passagemRepo').default;
    let passagemRepo = Container.get(passagemRepoC);
    Container.set('PassagemRepo', passagemRepo);

    let elevatorRepoC = require('../src/repos/elevatorRepo').default;
    let elevatorRepo = Container.get(elevatorRepoC);
    Container.set('ElevatorRepo', elevatorRepo);

    let passagemServiceC = require('../src/services/passagemService').default;
    let passagemService = Container.get(passagemServiceC);
    Container.set('PassagemService', passagemService);

    let floorServiceC = require('../src/services/floorService').default;
    let floorService = Container.get(floorServiceC);
    Container.set('floorService', floorService);

    let salaServiceC = require('../src/services/salaService').default;
    let salaService = Container.get(salaServiceC);
    Container.set('RoomService', salaService);

    let elevatorServiceC = require('../src/services/elevatorService').default;
    let elevatorService = Container.get(elevatorServiceC);
    Container.set('ElevatorService', elevatorService);


  });

  afterEach(function () {
    sandbox.restore();
  });

  it('floorController unit test usando floor service stub - create', async function () {
    // preparar

    let body = {
      numero: 1,
      description: "floor 1",
      width: 10,
      length: 10,
      building: "building1"
    };
    let req: Partial<Request> = {}
    req.body = body;
    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {
    };

    let floorService = Container.get("floorService");

    sinon.stub(floorService, "createfloor").returns(Result.ok<IfloorDTO>({
      id: "123dsd",
      numero: 1,
      description: "floor 1",
      width: 10,
      length: 10,
      mapa: [],
      passagens: [],
      building: "building1"
    }));

    const ctrl = new floorController(floorService as IfloorService);

    // executar

    await ctrl.createfloor(req as Request, res as Response, next as NextFunction);

    // avaliar

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
      id: "123dsd",
      numero: 1,
      description: "floor 1",
      width: 10,
      length: 10,
      mapa: [],
      passagens: [],
      building: "building1"
    }));
  });
  it('floorController unit test usando floor service stub - update', async function () {
    // preparar

    let body = {
      oldNumero: 1,
      numero: 3,
      description: "floor 3",
      building: "building1"
    };
    let req: Partial<Request> = {};
    req.body = body;
    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {
    };

    let floorService = Container.get("floorService");
    sinon.stub(floorService, "updatefloor").returns(Result.ok<IfloorDTO>({
      id: "123dsd",
      numero: 3,
      description: "floor 3",
      width: 10,
      length: 10,
      mapa: [],
      passagens: [],
      building: "building1"
    }));

    const ctrl = new floorController(floorService as IfloorService);

    // executar
    await ctrl.updatefloor(req as Request, res as Response, next as NextFunction);

    // avaliar
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
      id: "123dsd",
      numero: 3,
      description: "floor 3",
      width: 10,
      length: 10,
      mapa: [],
      passagens: [],
      building: "building1"
    }));
  });

  it('floorController unit test usando floor service stub - listfloors', async function () {
    // preparar

    let body = {
      building: "building1"
    };
    let req: Partial<Request> = {};
    req.query = body;
    let res: Partial<Response> = {
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {
    };
    let i;
    let floorlist = [] as IfloorDTO[];

    for (i = 1; i < 4; i++) {
      floorlist.push({
        id: "123dsd" + i,
        numero: i,
        description: "floor " + i,
        width: 10,
        length: 10,
        mapa: [],
        passagens: [],
        building: "building1"
      });
    }

    let floorService = Container.get("floorService");
    sinon.stub(floorService, "listfloors").returns(Result.ok<IfloorDTO[]>(floorlist));
    const ctrl = new floorController(floorService as IfloorService);

    // executar
    await ctrl.listfloors(req as Request, res as Response, next as NextFunction);

    // avaliar
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(floorlist));
  });

  it('floorController unit test usando floor service stub - listbuildingMinMax', async function () {
    // preparar

    let req: Partial<Request> = {};
    let body = {
      "min": "10",
      "max": "20",
    };

    req.query = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {
    };
    let i;
    let buildingList = [] as IBuildingDTO[];

    for (i = 1; i < 4; i++) {
      buildingList.push({
        id: "123dsd" + i,
        code: "123" + i,
        name: "building" + i,
        description: "building " + i,
        widthMax: 10,
        lengthMax: 10,
      });
    }

    let floorService = Container.get("floorService");
    sinon.stub(floorService, "listMinMax").returns(Result.ok<IBuildingDTO[]>(buildingList));
    const ctrl = new floorController(floorService as IfloorService);

    // executar
    await ctrl.listMinMax(req as Request, res as Response, next as NextFunction);

    // avaliar
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(buildingList));

  });

  it('floorController unit test usando floor service stub - listfloorsComPassagens', async function () {
    // preparar
    let body = {
      building: "building1"
    };
    let req: Partial<Request> = {query: body};
    req.query = body;
    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {
    };

    let floorService = Container.get("floorService");

    sinon.stub(floorService, "listfloorsComPassagens").returns(Result.ok<IfloorDTO[]>([{
      id: "123dsd",
      numero: 1,
      description: "floor 1",
      width: 10,
      length: 10,
      mapa: [],
      passagens: [],
      building: "building1"
    }]));

    const ctrl = new floorController(floorService as IfloorService);

    await ctrl.listfloorsComPassagens(req as Request, res as Response, next as NextFunction);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match([{
      id: "123dsd",
      numero: 1,
      description: "floor 1",
      width: 10,
      length: 10,
      mapa: [],
      passagens: [],
      building: "building1"
    }]));

    });

    it('floorController + floorService integration test with stub floorRepo and floor', async function () {
        // preparar

        let body = {
            numero: 1,
            description: "floor 1",
            width: 5,
            length: 5,
            building: "building1"
        };
        let req: Partial<Request> = {}
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let floorService = Container.get("floorService");
        const floorRepo = Container.get("floorRepo");

        const buildingRepo = Container.get("BuildingRepo");

        let floor = floor.create({
            number: 1,
            description: "floor 1",
            width: 5,
            length: 5,
            building: Building.create({
                id: "123",
                code: "123",
                name: "building1",
                description: "building 1",
                widthMax: 10,
                lengthMax: 10,
            }, new UniqueEntityID("123")).getValue(),
            map: [],
            passagens: [],
        }, new UniqueEntityID("123"));

        sinon.stub(floorRepo, "save").returns(Promise.resolve(floor));

        sinon.stub(buildingRepo, "findByCode").returns(Promise.resolve(Building.create({
            id: "123",
            code: "123",
            name: "building1",
            description: "building 1",
            widthMax: 10,
            lengthMax: 10,
        }, new UniqueEntityID("123")).getValue()));

        sinon.stub(floorRepo, "findAllByNumber").returns(Promise.resolve(null));

        const ctrl = new floorController(floorService as IfloorService);

        // executar

        await ctrl.createfloor(req as Request, res as Response, next as NextFunction);

        // avaliar

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            //devia dar para ter aqui o id : "123" mas res.json faz um id diferente
            numero: 1,
            description: "floor 1",
            width: 5,
            length: 5,
            building: "123"
        }));
    });


    it ('floorController + floorService integration test spy floorService', async function () {
        // preparar

        let body = {
            numero: 1,
            description: "floor 1",
            width: 5,
            length: 5,
            building: "building1"
        };
        let req: Partial<Request> = {}
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
       };
        let next: Partial<NextFunction> = () => { };

        let floorService = Container.get("floorService");
        const floorRepo = Container.get("floorRepo");
        const buildingRepo = Container.get("BuildingRepo");

        let floor = floor.create({
            number: 1,
            description: "floor 1",
            width: 5,
            length: 5,
            building: Building.create({
                id: "123",
                code: "123",
                name: "building1",
                description: "building 1",
                widthMax: 10,
                lengthMax: 10,
            }, new UniqueEntityID("123")).getValue(),
            map: [],
            passagens: [],
            }, new UniqueEntityID("123"));

        sinon.stub(floorRepo, "save").returns(Promise.resolve(floor));

        sinon.stub(buildingRepo, "findByCode").returns(Promise.resolve(Building.create({
            id: "123",
            code: "123",
            name: "building1",
            description: "building 1",
                widthMax: 10,
                lengthMax: 10,
            }, new UniqueEntityID("123")).getValue()));

        sinon.stub(floorRepo, "findAllByNumber").returns(Promise.resolve(null));

        const spy = sinon.spy(floorService, "createfloor");

        const ctrl = new floorController(floorService as IfloorService);

        let expected = {
            numero: 1,
            description: "floor 1",
            width: 5,
            length: 5,
            building: "building1"
        };

        // executar

        await ctrl.createfloor(req as Request, res as Response, next as NextFunction);

        // avaliar
        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, sinon.match(expected));
    });
});
