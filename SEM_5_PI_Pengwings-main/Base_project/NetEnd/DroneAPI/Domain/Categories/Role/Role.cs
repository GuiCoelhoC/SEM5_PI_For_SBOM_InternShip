using System;
using DroneAPI.Domain.Shared;

namespace DroneAPI.Domain.Roles
{

    public class Role : Entity<RoleId>, IAggregateRoot
    {
     
        public string Name{ get; private set; }

        private Role()
        {
        }

        public Role(string Name)
        {
            this.Id = new RoleId(Guid.NewGuid());
            this.Name = Name;
        }
    }
}