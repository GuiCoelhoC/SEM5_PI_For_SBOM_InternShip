import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { RobotTypeID } from "./robotTypeID";

import IRobotTypeDTO from "../dto/IRobotTypeDTO";

interface robotTypeProps {
    type: string;
    brand: string;
    model: string;
    tasks: string[];
}

export class RobotType extends AggregateRoot<robotTypeProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get robotTypeId (): RobotTypeID {
        return new RobotTypeID(this.id.toValue());
    }

    get type (): string {
        return this.props.type;
    }

    set type ( value: string) {
        this.props.type = value;
    }

    get brand (): string {
        return this.props.brand;
    }

    set brand ( value: string) {
        this.props.brand = value;
    }

    get model (): string {
        return this.props.model;
    }

    set model ( value: string) {
        this.props.model = value;
    }

    get tasks (): string[] {
        return this.props.tasks;
    }

    set tasks ( value: string[]) {
        this.props.tasks = value;
    }

    private constructor (props: robotTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (robotTypeDTO: IRobotTypeDTO, id?: UniqueEntityID): Result<RobotType> {
        const type = robotTypeDTO.type
        const brand = robotTypeDTO.brand;
        const model = robotTypeDTO.model;
        const tasks = robotTypeDTO.tasks;

        if (!!type === false || type.length>25) {
            return Result.fail<RobotType>('Type has to have a maximum of 25 characters and cannot be null')
        }
        if(!!brand == false || brand.length>50) {
            return Result.fail<RobotType>('Brand has to have a maximum of 50 characters and cannot be null')
        }
        if (!!model == false || model.length>100){
            return Result.fail<RobotType>('Model has to have a maximum of 100 characters and cannot be null')
        }
        if (tasks.length == 0) {
          return Result.fail<RobotType>('Tasks cannot be empty')
        }else {
            const robotType = new RobotType({ type: type, brand: brand, model: model, tasks: tasks }, id);
            return Result.ok<RobotType>( robotType );
        }
    }
}
