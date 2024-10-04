import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IfloorPersistence } from '../dataschema/IFloorPersistence';

import IfloorDTO from "../dto/IfloorDTO";
import { Floor } from "../domain/floor";


import Container from "typedi";
import BuildingRepo from "../repos/buildingRepo";
import { map } from "lodash";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";

export class floorMap extends Mapper<Floor> {
    public static toDTO(floor: Floor): IfloorDTO {
        return {
            id: floor.id.toString(),
            floorNumber: floor.floorNumber,
            description: floor.description,
            width: floor.width,
            length: floor.length,
            map: floor.map,
            building: floor.building.code,
        };
    }

    public static async toDomain(floor: any): Promise<Floor> {
        const repo = Container.get(BuildingRepo);
        const building = await repo.findByCode(floor.building);

        const floorOrError = Floor.create(
            {
                floorNumber: floor.floorNumber,
                description: floor.description,
                width: floor.width,
                length: floor.length,
                map: floor.map,
                building: building
            }, new UniqueEntityID(floor.domainId)
        );

        floorOrError.isFailure ? console.log(floorOrError.error) : '';

        return floorOrError.isSuccess ? floorOrError.getValue() : null;
    }

    public static toPersistence(floor: Floor): any {
        return {
            domainId: floor.id.toString(),
            floorNumber: floor.floorNumber,
            description: floor.description,
            width: floor.width,
            length: floor.length,
            map: floor.map,
            building: floor.building.code.toString(),
        }
    }
}
