import 'reflect-metadata';

import 'mocha';
import * as sinon from 'sinon';
import Container, { Service } from 'typedi';
import config from '../config';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../src/core/logic/Result';
import IElevatorDTO from '../src/dto/IElevatorDTO';
import ElevatorController from '../src/controllers/elevatorController';
import IElevatorService from '../src/services/IServices/IElevatorService';

describe('Elevator Controller', function () {
  const sandbox = sinon.createSandbox();

  beforeEach(function () {
    this.timeout(100000);
    Container.reset();

// schema
    let elevatorSchema = require('../src/persistence/schemas/elevatorSchema').default;
    Container.set('elevatorSchema', elevatorSchema);

    let buildingSchema = require('../src/persistence/schemas/buildingSchema').default;
    Container.set('buildingSchema', buildingSchema);

    let floorSchema = require('../src/persistence/schemas/floorSchema').default;
    Container.set('floorSchema', floorSchema);

    let salaSchema = require('../src/persistence/schemas/salaSchema').default;
    Container.set('salaSchema', salaSchema);

    let passagemSchema = require('../src/persistence/schemas/passageSchema').default;
    Container.set('passagemSchema', passagemSchema);

// repositories
    let elevatorRepoC = require('../src/repos/elevatorRepo').default;
    let elevatorRepo = Container.get(elevatorRepoC);
    Container.set('ElevatorRepo', elevatorRepo);

    let floorRepoC = require('../src/repos/floorRepo').default;
    let floorRepo = Container.get(floorRepoC);
    Container.set('floorRepo', floorRepo);

    let buildingRepoC = require('../src/repos/buildingRepo').default;
    let buildingRepo = Container.get(buildingRepoC);
    Container.set('BuildingRepo', buildingRepo);

    let salaRepoC = require('../src/repos/salaRepo').default;
    let salaRepo = Container.get(salaRepoC);
    Container.set('RoomRepo', salaRepo);

    let passagemRepoC = require('../src/repos/passagemRepo').default;
    let passagemRepo = Container.get(passagemRepoC);
    Container.set('PassagemRepo', passagemRepo);

// services

    let elevatorServiceC = require('../src/services/elevatorService').default;
    let elevatorService = Container.get(elevatorServiceC);
    Container.set('ElevatorService', elevatorService);

    let buildingServiceC = require('../src/services/buildingService').default;
    let buildingService = Container.get(buildingServiceC);
    Container.set('BuildingService', buildingService);

    let floorServiceC = require('../src/services/floorService').default;
    let floorService = Container.get(floorServiceC);
    Container.set('floorService', floorService);

    let salaServiceC = require('../src/services/salaService').default;
    let salaService = Container.get(salaServiceC);
    Container.set('RoomService', salaService);

    let passagemServiceC = require('../src/services/passagemService').default;
    let passagemService = Container.get(passagemServiceC);
    Container.set('PassagemService', passagemService);


  });

  afterEach(function () {
    sandbox.restore();
  });

  it('elevatorController unit test using elevator service stub - create', async function () {
    // preparar

    let body = {
      "building": "A2344",
      "floors": [1,2],
      "brand": "Kone",
      "model": "Monospace DX",
      "serialNumber": "12345ABC",
      "description": "Elevador 1"
    };
    let req: Partial<Request> = {}
    req.body = body;
    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {};

    let elevatorService = Container.get("ElevatorService");

    sinon.stub(elevatorService, "createElevator").returns(Result.ok<IElevatorDTO>({
      id: "123dsd",
      code: "A2344-E1",
      building: "A2344",
      floors: [1,2],
      brand: "Kone",
      model: "Monospace DX",
      serialNumber: "12345ABC",
      description: "Elevador 1",
    }));

    const ctrl = new ElevatorController(elevatorService as IElevatorService);

    // executar

    await ctrl.createElevator(req as Request, res as Response, next as NextFunction);

    // avaliar

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json as sinon.SinonSpy, sinon.match({
      code: "A2344-E1",
      building: "A2344",
      floors: [1,2],
      brand: "Kone",
      model: "Monospace DX",
      serialNumber: "12345ABC",
      description: "Elevador 1",
    }));
  });

  it('elevatorController unit test using elevator service stub - update', async function () {
    // preparar

    let body = {
      code: "A2344-E1",
      floors: [1, 2],
      brand: "Kone",
      model: "Monospace DX",
      serialNumber: "12345ABC",
      description: "Elevador 1"
    };
    let req: Partial<Request> = {};
    req.body = body;
    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {
    };

    let elevatorService = Container.get("ElevatorService");
    sinon.stub(elevatorService, "updateElevator").returns(Result.ok<IElevatorDTO>({
      id: "123dsd",
      code: "A2344-E1",
      building: "A2344",
      floors: [2],
      brand: "Kone",
      model: "Monospace DX",
      serialNumber: "125ABC",
      description: "Elevador 1"
    }));

    const ctrl = new ElevatorController(elevatorService as IElevatorService);

    // executar
    await ctrl.updateElevator(req as Request, res as Response, next as NextFunction);

    // avaliar
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json as sinon.SinonSpy, sinon.match({
      code: "A2344-E1",
      floors: [2],
      brand: "Kone",
      model: "Monospace DX",
      serialNumber: "125ABC",
      description: "Elevador 1"
    }));
  });

    it('elevatorController unit test using elevator service stub - listByBuilding', async function () {
      //preparar
      let query = {
        building: "A2344"
      };
      let req: Partial<Request> = {};
      req.query = query;
      let res: Partial<Response> = {
        json: sinon.spy()
      };
      let next: Partial<NextFunction> = () => {};

      let elevatorService = Container.get("ElevatorService");
      let elevatorsList = [] as IElevatorDTO[];
      elevatorsList = [{
        id: "123dsd",
        code: "A2344-E1",
        building: "A2344",
        floors: [2],
        brand: "Kone",
        model: "Monospace DX",
        serialNumber: "125ABC",
        description: "Elevador 1"
      },
        {
          id: "123dse",
          code: "A2344-E2",
          building: "A2344",
          floors: [1,2],
          brand: "Kone",
          model: "Monospace DX",
          serialNumber: "125ABC",
          description: "Elevador 1"
        }];
      sinon.stub(elevatorService, "listByBuilding").returns(Result.ok<IElevatorDTO[]>(elevatorsList));

      const ctrl = new ElevatorController(elevatorService as IElevatorService);

      // executar
      await ctrl.listByBuilding(req as Request, res as Response, next as NextFunction);

      // avaliar

      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json as sinon.SinonSpy, sinon.match(elevatorsList));
    });
});
