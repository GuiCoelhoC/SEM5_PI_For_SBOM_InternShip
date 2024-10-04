import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */

  //databaseURL: process.env.MONGODB_URI || "mongodb://vsgate-s1.dei.isep.ipp.pt:10329/",
  databaseURL: process.env.MONGODB_URI || "mongodb://mongoadmin:8b4b47cf15a2e92f6773410f@vs520.dei.isep.ipp.pt:27017/admin",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjad$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    building: {
      name: "BuildingController",
      path: "../controllers/buildingController"
    },
    floor: {
      name: "floorController",
      path: "../controllers/floorController"
    },
    elevator: {
      name: "ElevatorController",
      path: "../controllers/elevatorController"
    },
    robot: {
      name: "RobotController",
      path: "../controllers/robotController"
    },
    robotType: {
      name: "RobotTypeController",
      path: "../controllers/robotTypeController"
    },
    room: {
      name: "RoomController",
      path: "../controllers/roomController"
    },
    passagem: {
      name: "PassageController",
      path: "../controllers/passageController"
    }
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    building: {
      name: "BuildingRepo",
      path: "../repos/buildingRepo"
    },
    floor: {
      name: "floorRepo",
      path: "../repos/floorRepo"
    },
    elevator: {
      name: "ElevatorRepo",
      path: "../repos/elevatorRepo"
    },
    robot: {
      name: "RobotRepo",
      path: "../repos/robotRepo"
    },
    robotType: {
      name: "robotTyperRepo",
      path: "../repos/robotTypeRepo"
    },
    room: {
      name: "RoomRepo",
      path: "../repos/roomRepo"
    },
    passagem: {
      name: "PassagemRepo",
      path: "../repos/passageRepo"
    }
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    building: {
      name: "BuildingService",
      path: "../services/buildingService"
    },
    floor: {
      name: "floorService",
      path: "../services/floorService"
    },
    elevator: {
      name: "ElevatorService",
      path: "../services/elevatorService"
    },
    robot: {
      name: "RobotService",
      path: "../services/robotService"
    },
    robotType: {
      name: "RobotTypeService",
      path: "../services/robotTypeService"
    },
    room: {
      name: "RoomService",
      path: "../services/roomService"
    },
    passagem: {
      name: "PassagemService",
      path: "../services/passageService"
    }
  },

  auth: {
    AuthRole: {
      name: "AuthRole",
      path: "../AuthRole/AuthRole"
    }
  },
};
