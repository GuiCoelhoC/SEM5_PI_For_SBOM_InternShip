import { IDimensionDTO } from "./IDimensionDTO";
import IDoorDTO from "./IDoorDTO";

export default interface IRoomDTO {
    id: string;
    floor: number;
    building: string;
    name: string;
    description: string;
    roomtype: string;
    token?: string;
}

/* To create using json:
{
    "floor": 6,
    "building": "A2344",
    "name": "sala1",
    "description": "sala1",
    "roomtype": "Gabinete",
    "dimensions": {
        "x1": 0,
        "y1": 0,
        "x2": 1,
        "y2": 1
    },
    "door": {
        "x": 0,
        "y": 2
    }
}
*/
