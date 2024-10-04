import { Service, Inject } from "typedi";

import IRobotRepo from "../services/IRepos/IRobotRepo";
import { Robot } from "../domain/robot";
import { RobotID } from "../domain/robotID";
import { RobotMap } from "../mappers/RobotMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IRobotPersistence } from "../dataschema/IRobotPersistence";

@Service()
export default class RobotRepo implements IRobotRepo {

    private models: any;

    constructor(
        @Inject('robotSchema') private robotSchema: Model<IRobotPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(robot: Robot): Promise<boolean> {

        const idx = robot.id instanceof Robot ? (<RobotID>robot.id).id.toValue : robot.id;

        const query = { domainId: idx };
        const roleDocument = await this.robotSchema.findOne(query as FilterQuery<IRobotPersistence & Document>);

        return !!roleDocument === true;
    }

    public async save(robot: Robot): Promise<Robot> {
        console.log('== Robot Saving ==');

        const query = { code: robot.code };

        const robotDocument = await this.robotSchema.findOne(query);

        try {
            if (robotDocument == null) {
                const rawRobot: any = RobotMap.toPersistence(robot);

                const roboCreated = await this.robotSchema.create(rawRobot);

                return RobotMap.toDomain(roboCreated);
            } else {
                robotDocument.code = robot.code;
                robotDocument.name = robot.name;
                robotDocument.serial_number = robot.serial_number;
                robotDocument.description = robot.description;

                await robotDocument.save();

                return robot;
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    public async findByCode(code: string): Promise<Robot> {
        const querry = { code: code };
        const robotDocument = await this.robotSchema.findOne(querry);
        console.log(robotDocument.code);
        if (robotDocument != null) {
            return RobotMap.toDomain(robotDocument);
        } else {
            return null;
        }
    }

    public async update(robot: Robot): Promise<Robot> {
        const query = { code: robot.code };

        const robotDocument = await this.robotSchema.findOne(query);

        if (robotDocument != null) {
            robotDocument.code = robot.code;
            robotDocument.name = robot.name;
            robotDocument.serial_number = robot.serial_number;
            robotDocument.description = robot.description;
            robotDocument.type = robot.type.type;
            robotDocument.active = robot.active;

            await robotDocument.save();

            return robot;
        }else{
            return null;
        }
    }

    public async findAll(): Promise<Array<Robot>> {
        let robotDocument = await this.robotSchema.find();

        if (robotDocument != null) {
            const robotList = robotDocument.map((robot) => {
              return RobotMap.toDomain(robot)
            });

            return Promise.all(robotList);
        } else {
            return null;
        }
    }

    public async findActive(): Promise<Array<Robot>> {
      const querry = {active: true};

      const robotDocument = await this.robotSchema.find(querry);
      if (robotDocument != null) {
        const robotList = robotDocument.map((robot) => {
          return RobotMap.toDomain(robot)
        });

        return Promise.all(robotList);
      } else {
        return null;
      }
    }

  public async countRobot(): Promise<number> {
        let robotDocument = await this.robotSchema.find();

        if (robotDocument != null) {
            return robotDocument.length;
        } else {
            return 0;
        }
    }
}
