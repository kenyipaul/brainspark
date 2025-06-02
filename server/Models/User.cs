using System.ComponentModel.DataAnnotations;

namespace WebApiBackend.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string? FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string? LastName { get; set; }

        [Required]
        [MaxLength(255)]
        public string? Email { get; set; }

        [Required]
        [MaxLength(255)]
        public string? Password { get; set; }

        public string? Role { get; set; } = "User" ; // Default role is User
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    }
}