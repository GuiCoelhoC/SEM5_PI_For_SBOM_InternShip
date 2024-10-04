import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";

interface OrientdimensProps {
    id: string;
    x, y: number;
    orientacao: string;
}

export class Orientdimens extends ValueObject<OrientdimensProps> {
    get id (): string {
        return this.props.id;
    }
    
    get x (): number {
        return this.props.x;
    }

    get y (): number {
        return this.props.y;
    }

    get orientacao (): string {
        return this.props.orientacao;
    }

    private constructor (props: OrientdimensProps) {
        super(props);
    }

    public static create (id: string, x: number, y: number, orientacao: string): Result<Orientdimens> {
        orientacao = orientacao.toLowerCase();
        if (orientacao != "oeste" && orientacao != "norte"){
            return Result.fail<Orientdimens>("Orientação inválida");
        }
        if (x < 0 || y < 0) {
            return Result.fail<Orientdimens>("As coordenadas devem ser positivas");
        }

        return Result.ok<Orientdimens>(new Orientdimens({id: id, x : x, y : y, orientacao : orientacao }));
    }
}