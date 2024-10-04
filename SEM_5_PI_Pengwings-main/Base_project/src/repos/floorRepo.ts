import { Service, Inject } from 'typedi';

import IFloorRepo from '../services/IRepos/IFloorRepo';
import { Floor } from "../domain/floor";
import { floorID } from '../domain/floorID';
import { floorMap } from '../mappers/FloorMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IfloorPersistence } from '../dataschema/IFloorPersistence';
import { Result } from '../core/logic/Result';
import IfloorDTO from '../dto/IFloorDTO';
import IUpdateFloorDTO from "../dto/IUpdateFloorDTO";

@Service()
export default class floorRepo implements IFloorRepo {
    private models: any;

    constructor(
        @Inject('floorSchema') private floorSchema: Model<IfloorPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(floor: Floor): Promise<boolean> {

        const idx = floor.id instanceof Floor ? (<floorID>floor.id).id.toValue() : floor.id;

        const query = { domainId: idx };
        const roleDocument = await this.floorSchema.findOne(query as FilterQuery<IfloorPersistence & Document>);

        return !!roleDocument === true;
    }

    public async save(floor: Floor): Promise<Floor> {
        console.log('== floor Saving ==');
        const query = { domainId: floor.id.toString() };

        const floorDocument = await this.floorSchema.findOne(query);


        try {
            if (floorDocument == null) {
                const rawfloor: any = floorMap.toPersistence(floor);
                const floorCreated = await this.floorSchema.create(rawfloor);
                return floorMap.toDomain(floorCreated);

            } else {
                floorDocument.floorNumber = floor.floorNumber;
                floorDocument.description = floor.description;
                floorDocument.width = floor.width;
                floorDocument.length = floor.length;

                await floorDocument.save();

                return floor;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByNumber(number: number): Promise<Floor> {
        const query = { floorNumber: number }
        const floorDocument = await this.floorSchema.findOne(query);

        if (floorDocument != null) {
            return floorMap.toDomain(floorDocument);
        } else {
            return null;
        }
    }

    public async findByNumberAndBuilding(number: number, building: string): Promise<Floor> {
        const query = { floorNumber: number, building: building }
        const floorDocument = await this.floorSchema.findOne(query);

        if (floorDocument != null) {
            return floorMap.toDomain(floorDocument);
        } else {
            return null;
        }
    }

    public async findAllByNumber(number: number): Promise<Floor[]> {
        const query = { floorNumber: number }

        let floorDocument = await this.floorSchema.find(query);

        if (floorDocument != null) {
            const floorArray = floorDocument.map((floor) => {
                return floorMap.toDomain(floor);
            });

            return Promise.all(floorArray);
        } else {
            return null;
        }
    }

    public async findAllByBuilding(building: string): Promise<Floor[]> {
        const query = { building: building }

        let floorDocument = await this.floorSchema.find(query);

        if (floorDocument != null) {
            const floorArray = floorDocument.map((floor) => {
                return floorMap.toDomain(floor);
            });

            return Promise.all(floorArray);
        } else {
            return null;
        }
    }

    public async findAll(): Promise<Floor[]> {
        let floorDocument = await this.floorSchema.find();

        if (floorDocument != null) {
            const floorArray = floorDocument.map((floor) => {
                return floorMap.toDomain(floor);
            });

            return Promise.all(floorArray);
        } else {
            return null;
        }
    }

    public async update(floorDTO: IUpdateFloorDTO): Promise<Result<Floor>> {
        try {
            const query = { floorNumber: floorDTO.oldFloorNumber, building: floorDTO.building };

            const floorDocument = await this.floorSchema.findOne(query);

            if (floorDocument == null) {
                return Result.fail<Floor>(`floor with numero ${floorDTO.oldFloorNumber} not found`);
            }

            if (floorDTO.floorNumber !== undefined && floorDTO.floorNumber !== null) {
                floorDocument.floorNumber = floorDTO.floorNumber;
            }

            if (floorDTO.description !== undefined && floorDTO.description !== null && floorDTO.description !== '') {
                floorDocument.description = floorDTO.description;
            }

            await floorDocument.save();

            const updatedfloor = await floorMap.toDomain(floorDocument);

            return Result.ok<Floor>(updatedfloor)
        } catch (err) {
            throw err;
        }
    }

    public async updateMap(floorDTO: IfloorDTO): Promise<Result<Floor>> {
        try {
            const query = {
                floorNumber: floorDTO.floorNumber,
                building: floorDTO.building
            };

            const floorDocument = await this.floorSchema.findOne(query);

            if (floorDocument == null) {
                return Result.fail<Floor>(`floor with numero ${floorDTO.floorNumber} not found`);
            }

            floorDocument.map = floorDTO.map;

            await floorDocument.save();

            const updatedfloor = await floorMap.toDomain(floorDocument);

            return Result.ok<Floor>(updatedfloor)
        } catch (err) {
            console.error(err);
        }
    }

    // US 220 - Listar floors de um building com passagens para outros buildings (GET)

    public async findfloorsComPassagens(building1Id: string, building2Id: string): Promise<Floor[]> {
        const query = { building1Id: building1Id, building2Id: building2Id }

        let floorDocument = await this.floorSchema.find(query);

        if (floorDocument != null) {
            const floorArray = floorDocument.map((floor) => {
                return floorMap.toDomain(floor);
            });

            return Promise.all(floorArray);
        }else{
            return null;
        }
    }

    public async countfloors(): Promise<number> {
        const query = {};
        const floorDocument = await this.floorSchema.find(query);

        if (floorDocument != null) {
            return floorDocument.length;
        } else {
            return 0;
        }
    }

}
