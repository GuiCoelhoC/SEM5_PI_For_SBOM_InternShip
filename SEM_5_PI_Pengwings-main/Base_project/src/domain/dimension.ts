import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";

interface DimensionProps {
    y1, x1, y2, x2: number;
}

export class Dimension extends ValueObject<DimensionProps> {
    get y1 (): number {
        return this.props.y1;
    }

    get x1 (): number {
        return this.props.x1;
    }

    get y2 (): number {
        return this.props.y2;
    }

    get x2 (): number {
        return this.props.x2;
    }

    private constructor (props: DimensionProps) {
        super(props);
    }

    public static create (y1: number, x1: number, y2: number, x2: number): Result<Dimension> {
        if (y1 < 0 || x1 < 0 || y2 < y1 || x2 < x1 ) {
            return Result.fail<Dimension>("As coordenadas devem ser positivas");
        }

        return Result.ok<Dimension>(new Dimension({ y1 : y1, x1 : x1, y2 : y2, x2 : x2 }));
    }
}