import {AggregateRoot} from '../core/domain/AggregateRoot';
import {UniqueEntityID} from '../core/domain/UniqueEntityID';

import {Result} from '../core/logic/Result';

import {Floor} from './floor';
import {Building} from "./building";

interface PassageProps {
    code: string;// identificador da passagem criado pelo utilizador
    floor1: Floor;
    floor2: Floor;
    building1: Building;
    building2: Building;
}


export class Passage extends AggregateRoot<PassageProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get code(): string {
        return this.props.code;
    }

    set name(value: string) {
        this.props.code = value;
    }


    get floor1(): Floor {
        return this.props.floor1;
    }

    set floor1(value: Floor) {
        this.props.floor1 = value;
    }

    get floor2(): Floor {
        return this.props.floor2;
    }

    set floor2(value: Floor) {
        this.props.floor2 = value;
    }

    get building1(): Building {
        return this.props.building1;
    }

    set building1(value: Building) {
        this.props.building1 = value;
    }

    get building2(): Building {
        return this.props.building2;
    }

    set building2(value: Building) {
        this.props.building2 = value;
    }

    private constructor(props: PassageProps, id?: UniqueEntityID) {
        super(props, id);
    }


    public static create(props: PassageProps, id?: UniqueEntityID): Result<Passage> {
        const code = props.code;
        const floor1 = props.floor1;
        const floor2 = props.floor2;
        const building1 = props.building1;
        const building2 = props.building2;

        const passage = new Passage({ code: String(code), floor1, floor2, building1, building2 }, id);

        return Result.ok<Passage>(passage);
    }
}
