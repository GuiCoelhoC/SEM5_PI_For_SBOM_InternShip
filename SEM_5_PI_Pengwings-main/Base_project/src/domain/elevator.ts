import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { ElevatorID } from "./elevatorID";

import IElevatorDTO from "../dto/IElevatorDTO";
import {Building} from "./building";
import {Floor} from "./floor";

interface ElevatorProps {
  code: string;
  building: Building;
  floors: Floor[];
  brand: string;
  model: string;
  serialNumber: string;
  description: string;
}

export class Elevator extends  AggregateRoot<ElevatorProps>{

  get id (): UniqueEntityID {
    return this._id;
  }

  private Elevator(){}


  get elevatorID (): ElevatorID {
    return ElevatorID.caller(this.id);
  }

  get code (): string {
    return this.props.code;
  }

  get building (): Building {
    return this.props.building;
  }

  get floors (): Array<Floor> {
    return this.props.floors;
  }

  set floors (value: Array<Floor>) {
    this.props.floors = value;
  }

  get brand (): string {
    return this.props.brand;
  }

  set brand (value: string) {
    this.props.brand = value;
  }

  get model (): string {
    return this.props.model;
  }

  set model (value: string) {
    this.props.model = value;
  }

  get serialNumber (): string {
    return this.props.serialNumber;
  }

  set serialNumber (value: string) {
    this.props.serialNumber = value;
  }

  get description (): string {
    return this.props.description;
  }

  set description (value: string) {
    this.props.description = value;
  }

    public static create (elevatorProps: ElevatorProps, id?: UniqueEntityID): Result<Elevator> {
      const code = elevatorProps.code;
      const building = elevatorProps.building;
      const floors = elevatorProps.floors;
      const brand = elevatorProps.brand;
      const model = elevatorProps.model;
      const serialNumber = elevatorProps.serialNumber;

      const description = elevatorProps.description;
      if (!!code === false) {
        return Result.fail<Elevator>("Code should not be empty");
      } else if (!!building === false) {
        return Result.fail<Elevator>("Building should not be empty");
      } else if (!!floors === false) {
        return Result.fail<Elevator>("floors should not be empty");
      } else if (!!brand === true && !!model === false) {
        return Result.fail<Elevator>("Model should not be empty when Marca is provided");
      } else if (brand.length > 50) {
        return Result.fail<Elevator>("Brand should not have more than 50 characters");
      } else if (model.length > 50) {
        return Result.fail<Elevator>("Model should not have more than 50 characters");
      } else if (serialNumber.length > 50) {
        return Result.fail<Elevator>("Serial Number should not have more than 50 characters");
      } else if (description.length > 250) {
        return Result.fail<Elevator>("Description should not have more than 250 characters");

      } else {

        const elevator = new Elevator({
          code: code,
          building: building,
          floors: floors,
          brand: brand,
          model: model,
          serialNumber: serialNumber,
          description: description
        }, id);
        return Result.ok<Elevator>(elevator);
      }
    }
}
