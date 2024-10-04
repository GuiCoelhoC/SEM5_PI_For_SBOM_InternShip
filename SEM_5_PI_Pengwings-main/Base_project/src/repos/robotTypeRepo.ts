import { Service, Inject } from 'typedi';

import IRobotTypeRepo from '../services/IRepos/IRobotTypeRepo';
import { RobotType } from '../domain/robotType';
import { RobotTypeID } from '../domain/robotTypeID';
import { RobotTypeMap } from '../mappers/RobotTypeMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IRobotTypePersistence } from '../dataschema/IRobotTypePersistence';
import {Floor} from "../domain/floor";
import {floorMap} from "../mappers/FloorMap";

@Service()
export default class RobotTypeRepo implements IRobotTypeRepo {

    private models: any;

    constructor(
        @Inject('robotTypeSchema') private robotTypeSchema: Model<IRobotTypePersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(robotType: RobotType): Promise<boolean> {

            const idx = robotType.id instanceof RobotType ? (<RobotTypeID>robotType.id).toValue : robotType.id;

            const query = { domainId: idx };
            const robotTypeDocument = await this.robotTypeSchema.findOne(query as FilterQuery<IRobotTypePersistence & Document>);

            return !!robotTypeDocument === true;
    }

    public async save(robotType: RobotType): Promise<RobotType> {
        console.log('== RobotType Saving ==');

        const query = { domainId: robotType.id.toString() };

        const robotTypeDocument = await this.robotTypeSchema.findOne(query);

        try {
            if (robotTypeDocument == null) {
                const rawRobotType: any = RobotTypeMap.toPersistence(robotType);

                const robotTypeCreated = await this.robotTypeSchema.create(rawRobotType);

                return RobotTypeMap.toDomain(robotTypeCreated);
            } else {
                robotTypeDocument.type = robotType.type;
                robotTypeDocument.brand = robotType.brand;
                robotTypeDocument.model = robotType.model;
                robotTypeDocument.tasks = robotType.tasks;

                await robotTypeDocument.save();

                return robotType;
            }
        } catch (err) {
            throw err;
        }
    }

  public async findAll(): Promise<RobotType[]> {
    let robotTypeDocument = await this.robotTypeSchema.find();

    if (robotTypeDocument != null) {
      const robotTypeArray = robotTypeDocument.map((robotType) => {
        return RobotTypeMap.toDomain(robotType);
      });

      return Promise.all(robotTypeArray);
    } else {
      return null;
    }
  }

    public async findByType(type: string): Promise<RobotType> {
        const query = { type: type };

        const robotTypeDocument = await this.robotTypeSchema.findOne(query as FilterQuery<IRobotTypePersistence & Document>);

        if (robotTypeDocument != null){
            return RobotTypeMap.toDomain(robotTypeDocument);
        }else{
            return null;
        }
    }

    public async countRobotType(): Promise<number> {
        const query = {};

        const robotTypeDocument = await this.robotTypeSchema.find(query);

        if (robotTypeDocument != null){
            return robotTypeDocument.length;
        }else{
            return 0;
        }
    }
}
