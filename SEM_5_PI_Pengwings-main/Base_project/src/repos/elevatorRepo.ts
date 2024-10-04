import { Service, Inject } from 'typedi';
import {Document, FilterQuery, Model} from "mongoose";
import {IElevatorPersistence} from "../dataschema/IElevatorPersistence";
import {Elevator} from "../domain/elevator";
import {ElevatorID} from "../domain/elevatorID";
import {ElevatorMap} from "../mappers/ElevatorMap";
import IElevatorRepo from "../services/IRepos/IElevatorRepo";
import {Result} from "../core/logic/Result";

@Service()
export default class ElevatorRepo implements IElevatorRepo {
  private models: any;

  constructor(
    @Inject('elevatorSchema') private elevatorSchema: Model<IElevatorPersistence & Document>,
  ) {
  }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(elevator: Elevator): Promise<boolean> {

    const idx = elevator.id instanceof Elevator ? (<ElevatorID>elevator.id).id.toValue() : elevator.id;

    const query = {domainId: idx};
    const roleDocument = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);

    return !!roleDocument === true;
  }

  public async save(elevator: Elevator): Promise<Elevator> {
    const query = {domainId: elevator.id.toString()};
    const elevatorDocument = await this.elevatorSchema.findOne(query);

    try {
      if (elevatorDocument == null) {
        console.log('== Elevator Saving ==');
        const rawElevator: any = ElevatorMap.toPersistence(elevator);

        const elevatorCreated = await this.elevatorSchema.create(rawElevator);

        return ElevatorMap.toDomain(elevatorCreated);
      } else {
        console.log('== Elevator Updating ==');

        elevatorDocument.floors = elevator.floors.map(floor => floor.floorNumber);
        elevatorDocument.brand = elevator.brand;
        elevatorDocument.model = elevator.model;
        elevatorDocument.serialNumber = elevator.serialNumber;
        elevatorDocument.description = elevator.description;

        await elevatorDocument.save();

        return elevator;
      }
    } catch (err) {
      throw Result.fail<Elevator>('An unexpected error occurred');
    }
  }

  public async update(elevator: Elevator): Promise<Result<Elevator>> {
    try {
      const query = {code: elevator.code};
      const elevatorDocument = await this.elevatorSchema.findOne(query);

      if (elevatorDocument == null) {
        return Result.fail<Elevator>('Elevator not found');
      }

      if (elevator.floors.length != 0) {
        elevatorDocument.floors = elevator.floors.map(floor => floor.floorNumber);
      }

      if (elevator.brand != null) {
        elevatorDocument.brand = elevator.brand;
      }

      if (elevator.model != null) {
        elevatorDocument.model = elevator.model;
      } else if (elevator.brand != null && elevator.model == null) {
        return Result.fail<Elevator>('Model should not be empty when Brand is provided');
      }

      if (elevator.serialNumber != null) {
        elevatorDocument.serialNumber = elevator.serialNumber;
      }

      if (elevator.description != null) {
        elevatorDocument.description = elevator.description;
      }

      await elevatorDocument.save();

      const updatedElevator = await ElevatorMap.toDomain(elevatorDocument);

      return Result.ok<Elevator>(updatedElevator);
    } catch (err) {
      throw Result.fail<Elevator>(err);
    }
  }

  public async findByCode(code: string): Promise<Elevator> {
    const query = {code: code};
    const elevatorDocument = await this.elevatorSchema.findOne(query);

    if (elevatorDocument != null) {
      return ElevatorMap.toDomain(elevatorDocument);
    } else {
      return null;
    }

  }


  public async findByBuildingId(building: string): Promise<Elevator[]> {
      const query = { building: building };

      let elevatorDocument = await this.elevatorSchema.find(query);

      console.log(elevatorDocument);

      if (elevatorDocument != null) {
        const elevators = elevatorDocument.map((item) => {
            return ElevatorMap.toDomain(item);
        });

        return Promise.all(elevators);

      } else {
          return null;
      }
    }

    public async findAll(): Promise<Elevator[]> {
      let elevatorDocument = await this.elevatorSchema.find();

      if (elevatorDocument != null) {
          const elevatorArray = elevatorDocument.map((elevator) => {
              return ElevatorMap.toDomain(elevator);
          });

          return Promise.all(elevatorArray);
      } else {
          return null;
      }
  }

    public async countElevators(): Promise<number> {
        const query = {};
        const elevatorDocument = await this.elevatorSchema.find(query);

        if (elevatorDocument == null) {
            return 0;
        } else {
            return elevatorDocument.length;
        }
    }


}
