using Microsoft.EntityFrameworkCore;
using WebApiBackend.Models;
using WebApiBackend.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
    {
        options.AddPolicy("MyCorsPolicy", builder => {
            builder.WithOrigins("http://localhost:5173", "https://your-frontend.com")
                   .WithMethods("GET", "POST","PUT", "DELETE")
                   .WithHeaders("Content-Type", "Authorization");
        });
    });

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

app.UseCors("MyCorsPolicy");
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
app.MapPost("/login", async (LoginRequest request, ApplicationDbContext dbContext) =>
{
    var user = await dbContext.Users.SingleOrDefaultAsync(u => u.Email == request.Email && u.Password == request.Password);
    if (user == null)
    {
        return Results.Unauthorized();
    }
    return Results.Ok(user);
});


// Add courses endpoints
app.MapGet("/courses", async (ApplicationDbContext dbContext) =>
{
    var courses = await dbContext.Courses.ToListAsync();
    return Results.Ok(courses);
});

app.MapGet("/courses/{id}", async (int id, ApplicationDbContext dbContext) =>
{
    var course = await dbContext.Courses.FindAsync(id);
    if (course == null)
    {
        return Results.NotFound("Course not found.");
    }
    return Results.Ok(course);
});

app.MapPost("/courses", async (Course course, ApplicationDbContext dbContext) =>
{
    // if (course == null)
    // {
    //     return Results.BadRequest("Course data is required.");
    // }

    dbContext.Courses.Add(course);
    try
    {
        await dbContext.SaveChangesAsync();
        return Results.Created($"/courses/{course.Id}", course);
    }
    catch (DbUpdateException ex)
    {
        app.Logger.LogError(ex, "Error adding new course to the database.");
        return Results.Problem("An error occurred while adding the course to the database.");
    }
});

app.MapPut("/courses/{id}", async (int id, Course updatedCourse, ApplicationDbContext dbContext) =>
{
    if (id != updatedCourse.Id)
    {
        return Results.BadRequest("Course ID mismatch.");
    }

    var existingCourse = await dbContext.Courses.FindAsync(id);
    if (existingCourse == null)
    {
        return Results.NotFound("Course not found.");
    }

    existingCourse.Name = updatedCourse.Name;
    existingCourse.Price = updatedCourse.Price;
    existingCourse.Description = updatedCourse.Description;
    existingCourse.ImageUrl = updatedCourse.ImageUrl;
    existingCourse.Link = updatedCourse.Link;

    try
    {
        await dbContext.SaveChangesAsync();
        return Results.Ok(existingCourse);
    }
    catch (DbUpdateException ex)
    {
        app.Logger.LogError(ex, "Error updating course with ID {Id}.", id);
        return Results.Problem("An error occurred while updating the course.");
    }
});

app.MapDelete("/courses/{id}", async (int id, ApplicationDbContext dbContext) =>
{
    var course = await dbContext.Courses.FindAsync(id);
    if (course == null)
    {
        return Results.NotFound("Course not found.");
    }

    dbContext.Courses.Remove(course);
    try
    {
        await dbContext.SaveChangesAsync();
        return Results.Ok("Deleted course successfully.");
    }
    catch (DbUpdateException ex)
    {
        app.Logger.LogError(ex, "Error deleting course with ID {Id}.", id);
        return Results.Problem("An error occurred while deleting the course.");
    }
});

// Subscribe to a course endpoint
app.MapPost("/courses/{courseId}/subscribe", async (CourseRequest request, ApplicationDbContext dbContext) =>
{
    var course = await dbContext.Courses.FindAsync(request.courseId);
    if (course == null)
    {
        return Results.NotFound("Course not found.");
    }
    var user = await dbContext.Users.FindAsync(request.userId);
    if (user == null)
    {
        return Results.NotFound("User not found.");
    }

    // Check if the user is already subscribed to the course
    if (course.Subscribers == null)
    {
        course.Subscribers = new List<int>();
    }
    if (course.Subscribers.Contains(request.userId))
    {
        return Results.BadRequest("You have already subscribed to this course.");
    }
    course.Subscribers.Add(request.userId);
    try
    {
        await dbContext.SaveChangesAsync();
        return Results.Ok(new { message = "User subscribed to course successfully.", success = true });
    }
    catch (DbUpdateException ex)
    {
        app.Logger.LogError(ex, "Error subscribing user with ID {UserId} to course with ID {CourseId}.", request.userId, request.courseId);
        return Results.Problem("An error occurred while subscribing the user to the course.");
    }
});

// GET all courses a user is enrolled in
app.MapGet("/courses/user/{userId}", async (int userId, ApplicationDbContext dbContext) =>
{
    // Query CourseEnrollments to find all enrollments for the given userId
    var enrolledCourses = await dbContext.Courses
        .Where(ce => ce.Id == userId)
        .Select(ce => ce.Subscribers) // Select the Course entity from the enrollment
        .ToListAsync();

    if (enrolledCourses == null || !enrolledCourses.Any())
    {
        return Results.NotFound("No courses found for this user.");
    }

    return Results.Ok(enrolledCourses);
});

app.Run();

public record SignupRequest(string FirstName, string LastName, string Email, string Password);

public class UpdatePasswordRequest
{
    public string? NewPassword { get; set; }
}

// login
public class LoginRequest
{
    public string? Email { get; set; }
    public string? Password { get; set; }
}

// courses
public class CourseRequest
{
    public int courseId { get; set; }
    public int userId { get; set; }
}

public class UserRequest {
    public int Id { get; set; }
};