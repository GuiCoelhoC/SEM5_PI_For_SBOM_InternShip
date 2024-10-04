export default interface IfloorDTO {
    id: string;
    floorNumber: number;
    description: string;
    width: number;
    length: number;
    map: Array<Array<number>>;
    building: string;
    token?: string;
}
