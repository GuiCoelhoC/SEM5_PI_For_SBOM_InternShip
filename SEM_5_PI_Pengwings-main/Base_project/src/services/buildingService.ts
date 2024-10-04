import { Service, Inject } from 'typedi';
import config from "../../config";
import IBuildingDTO from '../dto/IBuildingDTO';
import { Building } from "../domain/building";
import IBuildingRepo from './IRepos/IBuildingRepo';
import IBuildingService from './IServices/IBuildingService';
import { Result } from "../core/logic/Result";
import { BuildingMap } from "../mappers/BuildingMap";
import IFloorRepo from "./IRepos/IFloorRepo";
import IAuthRole from "../AuthRole/IAuthRole";

@Service()
export default class BuildingService implements IBuildingService {
    constructor(
        @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo,
        @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
        @Inject(config.auth.AuthRole.name) private authRole : IAuthRole
    ) {}

    public async createBuilding(buildingdto: IBuildingDTO): Promise<Result<IBuildingDTO>> {
        try{
            if (!await this.authRole.RoleCampus(buildingdto.token)) {
              return Result.fail<IBuildingDTO>("Unauthorized");
            }
            const buildingExists = await this.buildingRepo.findByCode(buildingdto.code.toString());
            if (buildingExists !== null) {
                return Result.fail<IBuildingDTO>("Building already exists");
            }

            const buildingOrError = await Building.create(buildingdto);
            if (buildingOrError.isFailure) {
                return Result.fail<IBuildingDTO>(buildingOrError.errorValue());
            }
            const buildingResult = buildingOrError.getValue();
            await this.buildingRepo.save(buildingResult);
            const buildingDTOResult = BuildingMap.toDTO(buildingResult) as IBuildingDTO;

            return Result.ok<IBuildingDTO>(buildingDTOResult);

        } catch (e) {
            throw e;
        }
    }

    public async updateBuilding(updateBuildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
        try{
            if (!await this.authRole.RoleCampus(updateBuildingDTO.token)) {
              return Result.fail<IBuildingDTO>("Unauthorized");
            }
            const building = await this.buildingRepo.findByCode(updateBuildingDTO.code.toString());
            if (building === null) {
                return Result.fail<IBuildingDTO>("Building not found");
            }//if dto.name is not empty/null, don't update it
            if (updateBuildingDTO.name !== null) {
                building.name = updateBuildingDTO.name;
            }
            if (updateBuildingDTO.description !== null) {
                building.description = updateBuildingDTO.description;
            }
            if (updateBuildingDTO.widthMax !== null) {
                building.widthMax = updateBuildingDTO.widthMax;
            }
            if (updateBuildingDTO.lengthMax !== null) {
                building.lengthMax = updateBuildingDTO.lengthMax;
            }
            await this.buildingRepo.save(building);
            const buildingDTO = BuildingMap.toDTO(building) as IBuildingDTO;
            return Result.ok<IBuildingDTO>(buildingDTO);
        } catch (e) {
            console.error(e);
        }
    }



    public async listBuildings(token: string): Promise<Result<Array<IBuildingDTO>>> {
        try{
            if (!await this.authRole.RoleCampus(token)) {
              return Result.fail<Array<IBuildingDTO>>("Unauthorized");
            }
            const buildings = await this.buildingRepo.findAll();
            if (buildings === null) {
                return Result.fail<Array<IBuildingDTO>>("No buildings found");
            } else {
                const buildingsDTO = buildings.map((building) => {
                    return BuildingMap.toDTO(building) as IBuildingDTO;
                });
                return Result.ok<Array<IBuildingDTO>>(buildingsDTO);
            }
        } catch (e) {
            console.error(e);
        }
    }

  public async listMinMax(min: number, max: number,token : string): Promise<Result<IBuildingDTO[]>> {
    try {
      if (!await this.authRole.RoleCampus(token)) {
        return Result.fail<IBuildingDTO[]>("Unauthorized");
      }
      const buildings = [];
      const buildingOrError = await this.buildingRepo.findAll();
      if (buildingOrError == null) {
        return Result.fail<IBuildingDTO[]>('No buildings found');
      } else {
        console.log('olá');
        for (let i = 0; i < buildingOrError.length; i++) {
          const floors = await this.floorRepo.findAllByBuilding(buildingOrError[i].code);
          if (floors.length >= min && floors.length <= max) {
            const building = BuildingMap.toDTO(buildingOrError[i]);
            buildings.push(building);
          }
        }

        return Result.ok<IBuildingDTO[]>(buildings);
      }
    } catch (e) {
      return Result.fail<IBuildingDTO[]>('An unexpected error has occurred');
    }
  }

    public async contarBuildings(): Promise<Result<number>> {
        try{
            const buildings = await this.buildingRepo.findAll();
            if (buildings === null) {
                return Result.fail<number>("No buildings found");
            } else {
                return Result.ok<number>(buildings.length);
            }
        } catch (e) {
            console.error(e);
        }
    }
}
