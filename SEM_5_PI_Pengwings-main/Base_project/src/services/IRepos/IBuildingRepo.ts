import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/building";
import { BuildingID } from "../../domain/buildingID";

export default interface IBuildingRepo extends Repo<Building> {
    //save building with optional old_name parameter
    save (building: Building): Promise<Building>;
    findByCode (buildingId: BuildingID | string): Promise<Building>;
    findAll () : Promise<Building[]>;
    contarBuildings(): Promise<number>;
    //update(building: Building): Promise<Building>;
}