using System.ComponentModel.DataAnnotations;

namespace server.Models.Reviews;

public class UpdateReviewDTO {
    [Range(0, 5, ErrorMessage = "Rating must be between 0 and 5.")]
    public float Rating { get; set; }

    [Required(ErrorMessage = "Comment is required.")]
    [StringLength(1000, ErrorMessage = "Comment cannot exceed 1000 characters.")]
    public string Comment { get; set; }
}