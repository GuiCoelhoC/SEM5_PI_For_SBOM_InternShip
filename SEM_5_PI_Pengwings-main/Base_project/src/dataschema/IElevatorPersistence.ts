import {Building} from "../domain/building";
import {floor} from "../domain/floor";

export interface IElevatorPersistence {
  domainId: string;
  code: string;
  building: string;
  floors: Array<number>;
  brand: string;
  model: string;
  serialNumber: string;
  description: string;
}
