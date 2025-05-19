using MeetSummarizer.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data;

public class DataContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Meeting> Meetings { get; set; }
    public DbSet<Team> Teams { get; set; }


    public DataContext(DbContextOptions<DataContext> options) : base(options) { }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Role>().HasData(
            new Role
            {
                Id = 1,
                RoleName = "Admin",
                Description = "System Administrator",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Role
            {
                Id = 2,
                RoleName = "TeamHeader",
                Description = "System TeamHeadetor",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Role
            {
                Id = 3,
                RoleName = "Developmen",
                Description = "System Developmen",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        );

        modelBuilder.Entity<Team>().HasData(
            new Team
            {
                Id = 1,
                Name = "administration"
            },
            new Team
            {
                Id = 2,
                Name = "develops"
            }
        );
    }

}