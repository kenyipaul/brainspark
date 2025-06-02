using Microsoft.EntityFrameworkCore;
using WebApiBackend.Models;
using WebApiBackend.Data;

var builder = WebApplication.CreateBuilder(args);


var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString,
        ServerVersion.AutoDetect(connectionString), // Automatically detect MySQL server version
        mySqlOptions => mySqlOptions.EnableRetryOnFailure()) // Optional: Enable retry on failure
);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// http://localhost:5112/signup
app.MapPost("/signup", async (SignupRequest request, ApplicationDbContext dbContext) =>
{
    System.Console.WriteLine(request.FirstName);
    System.Console.WriteLine(request.LastName);
    System.Console.WriteLine(request.Email);
    System.Console.WriteLine(request.Password);

    var newUser = new User
    {
        FirstName = request.FirstName, // Assuming Username is used as FirstName
        LastName = request.LastName, // Assuming Username is used as LastName
        Email = request.Email,
        Password = request.Password // Ensure Password is hashed in a real application
    };

    try
    {
        dbContext.Users.Add(newUser);
        await dbContext.SaveChangesAsync();
        app.Logger.LogInformation("New user added to the database: {FirstName}", newUser.FirstName);
        return Results.Created($"/users/{newUser.Id}", newUser);
    }
    catch (DbUpdateException ex)
    {
        app.Logger.LogError(ex, "Error adding new user to the database.");
        return Results.Problem("An error occurred while adding the user to the database.");
    }
});

app.MapGet("/users", async (ApplicationDbContext dbContext) =>
{
    var users = await dbContext.Users.ToListAsync();
    Console.WriteLine(users);
    return Results.Ok(users);
});

app.MapGet("/users/{id}", async (int id, ApplicationDbContext dbContext) =>
{
    var user = await dbContext.Users.FindAsync(id);
    if (user == null)
    {
        return Results.NotFound("User not found.");
    }
    return Results.Ok(user);
});


app.MapPut("/users/{id}", async (int id, User updatedUser, ApplicationDbContext dbContext) =>
{
    // if (id != updatedUser.Id)
    // {
    //     return Results.BadRequest("User ID mismatch.");
    // }

    var existingUser = await dbContext.Users.FindAsync(id);
    if (existingUser == null)
    {
        return Results.NotFound("User not found.");
    }

    existingUser.FirstName = updatedUser.FirstName;
    existingUser.LastName = updatedUser.LastName;
    existingUser.Email = updatedUser.Email;

    try
    {
        await dbContext.SaveChangesAsync();
        return Results.Ok(existingUser);
    }
    catch (DbUpdateException ex)
    {
        app.Logger.LogError(ex, "Error updating user with ID {Id}.", id);
        return Results.Problem("An error occurred while updating the user.");
    }
});

// Update password endpoint
app.MapPut("/users/{id}/password", async (int id, UpdatePasswordRequest request, ApplicationDbContext dbContext) =>
{
    var user = await dbContext.Users.FindAsync(id);
    Console.WriteLine(request.NewPassword);
    if (user == null)
    {
        return Results.NotFound("User not found.");
    }

    user.Password = request.NewPassword; // Ensure to hash the password in a real application

    try
    {
        await dbContext.SaveChangesAsync();
        return Results.Ok("Password updated successfully.");
    }
    catch (DbUpdateException ex)
    {
        app.Logger.LogError(ex, "Error updating password for user with ID {Id}.", id);
        return Results.Problem("An error occurred while updating the password.");
    }
});


app.MapDelete("/users/{id}", async (int id, ApplicationDbContext dbContext) =>
{
    var user = await dbContext.Users.FindAsync(id);
    if (user == null)
    {
        return Results.NotFound("User not found.");
    }

    dbContext.Users.Remove(user);
    try
    {
        await dbContext.SaveChangesAsync();
        return Results.Ok("Deleted user successfully.");
    }
    catch (DbUpdateException ex)
    {
        app.Logger.LogError(ex, "Error deleting user with ID {Id}.", id);
        return Results.Problem("An error occurred while deleting the user.");
    }
});

// Login endpoint
app.MapPost("/login", async (string email, string password, ApplicationDbContext dbContext) =>
{
    var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
    if (user == null)
    {
        return Results.Unauthorized();
    }
    return Results.Ok(user);
});


app.Run();

public record SignupRequest(string FirstName, string LastName, string Email, string Password);

public class UpdatePasswordRequest
{
    public string? NewPassword { get; set; }
}