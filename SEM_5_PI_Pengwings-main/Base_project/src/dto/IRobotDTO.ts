
export default interface IRobotDTO {
    id: string;
    code: string;
    name: string;
    serial_number: string;
    description: string;
    type: string;
    active: boolean;
    token?: string;
}
