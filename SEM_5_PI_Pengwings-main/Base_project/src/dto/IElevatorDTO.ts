export default interface IElevatorDTO {
  id: string;
  code: string;
  building: string;
  floors: number[];
  brand: string;
  model: string;
  serialNumber: string;
  description: string;
  token?: string;

}
