import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { BuildingID } from "./buildingID";

import IBuildingDTO from "../dto/IBuildingDTO";

interface BuildingProps {
    code: string
    name: string;
    description: string;
    widthMax: number;
    lengthMax: number;
}

export class Building extends AggregateRoot<BuildingProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    private Building(){}

    get buildingID (): BuildingID {
        return BuildingID.caller(this.id);
    }

    get code (): string {
        return this.props.code;
    }

    set code (value: string) {
        this.props.code = value;
    }

    get name (): string {
        return this.props.name;
    }

    set name (value: string) {
        this.props.name = value;
    }

    get description (): string {
        return this.props.description;
    }

    set description (value: string) {
        this.props.description = value;
    }

    get widthMax (): number {
        return this.props.widthMax;
    }

    set widthMax (value: number) {
        this.props.widthMax = value;
    }

    get lengthMax (): number {
        return this.props.lengthMax;
    }

    set lengthMax (value: number) {
        this.props.lengthMax = value;
    }

    public static create (buildingDTO: IBuildingDTO, id?: UniqueEntityID): Result<Building> {
        const code = buildingDTO.code;
        const name = buildingDTO.name;
        const description = buildingDTO.description;
        const widthMax = buildingDTO.widthMax;
        const lengthMax = buildingDTO.lengthMax;
        
        if (!!code === false || code.length === 0 || code.length > 5) {
            return Result.fail<Building>("Codigo should not be empty or excede 5 caracters");
        } else if (!!name === false || name.length === 0 || name.length > 50) {
            return Result.fail<Building>("Name should not be empty or excede 50 caracters");
        }else if (!!widthMax === false ||  widthMax.valueOf() <= 3) {
            return Result.fail<Building>("Width should not be empty or be below 3 caracters");
        }else if (!!lengthMax === false || lengthMax.valueOf() <= 3) {
            return Result.fail<Building>("Length should not be empty or be below 3 caracters");
        } else {
            const building = new Building({code: String (code), name: String (name), description: String (description), widthMax: Number (widthMax), lengthMax: Number (lengthMax) }, id);
            return Result.ok<Building>(building);
        }
    }

}