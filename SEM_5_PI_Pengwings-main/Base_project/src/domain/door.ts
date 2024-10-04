import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";

interface DoorProps {
    x, y: number;
}

export class Door extends ValueObject<DoorProps> {
    get x (): number {
        return this.props.x;
    }

    get y (): number {
        return this.props.y;
    }

    private constructor (props: DoorProps) {
        super(props);
    }

    public static create (x: number, y: number): Result<Door> {
        if (x < 0 || y < 0) {
            return Result.fail<Door>("As coordenadas devem ser positivas");
        }

        return Result.ok<Door>(new Door({ x : x, y : y }));
    }
}