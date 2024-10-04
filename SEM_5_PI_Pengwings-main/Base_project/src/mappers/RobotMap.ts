import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IRobotPersistence } from '../dataschema/IRobotPersistence';

import IRobotDTO from "../dto/IRobotDTO";
import { Robot } from "../domain/robot";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Container } from "typedi";

import RobotTypeRepo from "../repos/robotTypeRepo";

export class RobotMap extends Mapper<Robot> {

    public static toDTO( robot: Robot): IRobotDTO {
        return {
            id: robot.id.toString(),
            code: robot.code,
            name: robot.name,
            serial_number: robot.serial_number,
            description: robot.description,
            type: robot.type.type,
            active: robot.active
        } as IRobotDTO;
    }

    public static async toDomain(robot: any): Promise<Robot> {
        const repo = Container.get(RobotTypeRepo);
        const type = await repo.findByType(robot.type);

        const robotOrError = Robot.create(
            {
                code: robot.code,
                name: robot.name,
                serial_number: robot.serial_number,
                description: robot.description,
                type: type,
                active: robot.active
            }, new UniqueEntityID(robot.domainId)
        );

        robotOrError.isFailure ? console.log(robotOrError.error) : '';

        return robotOrError.isSuccess ? robotOrError.getValue() : null;

    }

    public static toPersistence(robot: Robot): any {
        return {
            domainId: robot.id.toString(),
            code: robot.code,
            name: robot.name,
            serial_number: robot.serial_number,
            description: robot.description,
            type: robot.type.type,
            active: robot.active
        }
    }
}
