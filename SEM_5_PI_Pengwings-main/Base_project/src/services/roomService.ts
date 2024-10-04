import { Service, Inject } from 'typedi';
import config from "../../config";
import IRoomDTO from '../dto/IRoomDTO';
import { Room } from "../domain/room";
import IRoomRepo from './IRepos/IRoomRepo';
import IFloorRepo from './IRepos/IFloorRepo';
import IRoomService from './IServices/IRoomService';
import { Result } from "../core/logic/Result";
import { RoomMap } from "../mappers/RoomMap";
import IfloorDTO from '../dto/IFloorDTO';
import { Floor } from '../domain/floor';
import IAuthRole from "../AuthRole/IAuthRole";

@Service()
export default class RoomService implements IRoomService {
    constructor(
        @Inject(config.repos.room.name) private roomRepo : IRoomRepo,
        @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
        @Inject(config.auth.AuthRole.name) private authRole : IAuthRole
    ) {}

    public async createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
        try{
            if(!await this.authRole.RoleCampus(roomDTO.token)){
                return Result.fail<IRoomDTO>('Unauthorized');
            }
            const roomExists = await this.roomRepo.findByNameAndfloor(roomDTO.name, roomDTO.floor);
            const floorExists = await this.floorRepo.findByNumberAndBuilding(roomDTO.floor, roomDTO.building)
            console.log('room exists: ', roomExists);
            if (roomExists != null) {
                return Result.fail<IRoomDTO>('Room ja existe');
            }

            if (floorExists == null) {
                return Result.fail<IRoomDTO>('floor nao existe no building indicado');
            }
            console.log('DTO : ', roomDTO);
            const roomOrError = await Room.create(roomDTO);
            console.log('over');

            if (roomOrError.isFailure) {
                return Result.fail<IRoomDTO>(roomOrError.error.toString());
            }
            /*
            if (!this.checkDimensoes(roomDTO, floorExists)) {
                return Result.fail<IRoomDTO>('Room nao cabe no floor');
            }*/

            const roomResult = roomOrError.getValue();
            await this.roomRepo.save(roomResult);
            const roomDTOResult = RoomMap.toDTO(roomResult) as IRoomDTO;

            return Result.ok<IRoomDTO>(roomDTOResult);
        } catch (e) {
            throw e;
        }
    }

    /*
    private async checkDimensoes(room: IRoomDTO, floor: Floor) : Promise<boolean> {
        console.log('room { x1: ' + room.dimensions[1] + ', y1: ' + room.dimensions[0] + ', x2: ' + room.dimensions[3] + ', y2: ' + room.dimensions[2] + ' }');
        console.log('floor { length: ' + floor.length + ', width: ' + floor.width + ' }');

        if (room.dimensions[2] > floor.width) {
            return false;
        }

        if (room.dimensions[3] > floor.length) {
            return false;
        }

        return true;
    }
    */

    public async getRooms(): Promise<Result<Array<IRoomDTO>>> {
        try{
            const roomOrError = await this.roomRepo.findAll();
            if (roomOrError === null) {
                return Result.fail<Array<IRoomDTO>>('Room nao existe');
            }
            const roomDTOArray = new Array<IRoomDTO>();
            roomOrError.forEach(room => {
                roomDTOArray.push(RoomMap.toDTO(room));
            });
            return Result.ok<Array<IRoomDTO>>(roomDTOArray);
        } catch (e) {
            throw e;
        }
    }

    public async contarRooms(): Promise<Result<Number>> {
        try{
            const roomOrError = await this.roomRepo.contarRooms();
            if (roomOrError === null) {
                return Result.fail<Number>('Room nao existe');
            }
            return Result.ok<Number>(roomOrError);
        } catch (e) {
            throw e;
        }
    }
}
