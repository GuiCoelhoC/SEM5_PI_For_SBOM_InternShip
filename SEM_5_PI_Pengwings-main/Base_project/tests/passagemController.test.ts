import 'reflect-metadata';

import 'mocha';
import * as sinon from 'sinon';
import Container, { Service } from 'typedi';
import config from '../config';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../src/core/logic/Result';
import IPassageDTO from '../src/dto/IPassageDTO';
import PassageController from '../src/controllers/passageController';
import IPassageService from '../src/services/IServices/IPassageService';
import { Passage } from '../src/domain/passage';
import { UniqueEntityID} from '../src/core/domain/UniqueEntityID';



describe('Passagem Controller', function () {
  const sandbox = sinon.createSandbox();

  beforeEach(function () {
    this.timeout(100000);

    let passagemSchema = require('../src/persistence/schemas/passageSchema').default;
    Container.set('passagemSchema', passagemSchema);

    let floorSchema = require('../src/persistence/schemas/floorSchema').default;
    Container.set('floorSchema', floorSchema);

    let buildingSchema = require('../src/persistence/schemas/buildingSchema').default;
    Container.set('buildingSchema', buildingSchema);

    let elevatorSchema = require('../src/persistence/schemas/elevatorSchema').default;
    Container.set('elevatorSchema', elevatorSchema);

    let salaSchema = require('../src/persistence/schemas/salaSchema').default;
    Container.set('salaSchema', salaSchema);

    let passagemRepoC = require('../src/repos/passageRepo').default;
    let passagemRepo = Container.get(passagemRepoC);
    Container.set('PassagemRepo', passagemRepo);

    let passagemServiceC = require('../src/services/passageService').default;
    let passagemService = Container.get(passagemServiceC);
    Container.set('PassagemService', passagemService);



    let buildingRepoC = require('../src/repos/buildingRepo').default;
    let buildingRepo = Container.get(buildingRepoC);
    Container.set('BuildingRepo', buildingRepo);

    let floorRepoC = require('../src/repos/floorRepo').default;
    let floorRepo = Container.get(floorRepoC);
    Container.set('floorRepo', floorRepo);

    let salaRepoC = require('../src/repos/salaRepo').default;
    let salaRepo = Container.get(salaRepoC);
    Container.set('RoomRepo', salaRepo);


    let elevatorRepoC = require('../src/repos/elevatorRepo').default;
    let elevatorRepo = Container.get(elevatorRepoC);
    Container.set('ElevatorRepo', elevatorRepo);



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


  it('passagemController unit test a usar passagemService stub - create', async function () {

    // preparar

    let body = {
      name: "passagem1",
      floor1Id: 1,
      floor2Id: 2,
      building1Id: "building1",
      building2Id: "building2"
    };
    let req: Partial<Request> = {body: body};
    req.body = body;
    let res: Partial<Response> = {
      json: sinon.spy()
    };


    let next: Partial<NextFunction> = () => {
    };

    let passagemService = Container.get("PassagemService");

    sinon.stub(passagemService, "createPassagem").returns(Result.ok<IPassageDTO>({
      id: "1",
      code: req.body.name,
      floor1Id: req.body.floor1Id,
      floor2Id: req.body.floor2Id,
      building1Id: req.body.building1Id,
      building2Id: req.body.building2Id,
    }));
    const ctrl = new PassageController(passagemService as IPassageService);

    //act
    await ctrl.createPassage(req as Request, res as Response, next as NextFunction);

    //assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
      "id": "1",
      "name": req.body.name,
      "floor1Id": req.body.floor1Id,
      "floor2Id": req.body.floor2Id,
      "building1Id": req.body.building1Id,
      "building2Id": req.body.building2Id,
    }))
    });

  it('passagemController unit test a usar passagemService stub - update', async function () {
    // preparar

    let body = {
      oldNome: "passagem1",
      name: "passagem2",
      floor1Id: 1,
      floor2Id: 2,
      building1Id: "building1",
      building2Id: "building2"
    };
    let req: Partial<Request> = {body: body};
    req.body = body;
    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = ()=>{};

    let passageService = Container.get("PassageService");

    sinon.stub(passageService, "updatePassage").returns(Result.ok<IPassageDTO>({
      id: "1",
      code: req.body.name,
      floor1Id: req.body.floor1Id,
      floor2Id: req.body.floor2Id,
      building1Id: req.body.building1Id,
      building2Id: req.body.building2Id,
    }));
    const ctrl = new PassageController(passageService as IPassageService);

    //act
    await ctrl.updatePassage(req as Request, res as Response, next as NextFunction);

    //assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({"id": "1", "name": req.body.name, "floor1Id": req.body.floor1Id, "floor2Id": req.body.floor2Id, "building1Id": req.body.building1Id, "building2Id": req.body.building2Id,}));

  });

  it('passageController unit test using passageService stub - listPassagesBetweenBuildings', async function () {
    // preparar

    let body = {
      building1Id: "building1",
      building2Id: "building2"
    };
    let req: Partial<Request> = {query: body};
    req.query = body;
    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = ()=> {};

    let passageService = Container.get("PassageService");

    sinon.stub(passageService, "listPassagesBetweenBuildings").returns(Result.ok<IPassageDTO[]>([{
      id: "1",
      code: "passagem1",
      floor1Id: 1,
      floor2Id: 2,
      building1Id: "building1",
      building2Id: "building2",
    }]));
    const ctrl = new PassageController(passageService as IPassageService);

    //act
    await ctrl.listPassagesBetweenBuildings(req as Request, res as Response, next as NextFunction);

    //assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match([{"id": "1", "code": "passagem1", "floor1Id": 1, "floor2Id": 2, "building1Id": req.query.building1Id, "building2Id": req.query.building2Id,}]));

  });

});



