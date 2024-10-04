namespace DroneAPI.Domain.Roles
{

    public class CreatingRoleDto
    {
        public string Name { get; set; }
        public CreatingRoleDto(string name, string description)
        {
            this.Name = name;
        }
    }
}
