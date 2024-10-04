using Microsoft.EntityFrameworkCore;
using DroneAPI.Domain.Users;
using DroneAPI.Domain.Roles;
using DroneAPI.Domain.Assignments;
using DroneAPI.Infrastructure.Users;
using DroneAPI.Infrastructure.Roles;
using DroneAPI.Infrastructure.Assignments;

namespace DroneAPI.Infrastructure
{
    public class DroneAPIDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Assignment> Assignments { get; set; }

        public DroneAPIDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoleEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new AssignmentEntityTypeConfiguration());
        }
    }
}