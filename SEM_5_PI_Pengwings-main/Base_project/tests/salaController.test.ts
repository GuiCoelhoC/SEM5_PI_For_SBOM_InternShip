import 'reflect-metadata';

import 'mocha';
import * as sinon from 'sinon';
import Container, { Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';
import IRoomDTO from '../src/dto/IRoomDTO';
import { Result } from '../src/core/logic/Result';
import RoomController from '../src/controllers/salaController';
import IRoomService from '../src/services/IServices/IRoomService';
import { Floor } from '../src/domain/floor';
import { UniqueEntityID } from '../src/core/domain/UniqueEntityID';


describe('Room Controller', function () {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
        this.timeout(10000);
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

    this.afterEach(function () {
        sandbox.restore();
    });

    it('salaController unit test usando sala service stub - create', async function () {
        //Arrange
        let body = {
            name: "sala1",
            floor: 1,
            building: "building1",
            description: "sala 1",
            roomtype: "Gabinete",
            dimensions: [0, 0, 3, 4],
            door: [2, 5]
        };

        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let salaServiceInstance = Container.get('RoomService');

        sinon.stub(salaServiceInstance, 'createRoom').returns(Promise.resolve(Result.ok<IRoomDTO>({
            id: "1",
            name: "sala1",
            floor: 1,
            building: "building1",
            description: "sala 1",
            roomtype: "Gabinete",
            dimensions: [0, 0, 3, 4],
            door: [2, 5]
        })));

        const ctrl = new RoomController(salaServiceInstance as IRoomService);

        //act
        await ctrl.createRoom(req as Request, res as Response, next as NextFunction);

        //assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(
            {
                id: "1",
                name: req.body.name,
                floor: req.body.floor,
                building: req.body.building,
                description: req.body.description,
                roomtype: req.body.roomtype,
                dimensions: req.body.dimensions,
                door: req.body.door
            }));
    });

    it('salaController + salaService integration test - create', async function () {
        //Arrange

        let body = {
            name: "sala1",
            floor: 1,
            building: "building1",
            description: "sala 1",
            roomtype: "Gabinete",
            dimensions: [0, 0, 3, 4],
            door: [2, 5]
        };

        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let salaServiceInstance = Container.get('RoomService');
        let floorRepoInstance = Container.get('floorRepo');
        let salaRepoInstance = Container.get('RoomRepo');

        sinon.stub(salaRepoInstance, 'save').returns(Promise.resolve(Result.ok<IRoomDTO>({
            "id": "1",
            "name": req.body.name,
            "floor": req.body.floor,
            "building": req.body.building,
            "description": req.body.description,
            "roomtype": req.body.roomtype,
            "dimensions": req.body.dimensions,
            "door": req.body.door
        })));

        sinon.stub(salaRepoInstance, 'findByNameAndfloor').returns(Promise.resolve(null));

        sinon.stub(floorRepoInstance, 'findByNumberAndBuilding').returns(Promise.resolve({
            "id": "1",
            "numero": req.body.floor,
            "building": req.body.building,
            "description": "floor 1",
            "length": 10,
            "width": 10
        }));

        const ctrl = new RoomController(salaServiceInstance as IRoomService);

        //act
        await ctrl.createRoom(req as Request, res as Response, next as NextFunction);

        //assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({ "id": "1", "name": req.body.name, "floor": req.body.floor, "building": req.body.building, "description": req.body.description, "roomtype": req.body.roomtype, "dimensions": req.body.dimensions, "door": req.body.door }));

    });

    it('salaController + salaService integration test spy salaService', async function () {
        //Arrange

        let body = {
            name: "sala1",
            floor: 1,
            building: "building1",
            description: "sala 1",
            roomtype: "Gabinete",
            dimensions: [0, 0, 3, 4],
            door: [2, 5]
        };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let salaServiceInstance = Container.get('RoomService');
        let floorRepoInstance = Container.get('floorRepo');
        let salaRepoInstance = Container.get('RoomRepo');

        sinon.stub(salaRepoInstance, 'save').returns(Promise.resolve(Result.ok<IRoomDTO>({
            "id": "1",
            "name": req.body.name,
            "floor": req.body.floor,
            "building": req.body.building,
            "description": req.body.description,
            "roomtype": req.body.roomtype,
            "dimensions": req.body.dimensions,
            "door": req.body.door
        })));

        sinon.stub(salaRepoInstance, 'findByNameAndfloor').returns(Promise.resolve(null));
        sinon.stub(floorRepoInstance, 'findByNumberAndBuilding').returns(Promise.resolve(Floor.create({
            floornumber: req.body.floor,
            description: "floor 1",
            building: req.body.building,
            length: 10,
            width: 10,
            map: [],
            passagens: []
        }, new UniqueEntityID("1")).getValue()));


        const spy = sinon.spy(salaServiceInstance, 'createRoom');

        const ctrl = new RoomController(salaServiceInstance as IRoomService);

        let expected = {
            name: req.body.name,
            floor: req.body.floor,
            building: req.body.building,
            description: req.body.description,
            roomtype: req.body.roomtype,
            dimensions: req.body.dimensions,
            door: req.body.door
        };
        //act
        await ctrl.createRoom(req as Request, res as Response, next as NextFunction);

        //assert
        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, sinon.match(expected));
    });
});
