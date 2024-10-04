import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';
import mongoose from 'mongoose';

import config from '../../config';
import elevatorSchema from "../persistence/schemas/elevatorSchema";

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  // schemas
  mongoose.set('strictQuery',true);

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const buildingSchema = {
    // compare with the approach followed in repos and services
    name: 'buildingSchema',
    schema: '../persistence/schemas/buildingSchema',
  };

  const floorSchema = {
    // compare with the approach followed in repos and services
    name: 'floorSchema',
    schema: '../persistence/schemas/floorSchema',
  };

  const elevatorSchema = {
    // compare with the approach followed in repos and services
    name: 'elevatorSchema',
    schema: '../persistence/schemas/elevatorSchema',
  };

  const robotSchema = {
    // compare with the approach followed in repos and services
    name: 'robotSchema',
    schema: '../persistence/schemas/robotSchema',
  };

  const robotTypeSchema = {
    // compare with the approach followed in repos and services
    name: 'robotTypeSchema',
    schema: '../persistence/schemas/robotTypeSchema',
  };

  const roomSchema = {
    // compare with the approach followed in repos and services
    name: 'roomSchema',
    schema: '../persistence/schemas/roomSchema',
  };

  const mapaSchema = {
    // compare with the approach followed in repos and services
    name: 'mapaSchema',
    schema: '../persistence/schemas/mapaSchema',
  };

  const passagemSchema = {
    // compare with the approach followed in repos and services
    name: 'passageSchema',
    schema: '../persistence/schemas/passageSchema',
  }

  // controllers

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const buildingController = {
    name: config.controllers.building.name,
    path: config.controllers.building.path
  }

  const floorController = {
    name: config.controllers.floor.name,
    path: config.controllers.floor.path
  }

  const elevatorController = {
    name: config.controllers.elevator.name,
    path: config.controllers.elevator.path
  }

  const robotController = {
    name: config.controllers.robot.name,
    path: config.controllers.robot.path
  }

  const robotTypeController = {
    name: config.controllers.robotType.name,
    path: config.controllers.robotType.path
  }

  const roomController = {
    name: config.controllers.room.name,
    path: config.controllers.room.path
  }

  const passagemController = {
    name: config.controllers.passagem.name,
    path: config.controllers.passagem.path
  }
  // repos

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const buildingRepo = {
    name: config.repos.building.name,
    path: config.repos.building.path
  }

  const floorRepo = {
    name: config.repos.floor.name,
    path: config.repos.floor.path
  }

  const elevatorRepo = {
    name: config.repos.elevator.name,
    path: config.repos.elevator.path
  }

  const robotRepo = {
    name: config.repos.robot.name,
    path: config.repos.robot.path
  }

  const robotTypeRepo = {
    name: config.repos.robotType.name,
    path: config.repos.robotType.path
  }

  const roomRepo = {
    name: config.repos.room.name,
    path: config.repos.room.path
  }

  const passagemRepo = {
    name: config.repos.passagem.name,
    path: config.repos.passagem.path
  }

  // services

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const buildingService = {
    name: config.services.building.name,
    path: config.services.building.path
  }

  const floorService = {
    name: config.services.floor.name,
    path: config.services.floor.path
  }

  const elevatorService = {
    name: config.services.elevator.name,
    path: config.services.elevator.path
  }

  const robotService = {
    name: config.services.robot.name,
    path: config.services.robot.path
  }

  const robotTypeService = {
    name: config.services.robotType.name,
    path: config.services.robotType.path
  }

  const roomService = {
    name: config.services.room.name,
    path: config.services.room.path
  }

  const passagemService = {
    name: config.services.passagem.name,
    path: config.services.passagem.path
  }

  const authRole ={
    name: config.auth.AuthRole.name,
    path: config.auth.AuthRole.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      buildingSchema,
      floorSchema,
      elevatorSchema,
      robotSchema,
      passagemSchema,
      robotTypeSchema,
      roomSchema
    ],
    controllers: [
      roleController,
      buildingController,
      floorController,
      elevatorController,
      robotController,
      passagemController,
      robotTypeController,
      roomController
    ],
    repos: [
      roleRepo,
      userRepo,
      buildingRepo,
      floorRepo,
      elevatorRepo,
      robotRepo,
      passagemRepo,
      robotTypeRepo,
      roomRepo
    ],
    services: [
      roleService,
      buildingService,
      floorService,
      elevatorService,
      robotService,
      passagemService,
      robotTypeService,
      roomService
    ],
    auth: [
      authRole
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
