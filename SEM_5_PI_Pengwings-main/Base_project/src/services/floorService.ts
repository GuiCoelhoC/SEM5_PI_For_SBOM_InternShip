import { Service, Inject } from "typedi";
import config from "../../config";
import IfloorDTO from "../dto/IFloorDTO";
import { Floor } from "../domain/floor";
import IFloorRepo from "./IRepos/IFloorRepo";
import IfloorService from "./IServices/IFloorService";
import IRoomRepo from "../services/IRepos/IRoomRepo";
import { Result } from "../core/logic/Result";
import { floorMap } from "../mappers/FloorMap";
import { Building } from "../domain/building";
import IBuildingDTO from "../dto/IBuildingDTO";
import { forEach } from "lodash";
import { BuildingMap } from "../mappers/BuildingMap";
import IBuildingRepo from "./IRepos/IBuildingRepo";
import IPassageRepo from "./IRepos/IPassageRepo";
import IElevatorRepo from "./IRepos/IElevatorRepo";
import e from "express";
import { IOrientdimensDTO } from "../dto/IOrientdimensDTO";
import { Room } from "../domain/room";
import IUpdateFloorDTO from "../dto/IUpdateFloorDTO";
import IAuthRole from "../AuthRole/IAuthRole";


@Service()
export default class floorService implements IfloorService {

    constructor(
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
        @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
        @Inject(config.repos.room.name) private classRepo: IRoomRepo,
        @Inject(config.repos.passagem.name) private passageRepo: IPassageRepo,
        @Inject(config.repos.elevator.name) private elevatorRepo: IElevatorRepo,
        @Inject(config.auth.AuthRole.name) private authRole: IAuthRole
    ) { }

    public async createfloor(floorDTO: IfloorDTO): Promise<Result<IfloorDTO>> {
        try {
            if (!await this.authRole.RoleCampus(floorDTO.token)) {
                return Result.fail<IfloorDTO>("Unauthorized");
            }
            console.log('floorService: createfloor', floorDTO);
            let building: Building;
            const buildingOrError = await this.getBuilding(floorDTO.building);
            if (buildingOrError.isFailure) {
                return Result.fail<IfloorDTO>('Building not found');
            } else {
                building = buildingOrError.getValue();
            }

            const checkNumber = await this.verifyNumberExists(floorDTO.floorNumber, building);

            if (checkNumber) {
                return Result.fail<IfloorDTO>('In that building a floor with that number already exists');
            }


            const floorOrError = await Floor.create(
                {
                    floorNumber: floorDTO.floorNumber,
                    description: floorDTO.description,
                    width: floorDTO.width,
                    length: floorDTO.length,
                    map: floorDTO.map,
                    building: building
                }
            );

            if (floorOrError.isFailure) {
                return Result.fail<IfloorDTO>(floorOrError.errorValue());
            }

            const floorResult = floorOrError.getValue();

            await this.floorRepo.save(floorResult);

            const floorDTOResult = floorMap.toDTO(floorResult) as IfloorDTO;

            return Result.ok<IfloorDTO>(floorDTOResult)

        } catch (e) {
            return Result.fail<IfloorDTO>('An unexpected error has occurred');
        }
    }

    public async updatefloor(floorDTO: IUpdateFloorDTO): Promise<Result<IfloorDTO>> {
        try {
            if (!await this.authRole.RoleCampus(floorDTO.token)) {
                return Result.fail<IfloorDTO>("Unauthorized");
            }
            let building: Building;

            const buildingOrError = await this.getBuilding(floorDTO.building);
            if (buildingOrError.isFailure) {
                return Result.fail<IfloorDTO>('Building not found');
            } else {
                building = buildingOrError.getValue();
            }

            const floorOrError = await this.floorRepo.findByNumberAndBuilding(floorDTO.oldFloorNumber, building.code);

            if (floorOrError == null) {
                return Result.fail<IfloorDTO>('The floor you are trying to update does not exist');
            } else {

                const floor = floorOrError;

                if ((floorDTO.floorNumber != undefined) || floorDTO.oldFloorNumber != floorDTO.floorNumber) {
                    const floor1 = await this.validatefloor(floorDTO.floorNumber, building);
                    if (floor1 != null) {
                        return Result.fail<IfloorDTO>('the floor nunber you are trying to introduce already exists');
                    }
                }

                const floorOrError2 = await this.floorRepo.update(floorDTO);

                const floorDTOResult = floorMap.toDTO(floorOrError2.getValue()) as IfloorDTO;

                return Result.ok<IfloorDTO>(floorDTOResult);
            }
        } catch (e) {
            return Result.fail<IfloorDTO>('An unexpected error has occurred');
        }
    }

    public async updateMap(building: string, floor: number, passage: Array<IOrientdimensDTO>, elevator: IOrientdimensDTO,token: string): Promise<Result<IfloorDTO>> {
        try {
            if (!await this.authRole.RoleCampus(building)) {
                return Result.fail<IfloorDTO>("Unauthorized");
            }
            const floorOrError = await this.floorRepo.findByNumberAndBuilding(floor, building);
            if (floorOrError == null) {
                return Result.fail<IfloorDTO>('floor not found');
            } else {
                let floor = floorOrError;
                let newMap = floor.map;
                console.log(newMap);
                const classes = await this.classRepo.findByfloorandBuilding(floor.floorNumber, building);
                console.log(classes);
                if (classes[0] != null){
                    while (classes.length > 0) {
                        const room = classes.pop();
                        //newMap = await this.addRoomToMapa(floor, room);
                    }
                }

                if (passage != null) {
                    while (passage.length > 0) {
                        const passagem = passage.pop();
                        const passageorError = await this.passageRepo.findByfloorBuilding(floor.floorNumber, floor.building.code);
                        if (passageorError == null) {
                            const passageorError2 = await this.passageRepo.findByfloorBuilding2(floor.floorNumber, floor.building.code);
                            if (passageorError2 == null) {
                                return Result.fail<IfloorDTO>('Passagem not found');
                            }
                        }

                        const passageOrError3 = await this.checkPassagemDimensoes(passagem, floor);
                        if (passageOrError3.isFailure) {
                            return Result.fail<IfloorDTO>('Dimensoes da passagem invalida');
                        }
                        //if passagem.orientacao == 'norte', x2 = x1 + 1, y2 = y1
                        //if passagem.orientacao == 'oeste', x2 = x1, y2 = y1 + 1
                        const x2 = passagem.orientacao.toLowerCase() == 'norte' ? passagem.x + 1 : passagem.x;
                        const y2 = passagem.orientacao.toLowerCase() == 'oeste' ? passagem.y + 1 : passagem.y;

                        if (newMap[passagem.y][passagem.x] == 0 || newMap[y2][x2] == 0) {
                            console.log('Espaço já ocupado');
                        } else {
                            newMap[passagem.y][passagem.x] = 0;
                            newMap[y2][x2] = 0;
                        }
                    }
                }


                if (elevator != null) {
                    const elevadorOrError = await this.elevatorRepo.findByBuildingId(building);
                    if (elevadorOrError == null) {
                        return Result.fail<IfloorDTO>('Elevador not found');
                    }

                    const elevadorOrError2 = await this.checkElevadorDimensoes(elevator, floor);
                    if (elevadorOrError2.isFailure) {
                        return Result.fail<IfloorDTO>('Elevador invalido');
                    }

                    const x2 = elevator.orientacao.toLowerCase() == 'norte' ? elevator.x + 1 : elevator.x;
                    const y2 = elevator.orientacao.toLowerCase() == 'oeste' ? elevator.y + 1 : elevator.y;

                    if (newMap[elevator.y][elevator.x] == 0 || newMap[y2][x2] == 0) {
                        console.log('Espaço já ocupado');
                    } else {
                        newMap[elevator.y][elevator.x] = 0;
                        newMap[y2][x2] = 0;
                    }
                }
                console.log(newMap);
                floor.map = newMap;
                const floorDTOResult = floorMap.toDTO(floor) as IfloorDTO;
                const floorOrError2 = await this.floorRepo.updateMap(floorDTOResult);
                if (floorOrError2.isFailure) {
                    return Result.fail<IfloorDTO>('Falha ao atualizar mapa');
                }
                return Result.ok<IfloorDTO>(floorDTOResult);
            }



        } catch (e) {
            console.error(e);
        }
    }

    /*private async createNewMapa(floor: floor): Promise<Array<Array<number>>> {
        const width = floor.width;
        const length = floor.length;
        let mapa = new Array<Array<number>>();
            for (let y = 0; y <= width; y++) {
                mapa[y] = new Array<number>();
                for (let x = 0; x <= length; x++) {
                    if (x == 0 && y == 0) {
                        mapa[y][x] = 3;
                    } else if (x == length && y == width) {
                        mapa[y][x] = 0;
                    } else if (x == length || (x == 0 && y != width)) {
                        mapa[y][x] = 1;
                    } else if (y == width || (y == 0 && x != length)) {
                        mapa[y][x] = 2;
                    } else {
                        mapa[y][x] = 0;
                    }
                }
            }
        return mapa;
    }*/


    /*
    private async addRoomToMapa(floor: Floor, room: Room): Promise<Array<Array<number>>> {
        const x1 = room.dimensions[0];
        const x2 = room.dimensions[1];
        const y1 = room.dimensions[2];
        const y2 = room.dimensions[3];

        floor.map[y1][x1] = 3;
        for (let i = x1 + 1; i <= x2; i++) {
            if (floor.map[y1][i] == 1) {
                floor.map[y1][i] = 3;
            } else {
                floor.map[y1][i] = 2;
            }

            if (floor.map[y2][i] == 1) {
                floor.map[y2][i] = 3;
            } else {
                floor.map[y2][i] = 2;
            }
        }
        for (let i = y1 + 1; i <= y2; i++) {
            if (floor.map[i][x2] == 2) {
                floor.map[i][x2] = 3;
            } else {
                floor.map[i][x2] = 1;
            }

            if (floor.map[i][x1] == 2) {
                floor.map[i][x1] = 3;
            } else {
                floor.map[i][x1] = 1;
            }
        }

        floor.map[room.door[0]][room.door[1]] = 0;
        return floor.map;

    }*/

    private async checkElevadorDimensoes(elevador: IOrientdimensDTO, floor: Floor): Promise<Result<string>> {
        if (elevador.orientacao == 'norte') {
            if (elevador.x + 1 > floor.length || (elevador.y != floor.width && elevador.y != 0)) { //+1 porque o mapa tem +1 width e length (parte de fora)
                return Result.fail<string>('Dimensoes do elevador invalidas');
            }
        }
        else if (elevador.orientacao == 'oeste') {
            if (elevador.y + 1 > floor.width || (elevador.x != floor.length && elevador.x != 0)) {
                return Result.fail<string>('Dimensoes do elevador invalidas');
            }
        } else {
            return Result.fail<string>('Orientacao do elevador invalidas');
        }
        return Result.ok<string>('Elevador valido');
    }

    private async checkPassagemDimensoes(passagem: IOrientdimensDTO, floor: Floor): Promise<Result<string>> {
        if (passagem.orientacao == 'norte') {
            if (passagem.x + 1 > floor.length || (passagem.y != floor.width  && passagem.y != 0)) {
                return Result.fail<string>('Dimensoes da passagem invalidas');
            }
        }
        else if (passagem.orientacao == 'oeste') {
            if (passagem.y + 1 > floor.width || (passagem.x != floor.length  && passagem.x != 0)) {
                return Result.fail<string>('Dimensoes da passagem invalidas');
            }
        } else {
            return Result.fail<string>('Orientacao da passagem invalidas');
        }
        return Result.ok<string>('Passagem valida');
    }

    public async listfloors(building: string, token: string): Promise<Result<IfloorDTO[]>> {

        try {
            if (!await this.authRole.RoleCampus(token)) {
                return Result.fail<IfloorDTO[]>("Unauthorized");
            }
            const floorsOrError = await this.floorRepo.findAllByBuilding(building);
            if (floorsOrError == null) {
                return Result.fail<IfloorDTO[]>('No floors found');
            } else {
                const floorsDTO = floorsOrError.map((floor) => {
                    return floorMap.toDTO(floor);
                });
                return Result.ok<IfloorDTO[]>(floorsDTO);
            }
        } catch (e) {
            return Result.fail<IfloorDTO[]>('An unexpected error has occurred');
        }
    }

    public async listAllFloors(token : string): Promise<Result<IfloorDTO[]>> {
        try {
            if (!await this.authRole.RoleCampus(token)) {
                return Result.fail<IfloorDTO[]>("Unauthorized");
            }
            const floorsOrError = await this.floorRepo.findAll();
            if (floorsOrError == null) {
                return Result.fail<IfloorDTO[]>('No floors found');
            } else {
                const floorsDTO = floorsOrError.map((floor) => {
                    return floorMap.toDTO(floor);
                });
                return Result.ok<IfloorDTO[]>(floorsDTO);
            }
        } catch (e) {
            return Result.fail<IfloorDTO[]>('An unexpected error has occurred');
        }
    }
    private async verifyNumberExists(number: number, building: Building): Promise<boolean> {
        const floors = await this.floorRepo.findAllByBuilding(building.code);

        if (floors != null) {
            for (let i = 0; i < floors.length; i++) {
                if (floors[i].floorNumber == number) {
                    return true;
                }
            }
        }
        return false;
    }
    private async validatefloor(number: number, building: Building): Promise<Floor> {
        const floors = await this.floorRepo.findAllByNumber(number);

        if (floors != null) {
            for (let i = 0; i < floors.length; i++) {
                if (floors[i].building.code == building.code) {
                    return floors[i];
                }
            }
        }
        return null;
    }

    private async getBuilding(code: string): Promise<Result<Building>> {
        console.log('floorService: getBuilding');
        const building = await this.buildingRepo.findByCode(code);
        const found = !!building;

        if (found) {
            return Result.ok<Building>(building);
        } else {
            return Result.fail<Building>('Building not found');
        }
    }

    // US 220 - Listar floors de um building com passagens para outros buildings (GET)
    // tem de verificar os codes dos buildings das passagens
    public async listfloorsComPassagens(building: string,token: string): Promise<Result<IfloorDTO[]>> {
        try {
            if (!await this.authRole.RoleCampus(token)) {
                return Result.fail<IfloorDTO[]>("Unauthorized");
            }
            const passageOrError = await this.passageRepo.findPassageByBuilding(building);

            if(passageOrError == null){
                return Result.fail<IfloorDTO[]>('Passagens not found');
            }else{
              const floorsComPassagens: Floor[] = [];
              const floorsOrError = await this.floorRepo.findAllByBuilding(building);
              for (let i = 0; i < floorsOrError.length; i++) {
                for (let j = 0; j < passageOrError.length; j++) {
                  if (floorsOrError[i].floorID == passageOrError[j].floor1.floorID) {
                    floorsComPassagens.push(floorsOrError[i]);
                  }
                }
              }
              const floorsDTO = floorsComPassagens.map((floor) => {
                return floorMap.toDTO(floor);
              });
              return Result.ok<IfloorDTO[]>(floorsDTO);
            }


           /* const floorsOrError = await this.floorRepo.findAllByBuilding(building);
            const floorsComPassagens = [];
            if (floorsOrError == null) {
                return Result.fail<IfloorDTO[]>('No floors found');
            } else {

                for (let i = 0; i < floorsOrError.length; i++) {
                    const passagens = await this.passageRepo.findByfloorBuilding(floorsOrError[i].floorNumber, building);
                    if (passagens == null) {
                        const passagens2 = await this.passageRepo.findByfloorBuilding2(floorsOrError[i].floorNumber, building);
                        if (passagens2 != null) {
                            floorsComPassagens.push(floorsOrError[i]);
                        }
                    } else {
                        floorsComPassagens.push(floorsOrError[i]);
                    }
                }
            }
            const floorsDTO = floorsComPassagens.map((floor) => {
                return floorMap.toDTO(floor);
            });
            return Result.ok<IfloorDTO[]>(floorsDTO);

        } catch (e) {
            throw e;
        }*/

            }catch (e) {
            throw e;
          }
    }



    public async countfloors(): Promise<Result<number>> {
        try {
            const floorsOrError = await this.floorRepo.countfloors();

            return Result.ok<number>(floorsOrError);

        } catch (e) {
            throw e;
        }
    }
}
