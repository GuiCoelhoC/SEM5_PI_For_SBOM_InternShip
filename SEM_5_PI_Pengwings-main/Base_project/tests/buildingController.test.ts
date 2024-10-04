import 'reflect-metadata';

import 'mocha';
import * as sinon from 'sinon';
import Container, { Service } from 'typedi';
import config from '../config';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../src/core/logic/Result';
import IBuildingDTO from '../src/dto/IBuildingDTO';
import BuildingController from '../src/controllers/buildingController';
import IBuildingService from '../src/services/IServices/IBuildingService';
import { Building } from '../src/domain/building';
import { UniqueEntityID } from '../src/core/domain/UniqueEntityID';


describe('Building Controller', function () {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
        this.timeout(10000);
        Container.reset();

        let buildingSchema = require('../src/persistence/schemas/buildingSchema').default;
        Container.set('buildingSchema', buildingSchema);

        let buildingRepoC = require('../src/repos/buildingRepo').default;
        let buildingRepo = Container.get(buildingRepoC);
        Container.set('BuildingRepo', buildingRepo);

        let buildingServiceC = require('../src/services/buildingService').default;
        let buildingService = Container.get(buildingServiceC);
        Container.set('BuildingService', buildingService);


    });

    afterEach(function () {
        sandbox.restore();
    });

    it('buildingController unit test usando building service stub - create', async function () {
        //Arrange
        let body = {
            code: "123",
            name: "building1",
            description: "building 1",
            widthMax: 10,
            lengthMax: 10,
        };

        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let buildingServiceInstance = Container.get('BuildingService');
        sinon.stub(buildingServiceInstance, 'createBuilding').returns(Result.ok<IBuildingDTO>({
            "id": "123",
            "code": req.body.code,
            "name": req.body.name,
            "description": req.body.description,
            "widthMax": req.body.widthMax,
            "lengthMax": req.body.lengthMax,
        }));
        const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

        //act
        await ctrl.createBuilding(req as Request, res as Response, next as NextFunction);

        //assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({ "id": "123", "code": req.body.code, "name": req.body.name, "description": req.body.description, "widthMax": req.body.widthMax, "lengthMax": req.body.lengthMax, }));

    });

    it('buildingController unit test usando building service stub - update', async function () {
        //Arrange
        let body = {"code": "TST1", "name": "Teste2", "description": "DescTeste2", "widthMax": 11, "lengthMax": 11};

        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        
        let next: Partial<NextFunction> = () => { };

        let testBuildingDTO = {
            id: "TST1",
            code: req.body.code,
            name: req.body.name,
            description: req.body.description,
            widthMax: req.body.widthMax,
            lengthMax: req.body.lengthMax,
        };
        let testBuilding = Building.create(testBuildingDTO, new UniqueEntityID("TST1"));
        let buildingServiceInstance = Container.get('BuildingService');
        sinon.stub(buildingServiceInstance, 'updateBuilding').returns(Result.ok(testBuilding));
        const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

        //act
        await ctrl.updateBuilding(req as Request, res as Response, next as NextFunction);

        //assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(testBuilding));
    });

    it("buildingController unit test usando building service stub - list", async function () {
        //Arrange
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let listBuilding = [] as IBuildingDTO[];
        listBuilding.push({
            id: "123",
            code: "123",
            name: "Buildingteste1",
            description: "teste1",
            widthMax: 6,
            lengthMax: 7
        }, {
            id: "124",
            code: "124",
            name: "Buildingteste2",
            description: "teste2",
            widthMax: 8,
            lengthMax: 9
        });
        let buildingServiceInstance = Container.get('BuildingService');
        sinon.stub(buildingServiceInstance, 'listBuildings').returns(Result.ok<IBuildingDTO[]>(listBuilding));
        const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

        //act
        await ctrl.listBuildings(req as Request, res as Response, next as NextFunction);

        //assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(listBuilding));
    });

    it("buildingController + buildingService integration test with stub buildingRepo and building", async function () {
        //arrange
        let body = {
            code: "123",
            name: "building1",
            description: "building 1",
            widthMax: 10,
            lengthMax: 10,
        };

        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => { };

        sinon.stub(Building, "create").returns(Result.ok(
            {
                id: "123",
                code: req.body.code,
                name: req.body.name,
                description: req.body.description,
                widthMax: req.body.widthMax,
                lengthMax: req.body.lengthMax,
            }
        ));

        let buildingRepoInstance = Container.get("BuildingRepo");
        sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
            resolve(Building.create({
                id: "123",
                code: req.body.code,
                name: req.body.name,
                description: req.body.description,
                widthMax: req.body.widthMax,
                lengthMax: req.body.lengthMax,
            }).getValue())

        }));

        sinon.stub(buildingRepoInstance, "findByCode").returns(null);


        let buildingServiceInstance = Container.get("BuildingService");
        
        const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

        //act
        await ctrl.createBuilding(req as Request, res as Response, next as NextFunction);

        //assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            id: "123",
            code: req.body.code,
            name: req.body.name,
            description: req.body.description,
            widthMax: req.body.widthMax,
            lengthMax: req.body.lengthMax,
        }));
    });

    it("buildingController + buildingService integration test using spy on buildingService", async function () {
        //Arrange
        let body = {
            code: "123",
            name: "building1",
            description: "building 1",
            widthMax: 10,
            lengthMax: 10,
        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => { };

        let buildingRepoInstance = Container.get("BuildingRepo");
        
        sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
            resolve(Building.create({
                id: "123",
                code: req.body.code,
                name: req.body.name,
                description: req.body.description,
                widthMax: req.body.widthMax,
                lengthMax: req.body.lengthMax,
            }).getValue())
        }));

        sinon.stub(buildingRepoInstance, "findByCode").returns(null);


        let buildingServiceInstance = Container.get("BuildingService");
        const buildingspy = sinon.spy(buildingServiceInstance, "createBuilding");

        const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

        let expected = {
            code: req.body.code,
            name: req.body.name,
            description: req.body.description,
            widthMax: req.body.widthMax,
            lengthMax: req.body.lengthMax,
        }
        //act
        await ctrl.createBuilding(req as Request, res as Response, next as NextFunction);
        
        //assert
        sinon.assert.calledWith(res.json);
        sinon.assert.calledWith(buildingspy, sinon.match(expected));
    });
});