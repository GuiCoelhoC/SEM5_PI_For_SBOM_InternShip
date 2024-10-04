import {Inject, Service} from 'typedi';

import IRoomRepo from '../services/IRepos/IRoomRepo';
import {Room} from "../domain/room";
import {RoomMap} from '../mappers/RoomMap';

import {Document, FilterQuery, Model} from 'mongoose';
import {IRoomPersistence} from '../dataschema/IRoomPersistence';
import {RoomID} from '../domain/roomID';
import {floorID} from '../domain/floorID';

@Service()
export default class RoomRepo implements IRoomRepo {
    private models: any;

    constructor(
        @Inject('roomSchema') private roomSchema: Model<IRoomPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(room: Room): Promise<boolean> {
        const idx = room.id instanceof Room ? (<RoomID>room.id).id.toValue() : room.id;

        const query = { domainId: idx };
        const roleDocument = await this.roomSchema.findOne(query as FilterQuery<IRoomPersistence & Document>);

        return !!roleDocument === true;
    }

    public async save(room: Room): Promise<Room> {
        const query = { domainId: room.id.toString() };
        const roomDocument = await this.roomSchema.findOne(query);

        try{
            if(roomDocument == null){
                const rawRoom: any = RoomMap.toPersistence(room);
                console.log('rawRoom: ' , rawRoom);
                const roomCreated = await this.roomSchema.create(rawRoom);
                return RoomMap.toDomain(roomCreated);
            }
        } catch(err){
            console.log(err);
            throw err;
        }
    }

    public async findByNameAndfloor(roomID: RoomID | string, floorID: floorID | number): Promise<Room> {

        const query = { name: roomID.toString(), floor: floorID};
        console.log(query);
        const roomRecord = await this.roomSchema.findOne(query as FilterQuery<IRoomPersistence & Document>);
        console.log('room record: ' , roomRecord);
        if (roomRecord != null) {
            return RoomMap.toDomain(roomRecord);
        }
        return null;
    }

    public async findAll(): Promise<Room[]> {
      let roomDocument = await this.roomSchema.find();

      if(roomDocument != null){
        return roomDocument.map((room) => {
          return RoomMap.toDomain(room)
        });
      }
    }

    public async findByfloorandBuilding(floor: number, building: string): Promise<Room[]> {
        console.log('== Find rooms by floor and Building ==');
        const query = { floor: floor, building: building };
        const roomRecord = await this.roomSchema.find(query as FilterQuery<IRoomPersistence & Document>);
        if (roomRecord != null) {
            return roomRecord.map((room) => RoomMap.toDomain(room));
        }
        return null;
    }

    public async contarRooms(): Promise<Number> {
        const query = {};
        const roomRecord = await this.roomSchema.find(query as FilterQuery<IRoomPersistence & Document>);
        if (roomRecord != null) {
            return roomRecord.length;
        }
        return null;
    }
}
