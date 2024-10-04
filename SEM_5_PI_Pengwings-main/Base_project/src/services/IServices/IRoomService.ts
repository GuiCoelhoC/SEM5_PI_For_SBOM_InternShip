import { Result } from "../../core/logic/Result";
import IRoomDTO from "../../dto/IRoomDTO";

export default interface IRoomService {
    createRoom(salaDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
    getRooms(): Promise<Result<Array<IRoomDTO>>>;
    contarRooms(): Promise<Result<Number>>;
}
