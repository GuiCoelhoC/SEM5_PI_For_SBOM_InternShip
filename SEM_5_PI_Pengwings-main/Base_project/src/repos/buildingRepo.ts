import { Service, Inject } from 'typedi';

import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import { Building } from "../domain/building";
import { BuildingMap } from '../mappers/BuildingMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';
import { BuildingID } from '../domain/buildingID';

@Service()
export default class BuildingRepo implements IBuildingRepo {
    private models: any;

    constructor(
        @Inject('buildingSchema') private buildingSchema: Model<IBuildingPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(building: Building): Promise<boolean> {

        const idx = building.id instanceof Building ? (<BuildingID>building.id).id.toValue() : building.id;

        const query = { domainId: idx };
        const roleDocument = await this.buildingSchema.findOne(query as FilterQuery<IBuildingPersistence & Document>);

        return !!roleDocument === true;
    }

    public async save(building: Building): Promise<Building> {
        
        const code = building.code;
        const query = {code: code};

        const buildingDocument = await this.buildingSchema.findOne(query);
        
        try {
            if (buildingDocument == null) {
                console.log('== Building saving==');
                const rawBuilding: any = BuildingMap.toPersistence(building);

                const buildingCreated = await this.buildingSchema.create(rawBuilding);
                return BuildingMap.toDomain(buildingCreated);
            } else {
                console.log('== Building updating==');
                
                if (building.code != null) buildingDocument.code = building.code;
                if (building.name != null) buildingDocument.name = building.name;
                if (building.description != null) buildingDocument.description = building.description;
                if (building.widthMax != null) buildingDocument.widthMax = building.widthMax;
                if (building.lengthMax != null) buildingDocument.lengthMax = building.lengthMax;
                
                console.log(buildingDocument);
                await buildingDocument.save();

                return building;
            }
        } catch (err) {
            console.error(err);
        }
    }

    public async findByCode(buildingId: BuildingID | string): Promise<Building> {
        const query = { code: buildingId };
        const buildingRecord = await this.buildingSchema.findOne(query as FilterQuery<IBuildingPersistence & Document>);
        if (buildingRecord != null) {
            return BuildingMap.toDomain(buildingRecord);
        }
        
        return null;
    }

    public async findAll(): Promise<Building[]> {
        const querry = {};
        const edificosRecord = await this.buildingSchema.find(querry);
        if (edificosRecord != null) {
            const buildings = edificosRecord.map((building) => {
                return BuildingMap.toDomain(building);
            });
            return Promise.all(buildings); 
        }else{
            return null;
        }
    }

    public async contarBuildings(): Promise<number> {
        const querry = {};
        const edificosRecord = await this.buildingSchema.find(querry);
        if (edificosRecord != null) {
            return edificosRecord.length;
        }else{
            return null;
        }
    }
}
