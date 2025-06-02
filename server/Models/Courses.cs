using System.ComponentModel.DataAnnotations;

namespace WebApiBackend.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        
        [Required]
        public int Price { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        public string? ImageUrl { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public string? Link { get; set; }
        
        [Required]
        public string? Roadmap { get; set; }
    }
}