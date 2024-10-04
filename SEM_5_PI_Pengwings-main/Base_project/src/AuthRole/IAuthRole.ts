

export default interface IAuthRole {
    RoleAdmin(token: string): Promise<boolean>;
    RoleFleet(token: string): Promise<boolean>;
    RoleTask(token: string): Promise<boolean>;
    RoleCampus(token: string): Promise<boolean>;
}
