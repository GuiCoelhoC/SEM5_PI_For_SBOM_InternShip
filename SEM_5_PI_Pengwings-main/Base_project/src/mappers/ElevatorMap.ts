import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';

import IElevatorDTO from "../dto/IElevatorDTO";
import { Elevator } from "../domain/elevator";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import {Container} from "typedi";
import BuildingRepo from "../repos/buildingRepo";
import floorRepo from "../repos/floorRepo";
import {Floor} from "../domain/floor";
import {map} from "lodash";

export class ElevatorMap extends Mapper<Elevator> {

  public static toDTO(elevator: Elevator): IElevatorDTO {
    return {
      id: elevator.id.toString(),
      code: elevator.code,
      building: elevator.building.code,
      floors: elevator.floors.map((floor) => floor.floorNumber),
      brand: elevator.brand,
      model: elevator.model,
      serialNumber: elevator.serialNumber,
      description: elevator.description
    };
  }

  public static async toDomain(elevator: any | Model<IElevatorPersistence & Document>): Promise<Elevator> {
    const repo = Container.get(BuildingRepo);
    const repofloor = Container.get(floorRepo);

    const building = await repo.findByCode(elevator.building);
    const floors : Floor[] = [];


    for (let i = 0; i < elevator.floors.length; i++) {
      const floor = await repofloor.findByNumberAndBuilding(elevator.floors[i], building.code);
      floors.push(floor);
    }

    const elevatorOrError = Elevator.create({
        code: elevator.code,
        building: building,
        floors: floors,
        brand: elevator.brand,
        model: elevator.model,
        serialNumber: elevator.serialNumber,
        description: elevator.description
      }, new UniqueEntityID(elevator.domainId)
    );

    elevatorOrError.isFailure ? console.log(elevatorOrError.error) : '';

    return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;

  }

  public static toPersistence(elevator: Elevator): any {
    return {
      domainId: elevator.id.toString(),
      code: elevator.code,
      building: elevator.building.code.toString(),
      floors: elevator.floors.map(floor => floor.floorNumber),
      brand: elevator.brand,
      model: elevator.model,
      serialNumber: elevator.serialNumber,
      description: elevator.description
    }
  }
}
