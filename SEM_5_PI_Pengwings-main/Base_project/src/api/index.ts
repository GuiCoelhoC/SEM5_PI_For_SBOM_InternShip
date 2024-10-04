import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import building from './routes/buildingRoute';
import floor from './routes/floorRoute';
import salas from './routes/roomRoute';

import passages from './routes/passageRoute';
import robot from './routes/robotRoute'

import elevator from './routes/elevatorRoute';
import RobotType from './routes/robotTypeRoute';


export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	floor(app);
	building(app);
  elevator(app);
  robot(app);
  passages(app);
	RobotType(app);
	salas(app);


	return app
}
