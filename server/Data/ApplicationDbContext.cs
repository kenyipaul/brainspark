using Microsoft.EntityFrameworkCore;
using WebApiBackend.Models; // IMPORTANT: Ensure this matches your User model's namespace

namespace WebApiBackend.Data // IMPORTANT: Replace 'YourProjectName' with your actual project's namespace
{
    // ApplicationDbContext inherits from DbContext, which is the core of EF Core.
    public class ApplicationDbContext : DbContext
    {
        // Constructor that accepts DbContextOptions.
        // This allows you to configure the database provider (e.g., MySQL) and connection string.
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // DbSet<TEntity> represents a collection of all entities in the context,
        // or that can be queried from the database, of a given type.
        // This property will map to a 'Users' table in your MySQL database.
        public DbSet<User> Users { get; set; }

        // You can override OnModelCreating to configure your model further,
        // for example, to define more complex relationships, indexes, or default values.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Example: Ensure Username and Email are unique (optional but good practice)
            // modelBuilder.Entity<User>()
            //     .HasIndex(u => u.FirstName)
            //     .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}