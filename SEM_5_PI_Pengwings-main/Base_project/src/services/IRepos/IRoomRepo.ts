import { Repo } from "../../core/infra/Repo";
import { Floor } from "../../domain/floor";
import { Room } from "../../domain/room";
import { RoomID } from "../../domain/roomID";
import { floorID } from "../../domain/floorID";

export default interface IRoomRepo extends Repo<Room> {
    save(sala: Room): Promise<Room>;
    findByNameAndfloor(salaId: RoomID | string, floorId: floorID | number): Promise<Room>;
    contarRooms(): Promise<Number>;
    findByfloorandBuilding (floor: number, building: string): Promise<Room[]>;
    findAll(): Promise<Room[]>;
}
