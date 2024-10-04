import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { RobotID } from "./robotID";

import IRobotDTO from "../dto/IRobotDTO";
import { RobotType } from "./robotType";

interface RoboProps {
  code: string;
  name: string;
  serial_number: string;
  description: string;
  type: RobotType;
  active?: boolean;
}

export class Robot extends AggregateRoot<RoboProps> {

    get id (): UniqueEntityID {
        return this._id;
    }

    private Robot(){}

    get robotId (): RobotID {
        return RobotID.caller(this.id);
    }

    get code (): string {
        return this.props.code;
    }

    set code ( value: string) {
        this.props.code = value;
    }

    get name (): string {
        return this.props.name;
    }

    set name ( value: string) {
        this.props.name = value;
    }

    get serial_number (): string {
        return this.props.serial_number;
    }

    set serial_number ( value: string) {
        this.props.serial_number = value;
    }

    get description (): string {
        return this.props.description;
    }

    set description ( value: string) {
        this.props.description = value;
    }

    get type (): RobotType {
        return this.props.type;
    }

    set type ( value: RobotType) {
        this.props.type = value;
    }

    get active (): boolean {
        return this.props.active;
    }

    set active ( value: boolean) {
        this.props.active = value;
    }

    public deactivate (): void {
      this.active = false;
    }

    private constructor (props: RoboProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (props: RoboProps, id?: UniqueEntityID): Result<Robot> {
        const code = props.code;
        const name = props.name;
        const serial_number = props.serial_number;
        const description = props.description;
        const type = props.type;
        const active = props.active;



        if ((!!code === false || code.length>30) ||
            (!!name == false || name.length>30) ||
            (!!serial_number == false || serial_number.length>50) ||
            (description.length>250)) {
            return Result.fail<Robot>('Os argumentos introduzidos estão inválidos para a criação de um robo.')
        } else {
            const robot = new Robot({ code: code, name: name, serial_number: serial_number, description: description, type: type, active: active }, id);
            return Result.ok<Robot>( robot );
        }
    }
}
