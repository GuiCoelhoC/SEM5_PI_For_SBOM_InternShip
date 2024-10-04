import { Repo } from "../../core/infra/Repo";
import { Passage } from "../../domain/passage";
import IPassageDTO from "../../dto/IPassageDTO";

export default interface IPassageRepo extends Repo<Passage> {
  save(passagem: Passage): Promise<Passage>;
  findAll(): Promise<Passage[]>;
  updatePassage(passagemDTO: IPassageDTO): Promise<Passage>;
    findByfloorBuilding(floor: number, building: string): Promise<Passage>;
    findByfloorBuilding2(floor: number, building: string): Promise<Passage>;
    findBy2Buildings(building1: string, building2: string): Promise<Passage[]>;
    countPassages(): Promise<number>;
    findByName(code: string): Promise<Passage>;
    findPassageByBuilding(building: string): Promise<Passage[]>;
}
