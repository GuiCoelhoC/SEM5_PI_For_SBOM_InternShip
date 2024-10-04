import {Service, Inject, Container} from 'typedi';
import config from "../../config";
import { Elevator } from "../domain/elevator";
import IElevatorDTO from "../dto/IElevatorDTO";
import IElevatorRepo from './IRepos/IElevatorRepo';
import IElevatorService from './IServices/IElevatorService';
import { Result } from "../core/logic/Result";
import { ElevatorMap } from "../mappers/ElevatorMap";
import {Building} from "../domain/building";
import {Floor} from "../domain/floor";
import IBuildingRepo from "./IRepos/IBuildingRepo";
import IFloorRepo from "./IRepos/IFloorRepo";
import IAuthRole from "../AuthRole/IAuthRole";


@Service()
export default class ElevatorService implements IElevatorService {
  constructor(
    @Inject(config.repos.elevator.name) private elevatorRepo : IElevatorRepo,
    @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo,
    @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
    @Inject(config.auth.AuthRole.name) private authRole : IAuthRole
  ) {}

  public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try{
      if (!await this.authRole.RoleCampus(elevatorDTO.token)) {
        return Result.fail<IElevatorDTO>("Unauthorized");
      }

      let building : Building;
      let floors : Array<Floor>;

      const buildingOrError = await this.getBuilding(elevatorDTO.building);

      if (buildingOrError.isFailure) {
        return Result.fail<IElevatorDTO>(buildingOrError.errorValue());
      } else {
        building = buildingOrError.getValue();
      }

      const floorsOrError = await this.getFloors(elevatorDTO.floors, elevatorDTO.building);

      if (floorsOrError.isFailure) {
        return Result.fail<IElevatorDTO>(floorsOrError.errorValue());
      } else {
        floors = floorsOrError.getValue();
      }

      const code = await this.generateCode(elevatorDTO.building);

      if (await this.elevatorRepo.findByCode(code) != null) {
        return Result.fail<IElevatorDTO>('Elevator already exists');
      }

      console.log(code);

      const elevatorOrError = await Elevator.create({
        code: code,
        building: building,
        floors: floors,
        brand: elevatorDTO.brand,
        model: elevatorDTO.model,
        serialNumber: elevatorDTO.serialNumber,
        description: elevatorDTO.description
      });

      if (elevatorOrError.isFailure) {
        return Result.fail<IElevatorDTO>(elevatorOrError.errorValue());
      }
      const elevatorResult = elevatorOrError.getValue();

      await this.elevatorRepo.save(elevatorResult);

      const elevatorDTOResult = ElevatorMap.toDTO(elevatorResult) as IElevatorDTO;
      return Result.ok<IElevatorDTO>(elevatorDTOResult);

    } catch (e) {
      throw Result.fail<IElevatorDTO>('An unexpected error occurred');
    }
  }

  public async updateElevator(updateElevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      if (!await this.authRole.RoleCampus(updateElevatorDTO.token)) {
        return Result.fail<IElevatorDTO>("Unauthorized");
      }
      const elevator = await this.elevatorRepo.findByCode(updateElevatorDTO.code as string);

      updateElevatorDTO.building = updateElevatorDTO.code.substring(0, updateElevatorDTO.code.indexOf('-'));

      const floorsOrError = await this.getFloors(updateElevatorDTO.floors, updateElevatorDTO.building);


      if (floorsOrError.isFailure) {
        return Result.fail<IElevatorDTO>(floorsOrError.errorValue());
      }

      if (elevator === null) {
        return Result.fail<IElevatorDTO>("Elevator not found");

      } else {
        elevator.floors = floorsOrError.getValue();
        if (updateElevatorDTO.brand != null){
          elevator.brand = updateElevatorDTO.brand;
        }
        if (updateElevatorDTO.model != null) {
          elevator.model = updateElevatorDTO.model;
        }
        if (updateElevatorDTO.serialNumber != null) {
          elevator.serialNumber = updateElevatorDTO.serialNumber;
        }
        if (updateElevatorDTO.description != null) {
          elevator.description = updateElevatorDTO.description;
        }

        await this.elevatorRepo.update(elevator);
        const elevatorDTO = ElevatorMap.toDTO(elevator) as IElevatorDTO;
        return Result.ok<IElevatorDTO>(elevatorDTO);
      }
    } catch (e) {
      throw Result.fail<IElevatorDTO>('An unexpected error occurred');
    }
  }

  public async listByBuilding(query: string,token: string): Promise<Result<Array<IElevatorDTO>>> {
      try {
        if(!await this.authRole.RoleCampus(token)){
          return Result.fail<Array<IElevatorDTO>>("Unauthorized");
        }
        const elevatorList = [];

        const elevatorOrError = await this.elevatorRepo.findByBuildingId(query);

        if (elevatorOrError == null || elevatorOrError.length == 0) {
          return Result.fail<Array<IElevatorDTO>>('No Elevators found');
        } else {
          for (const elevator of elevatorOrError) {
            const elevators = ElevatorMap.toDTO(elevator);
            elevatorList.push(elevators);
          }

          return Result.ok<Array<IElevatorDTO>>(elevatorList);
        }
      } catch (e) {
          throw Result.fail<Array<IElevatorDTO>>('An unexpected error occurred');
      }

  }

  public async listAllElevators(token : string): Promise<Result<Array<IElevatorDTO>>> {
    try {
      if(!await this.authRole.RoleCampus(token)){
        return Result.fail<Array<IElevatorDTO>>("Unauthorized");
      }
      const elevatorOrError = await this.elevatorRepo.findAll();

      if (elevatorOrError == null) {
        return Result.fail<Array<IElevatorDTO>>('No Elevators found');
      } else {
        const elevatorDTO = elevatorOrError.map((elevator) => {
          return ElevatorMap.toDTO(elevator);
        });
        return Result.ok<Array<IElevatorDTO>>(elevatorDTO);
      }
    } catch (e) {
      throw Result.fail<Array<IElevatorDTO>>('An unexpected error occurred');
    }
  }

  private async getBuilding(building: string): Promise<Result<Building>> {

    const buildingOrError = await this.buildingRepo.findByCode(building);

    const found = !!buildingOrError;

    if (found) {
        return Result.ok<Building>(buildingOrError);
    } else {
        console.log('Building not found');
        return Result.fail<Building>('Building not found');
    }
  }

  private async getFloors(floors: Array<number>, building: string): Promise<Result<Array<Floor>>> {

    let floorsResult: Array<Floor> = [];

    if (await this.buildingRepo.findByCode(building) == null) {
      return Result.fail<Array<Floor>>('Building does not exist');
    } else {
      for (const floor of floors) {

        const floorsOrError = await this.floorRepo.findByNumberAndBuilding(floor, building);

        const found = !!floorsOrError;

        if (found) {
          floorsResult.push(floorsOrError);
        } else {
          console.log('floor ' + floorsOrError + ' does not exist');
          return Result.fail<Array<Floor>>('floor' + floorsOrError + ' does not exist');
        }
      }
    }

    return Result.ok<Array<Floor>>(floorsResult);
  }

  public async countElevators(): Promise<Result<number>> {
    try {
      const elevatorOrError =  await this.elevatorRepo.countElevators();

      return Result.ok<number>(elevatorOrError);

    } catch (e) {
      throw new Error("Error counting elevators");
    }
  }

  private async generateCode(building: string): Promise<string> {

    return building + "-E" /* + (await this.elevatorRepo.countElevators() + 1)*/;
  }

}
