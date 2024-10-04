
import { Mapper} from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPassagePersistence } from '../dataschema/IPassagePersistence';

import IPassageDTO from "../dto/IPassageDTO";
import { Passage } from "../domain/passage";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import {Container} from "typedi";
import PassageRepo from "../repos/passageRepo";
import BuildingRepo from "../repos/buildingRepo";
import floorRepo from "../repos/floorRepo";

export class PassageMap extends Mapper<Passage> {
    public static toDTO(passage: Passage): IPassageDTO {
        return {
            id: passage.id.toString(),
            code: passage.code,
            floor1Id: passage.floor1.floorNumber,
            floor2Id: passage.floor2.floorNumber,
            building1Id: passage.building1.code.toString(),
            building2Id: passage.building2.code.toString(),
        };
    }

    public static async toDomain(passage: any | Model<IPassagePersistence & Document>): Promise<Passage> {
        const repo = Container.get(BuildingRepo);
        const repo2 = Container.get(floorRepo);
        const building1 = await repo.findByCode(passage.building1Id);
        const building2 = await repo.findByCode(passage.building2Id);
        const floor1 = await repo2.findByNumberAndBuilding(passage.floor1Id, building1.code);
        const floor2 = await repo2.findByNumberAndBuilding(passage.floor2Id, building2.code);
        const passagemOrError = Passage.create(
            {
                code: passage.code,
                floor1: floor1,
                floor2: floor2,
                building1: building1,
                building2: building2,
            },
            new UniqueEntityID(passage.domainId)
        );

        passagemOrError.isFailure ? console.log(passagemOrError.error) : '';

        return passagemOrError.isSuccess ? passagemOrError.getValue() : null;
    }

    public static toPersistence(passage: Passage): any {
        return {
            domainId: passage.id.toString(),
            code: passage.code,
            floor1Id : passage.floor1.floorNumber,
            floor2Id : passage.floor2.floorNumber,
            building1Id : passage.building1.code,
            building2Id : passage.building2.code,
        }
    }
}
