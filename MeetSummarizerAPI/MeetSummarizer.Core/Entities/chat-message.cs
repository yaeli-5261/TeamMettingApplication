using System.ComponentModel.DataAnnotations;

namespace MeetSummarizer.Core.Models
{
    public class ChatMessage
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string UserName { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Message { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int TeamId { get; set; }
    }

    public class ChatMessageDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
        public int TeamId { get; set; }
    }

    public class SendMessageDto
    {
        [Required]
        [MaxLength(100)]
        public string UserName { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Message { get; set; }

        [Required]
        public int TeamId { get; set; }
    }
}
