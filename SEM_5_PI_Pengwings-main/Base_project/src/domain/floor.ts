import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { Building } from "./building";
import { floorID } from "./floorID";

interface floorProps {
    floorNumber: number;
    description: string;

    width: number;
    length: number;
    map: Array<Array<number>>;

    building: Building;
}

export class Floor extends AggregateRoot<floorProps>{
    get id (): UniqueEntityID {
        return this._id;
    }

    private Floor(){}

    get floorID (): floorID {
        return floorID.caller(this.id);
    }

    get floorNumber (): number {
        return this.props.floorNumber;
    }

    set floorNumber (value: number) {
        this.props.floorNumber = value;
    }

    get width (): number {
        return this.props.width;
    }

    set width (value: number) {
        this.props.width = value;
    }

    get length (): number {
        return this.props.length;
    }

    set length (value: number) {
        this.props.length = value;
    }

    get description (): string {
        return this.props.description;
    }

    set description (value: string) {
        this.props.description = value;
    }

    get map (): Array<Array<number>> {
        return this.props.map;
    }

    set map (value: Array<Array<number>>) {
        this.props.map = value;
    }

    get building (): Building {
        return this.props.building;
    }

    set building (value: Building) {
        this.props.building = value;
    }

    private constructor (props: floorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (props: floorProps, id?: UniqueEntityID): Result<Floor> {
        if (props.width < 2 || props.width>props.building.widthMax.valueOf() || props.length < 2 || props.length > props.building.lengthMax.valueOf()) {
            return Result.fail<Floor>('floor dimensions cannot be less than 2');
        }
        const floorNumber = props.floorNumber;
        const description = props.description;
        const width = props.width;
        const length = props.length;
        const building = props.building;
        let map;
        /* if dto map is empty, create a new map.
        0: no walls, 1: west wall, 2: north wall, 3: west and north wall
        Example:
        width = 3, length = 9 (needs to add 1 to each dimension because we can only create north and west walls)
        map = [
            [3, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 0]

        */
        if (props.map == undefined) { // if map is empty, create a new map
            console.log("Creating new map");
            map = new Array<Array<number>>();
            for (let y = 0; y <= width; y++) {
                map[y] = new Array<number>();
                for (let x = 0; x <= length; x++) {
                    if (x == 0 && y == 0) {
                        map[y][x] = 3;
                    } else if (x == length && y == width) {
                        map[y][x] = 0;
                    } else if (x == length || (x == 0 && y != width)) {
                        map[y][x] = 1;
                    } else if (y == width || (y == 0 && x != length)) {
                        map[y][x] = 2;
                    } else {
                        map[y][x] = 0;
                    }
                }
            }
            console.log('length: ', length, '; width: ', width, '\n', map);
        } else {
            map = props.map;
        }



        if (!!floorNumber === false) {
            return Result.fail<Floor>('Must provide a floor name')
        } else if (description.length > 250) {
            return Result.fail<Floor>('floor description cannot be greater than 250 characters')
        } else {

            const floor = new Floor({ floorNumber: floorNumber, description: description, map : map, width : width, length : length, building: building}, id);
            return Result.ok<Floor>( floor )
        }
    }
}
