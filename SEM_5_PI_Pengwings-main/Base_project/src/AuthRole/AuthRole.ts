import IAuthRole from "./IAuthRole";
import AuthRoleDriver from "./AuthRoleDriver";
import {Service} from "typedi";

@Service()
export default class AuthRole implements IAuthRole{

  constructor(private driver: AuthRoleDriver) {
  }
  async RoleAdmin(token: string): Promise<boolean> {
    let role = await this.driver.getRequestRole(token);
    if (role === "Administrator") {
      return Promise.resolve(true);
    }else {
      return Promise.resolve(false);
    }
  }

  async RoleCampus(token: string): Promise<boolean> {
    let role = await this.driver.getRequestRole(token);
    if (role === "Campus Manager") {
      return Promise.resolve(true);
    }else {
      return Promise.resolve(false);
    }
  }

  async RoleFleet(token: string): Promise<boolean> {
    let role = await this.driver.getRequestRole(token);
    if (role === "Fleet Manager") {
      return Promise.resolve(true);
    }else {
      return Promise.resolve(false);
    }
  }

  async RoleTask(token: string): Promise<boolean> {
    let role = await this.driver.getRequestRole(token);
    if (role === "Task Manager") {
      return Promise.resolve(true);
    }else {
      return Promise.resolve(false);
    }
  }

}
