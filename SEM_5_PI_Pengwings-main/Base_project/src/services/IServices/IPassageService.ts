import {Result} from "../../core/logic/Result";
import IPassageDTO from "../../dto/IPassageDTO";

export default interface IPassageService {
    createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>>;
    countPassages(): Promise<Result<number>>;
    updatePassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>>;
    listPassagesBetweenBuildings(building1Id: string, building2Id: string, token: string): Promise<Result<IPassageDTO[]>>;
    listAllPassages(token : string): Promise<Result<IPassageDTO[]>>;
}
