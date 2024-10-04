export default interface IUpdateFloorDTO {
  oldFloorNumber: number;
  floorNumber: number;
  description: string;
  building: string;
  token?: string;
}
