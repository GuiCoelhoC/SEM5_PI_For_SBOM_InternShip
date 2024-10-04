export interface IfloorPersistence {
    domainId: string;
    floorNumber: number;
    description: string;
    width: number;
    length: number;
    map: Array<Array<number>>;
    building: string;
}
