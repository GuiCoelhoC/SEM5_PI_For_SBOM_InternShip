import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IRoomPersistence } from '../dataschema/IRoomPersistence';

import IRoomDTO from "../dto/IRoomDTO";
import { Room } from "../domain/room";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class RoomMap extends Mapper<Room> {

    public static toDTO(sala: Room): IRoomDTO {
        return {
            id: sala.id.toString(),
            floor: sala.floor,
            building: sala.building.toString(),
            name: sala.name.toString(),
            description: sala.description.toString(),
            roomtype: sala.roomtype.toString(),
        }   
    }

    public static toDomain(sala: any | Model<IRoomPersistence & Document>): Room {
        const salaOrError = Room.create(
            sala,
            new UniqueEntityID(sala.domainID)
        );

        salaOrError.isFailure ? console.log(salaOrError.error, 'it failed') : '';

        return salaOrError.isSuccess ? salaOrError.getValue() : null;
    }

    public static toPersistence(sala: Room): any {
        return {
            domainId: sala.id.toString(),
            floor: sala.floor,
            building: sala.building,
            name: sala.name,
            description: sala.description,
            roomtype: sala.roomtype
        }
    }

}