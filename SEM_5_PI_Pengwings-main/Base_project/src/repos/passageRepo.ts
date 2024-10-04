import {Service, Inject} from "typedi";

import IPassageRepo from "../services/IRepos/IPassageRepo";
import {Passage} from "../domain/passage";
import {Document, FilterQuery, Model} from "mongoose";
import {IPassagePersistence} from "../dataschema/IPassagePersistence";
import {PassageMap} from "../mappers/passageMap";
import IPassageDTO from "../dto/IPassageDTO";

@Service()

export default class PassageRepo implements IPassageRepo {
    private models: any;
    constructor(
        @Inject("passageSchema") private passageSchema: Model<IPassagePersistence & Document>,
    ) {}

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(passage: Passage): Promise<boolean> {
        const passageId = passage.id.toString();
        const query = {domainId: passageId};
        const passageDocument = await this.passageSchema.findOne(query as FilterQuery<IPassagePersistence & Document>);

        return !!passageDocument === true;
    }

    public async save(passage: Passage): Promise<Passage> {
        console.log('== Passage Saving ==');
        const query = {domainId: passage.id.toString()};

        const passageDocument = await this.passageSchema.findOne(query);

        try {
            if (passageDocument == null) {
                const rawPassage: any = PassageMap.toPersistence(passage);

                const passageCreated = await this.passageSchema.create(rawPassage);

                return PassageMap.toDomain(passageCreated);
            } else {
                passageDocument.code = passage.code;

                await passageDocument.save();

                return passage;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findAll(): Promise<Passage[]> {
        const passageDocument = await this.passageSchema.find();
        if(passageDocument != null) {
            const passagesArray = passageDocument.map((passage) => {
                return PassageMap.toDomain(passage)
            });
            return Promise.all(passagesArray);
        }else{
            return null;
        }
    }

    public async updatePassage(passageDTO: IPassageDTO): Promise<Passage> {
        try {

            const query: FilterQuery<IPassagePersistence> = {code: passageDTO.code};

            const passageDocument = await this.passageSchema.findOne(query as FilterQuery<IPassagePersistence & Document>);

            if (passageDocument == null) {
                return null;
            } else {

                passageDocument.code = passageDTO.code;
                passageDocument.floor1Id = passageDTO.floor1Id;
                passageDocument.floor2Id = passageDTO.floor2Id;
                passageDocument.building1Id = passageDTO.building1Id;
                passageDocument.building2Id = passageDTO.building2Id;

                await passageDocument.save();
                console.log("Alo " + passageDocument);
                return PassageMap.toDomain(passageDocument);

            }
        }catch (err) {
            throw err;
        }
    }

    public async countPassages(): Promise<number>{
      const query = {};
      const passagemDocument = await this.passageSchema.find(query);

      if (passagemDocument != null) {
        return passagemDocument.length;
      }else{
        return null;
      }
    }

    // Procurar passagem atraves do numero do floor e building

    public async findByfloorBuilding(floor: number, building: string): Promise<Passage> {
        const query = {floor1Id: floor, building1Id: building};
        const passagemDocument = await this.passageSchema.findOne(query as FilterQuery<IPassagePersistence & Document>);
        if(passagemDocument == null){
            return null;
        }
        return PassageMap.toDomain(passagemDocument);
    }

    public async findPassageByBuilding(building: string): Promise<Passage[]> {
        const query = {building1Id: building};
        const passagemDocument = await this.passageSchema.find(query as FilterQuery<IPassagePersistence & Document>);
        if(passagemDocument == null){
            return null;
        }
        const passagensArray = passagemDocument.map((passagem) => {
            return PassageMap.toDomain(passagem)
        });
        return Promise.all(passagensArray);
    }

    // Procurar passagem atraves do numero do floor e building para 2 floors e buildings

    public async findByfloorBuilding2(floor: number, building: string): Promise<Passage> {
        const query = { floor2Id: floor, building2Id: building};
        const passageDocument = await this.passageSchema.findOne(query as FilterQuery<IPassagePersistence & Document>);

        if(passageDocument == null){
            return null;
        }
        return PassageMap.toDomain(passageDocument);
    }

    // Procurar atraves de 2 buildings

    public async findBy2Buildings(building1Id: string, building2Id: string): Promise<Passage[]> {
        //console.log(building1Id);
        const query = { building1Id: building1Id, building2Id: building2Id};
        const passageDocument = await this.passageSchema.find(query);
        if(passageDocument != null) {
            const passagensArray = passageDocument.map((passagem) => {
                return PassageMap.toDomain(passagem)
            });
            console.log(passagensArray);
            return Promise.all(passagensArray);
        }else{
            return null;
        }

    }

    public async findByName(code: string): Promise<Passage> {
        const query = {code: code};
        const passageDocument = await this.passageSchema.findOne(query as FilterQuery<IPassagePersistence & Document>);
        if(passageDocument == null){
            return null;
        }
        return PassageMap.toDomain(passageDocument);
    }


}
