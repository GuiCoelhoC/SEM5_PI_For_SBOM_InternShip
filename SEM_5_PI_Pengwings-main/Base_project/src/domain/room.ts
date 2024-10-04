import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";

import { RoomID } from "./roomID";
import { Dimension } from "./dimension";

import IRoomDTO from "../dto/IRoomDTO";
import { Door } from "./door";

interface RoomProps {
    name: string;
    floor: number;
    building: string;
    description: string;
    roomtype: string;
}

enum TipoDeRoom {
    Gabinete = "Gabinete",
    Laboratorio = "Laboratorio",
    Anfiteatro = "Anfiteatro",
    Outro = "Outro"
}

export class Room extends AggregateRoot<RoomProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    private constructor(props: RoomProps, id?: UniqueEntityID) {
        super(props, id);
    }

    private Room() { }

    get salaID(): RoomID {
        return RoomID.caller(this.id);
    }

    get floor(): number {
        return this.props.floor;
    }

    set floor(value: number) {
        this.props.floor = value;
    }

    get building(): string {
        return this.props.building;
    }

    set building(value: string) {
        this.props.building = value;
    }

    get name(): string {
        return this.props.name;
    }

    set name(value: string) {
        this.props.name = value;
    }

    get description(): string {
        return this.props.description;
    }

    set description(value: string) {
        this.props.description = value;
    }

    get roomtype(): string {
        return this.props.roomtype;
    }

    set roomtype(value: string) {
        this.props.roomtype = value;
    }

    public static create(salaDTO: IRoomDTO, id?: UniqueEntityID): Result<Room> {
        const name = salaDTO.name;
        const floor = salaDTO.floor;
        const building = salaDTO.building;
        const description = salaDTO.description;
        const roomtype = salaDTO.roomtype;

        if (roomtype == undefined) {
            return Result.fail<Room>("O tipo de sala não é válido");
        }

        return Result.ok<Room>(new Room({ name: name, floor: floor, building: building, description: description, roomtype: roomtype}, id));
    }
}