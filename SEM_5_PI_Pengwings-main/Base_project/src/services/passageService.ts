import {Service, Inject, Container} from "typedi";
import config from "../../config";
import IPassageDTO from "../dto/IPassageDTO";
import { Passage } from "../domain/passage";
//import IBuildingService from "./IServices/IMapaService";
import { Result } from "../core/logic/Result";
import { PassageMap } from "../mappers/passageMap";
import IPassageService from "./IServices/IPassageService";
import IPassageRepo from "./IRepos/IPassageRepo";
import IFloorRepo from "./IRepos/IFloorRepo";
import PassageRepo from "../repos/passageRepo";
import floorRepo from "../repos/floorRepo";
import passagemSchema from "../persistence/schemas/passageSchema";
import {Building} from "../domain/building";
import IBuildingRepo from "./IRepos/IBuildingRepo";
import {Floor} from "../domain/floor";
import IAuthRole from "../AuthRole/IAuthRole";

Container.set("passagemSchema", passagemSchema);
@Service()
export default class PassageService implements IPassageService {

  constructor(
      @Inject(() => PassageRepo) private passageRepo: IPassageRepo,
      @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
      @Inject(() => floorRepo) private floorRepo: IFloorRepo,
      @Inject(config.auth.AuthRole.name) private authRole : IAuthRole
  ) {
  }


  public async createPassage(PassageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
    try {
      if(!await this.authRole.RoleCampus(PassageDTO.token)){
        return Result.fail<IPassageDTO>('Unauthorized');
      }
      console.log("PassageService: createPassage");

      const passageExists = await this.validatepassageName(PassageDTO.code);
      if (passageExists) {
        return Result.fail<IPassageDTO>('Passage already exists verified by code');
        // verificar se passage existe atraves do name
      }
      let building1: Building;
      let building2: Building;
      let floor1: Floor;
      let floor2: Floor;
      const building1OrError = await this.getBuilding(PassageDTO.building1Id);
      const building2OrError = await this.getBuilding(PassageDTO.building2Id);
      const floor1OrError = await this.getfloor(PassageDTO.floor1Id, PassageDTO.building1Id);
      const floor2OrError = await this.getfloor(PassageDTO.floor2Id, PassageDTO.building2Id);
      if (building1OrError.isFailure || building2OrError.isFailure) {
        return Result.fail('Building not found');
      } else {


        building1 = building1OrError.getValue();
        building2 = building2OrError.getValue();
        if (floor1OrError.isFailure || floor2OrError.isFailure) {
          console.log('floor1 ' + floor1OrError.errorValue());
          console.log('floor2 ' + floor2OrError.errorValue());
          return Result.fail('floor not found - Service');
        }else{
          floor1 = floor1OrError.getValue();
          floor2 = floor2OrError.getValue();
        }
      }
      const passage = await this.validatePassage(PassageDTO.floor1Id, PassageDTO.floor2Id, building1, building2);

      if (passage != null) {
        return Result.fail<IPassageDTO>('Passage already exists verified by floor and building');
      }

      const passagemOrError = await Passage.create({
        code: PassageDTO.code,
        floor1: floor1,
        floor2: floor2,
        building1: building1,
        building2: building2,
      });
      const passagemResult = passagemOrError.getValue();

      const passagemResultOrError = await this.passageRepo.save(passagemResult);


      return Result.ok<IPassageDTO>(PassageDTO);

    } catch (e) {
      throw e;
    }

  }

  public async countPassages(): Promise<Result<number>>{
    try {
      const passagemOrError = await this.passageRepo.countPassages();

      return Result.ok<number>(passagemOrError);

    } catch (e) {
      throw e;
    }
  }

  public async updatePassage( passagemDTO:IPassageDTO): Promise<Result<IPassageDTO>>{
      try {
        if(!await this.authRole.RoleCampus(passagemDTO.token)){
          return Result.fail<IPassageDTO>('Unauthorized');
        }
          console.log("PassageService: updatePassage2");
             const passagemOrError = await this.getPassageByCode(passagemDTO.code);
             //(console.log(passagemOrError);
        let building1: Building;
        let building2: Building;

                if (passagemOrError == null) {
                    return Result.fail<IPassageDTO>('Passagem not found by name');
                }else{
                  const building1OrError = await this.getBuilding(passagemDTO.building1Id);
                  const building2OrError = await this.getBuilding(passagemDTO.building2Id);
                  building1 = building1OrError.getValue();
                  building2 = building2OrError.getValue();
                  /*const passagem = await this.validatePassage(passagemDTO.floor1Id, passagemDTO.floor2Id, building1, building2);

                  if (passagem != null) {
                    return Result.fail<IPassageDTO>('Cannot update to a already existing passagem');
                  }else {*/
                    //const passagemEntreBuildings = await this.passageRepo.findBy2Buildings(passagemDTO.building1Id, passagemDTO.building2Id);
                    /*if(passagemEntreBuildings.length == 1) {
                      return Result.fail<IPassageDTO>('Cannot update to a already existing passagem');
                    }else {*/
                      const passagemUpdate = await this.passageRepo.updatePassage(passagemDTO);
                      const passagemDTOResult = PassageMap.toDTO(passagemUpdate) as IPassageDTO;

                      return Result.ok<IPassageDTO>(passagemDTOResult);
                    //}
                  //}
                }
      }catch (e) {
          throw e;
      }
  }

  private async getPassageByCode(code: string): Promise<Result<Passage>> {
      const passagem = await this.passageRepo.findByName(code);
      const found = !!passagem;

      if (found) {
        return Result.ok<Passage>(passagem);
      } else {
        return Result.fail<Passage>('Passagem not found');
      }
  }

  private async getBuilding(code: string): Promise<Result<Building>> {

    const building = await this.buildingRepo.findByCode(code);
    const found = !!building;

    if (found) {
      return Result.ok<Building>(building);
    } else {
      return Result.fail<Building>('Building1 not found');
    }
  }

  public async listPassagesBetweenBuildings(building1Id:string, building2Id:string,token: string): Promise<Result<IPassageDTO[]>> {
      try {
        if(!await this.authRole.RoleCampus(token)){
          return Result.fail<IPassageDTO[]>('Unauthorized');
        }
          console.log(building1Id,building2Id);
          const passagensOrError = await this.passageRepo.findBy2Buildings(building1Id, building2Id);
          const passagensEntreBuildings = [];
          console.log(passagensOrError);
          if (passagensOrError == null){
              return Result.fail<IPassageDTO[]>('Passagens not found');
          }else {
              for (let i = 0; i < passagensOrError.length; i++) {
                  passagensEntreBuildings.push(passagensOrError[i]);
              }
          }
          const passagensDTO = passagensEntreBuildings.map((passagem) => {
              return PassageMap.toDTO(passagem);
          });
            return Result.ok<IPassageDTO[]>(passagensDTO);
      }catch (e) {
            throw e;
      }
  }

  public async listAllPassages(token : string): Promise<Result<IPassageDTO[]>> {
      try {
        if(!await this.authRole.RoleCampus(token)){
          return Result.fail<IPassageDTO[]>('Unauthorized');
        }
          const passagensOrError = await this.passageRepo.findAll();

          if (passagensOrError == null){
              return Result.fail<IPassageDTO[]>('Passagens not found');
          }else{
          const passagensDTO = passagensOrError.map((passagem) => {
              return PassageMap.toDTO(passagem);
          });
          return Result.ok<IPassageDTO[]>(passagensDTO);
        }
      }catch (e) {
          throw e;
      }
    }

    private async getfloor(numero: number, building: string): Promise<Result<Floor>> {
        console.log(numero, building);
        const floor = await this.floorRepo.findByNumberAndBuilding(numero, building);
        const found = !!floor;

        if (found) {

        return Result.ok<Floor>(floor);
        } else {
        return Result.fail<Floor>('floor not found');
        }
    }



    private async validatePassage(floor1: number, floor2: number, building1: Building, building2: Building): Promise<Passage> {
        const passageOrError = await this.passageRepo.findByfloorBuilding(floor1, building1.code);
        const passageOrError2 = await this.passageRepo.findByfloorBuilding2(floor2, building2.code);
        if (passageOrError != null || passageOrError2 != null) {
            return passageOrError;
        } else {
            return null;
        }
    }

    private async validatepassageName(name: string) {
      const passages = await this.passageRepo.findByName(name);
      if (passages != null) {
        return true;
      } else {
        return false;
      }



    }
}
