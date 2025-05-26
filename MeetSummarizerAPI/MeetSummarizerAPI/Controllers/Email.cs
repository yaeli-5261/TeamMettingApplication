//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Authorization;
//using System;
//using System.Net;
//using System.Net.Mail;
//using System.Threading.Tasks;

//namespace MeetingManager.API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    [Authorize]
//    public class EmailController : ControllerBase
//    {
//        private readonly IConfiguration _configuration;
//        private readonly ILogger<EmailController> _logger;

//        public EmailController(IConfiguration configuration, ILogger<EmailController> logger)
//        {
//            _configuration = configuration;
//            _logger = logger;
//        }

//        [HttpPost("Send")]
//        public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
//        {
//            try
//            {
//                _logger.LogInformation($"Attempting to send email to {request.To}");

//                // Get SMTP settings from configuration
//                var smtpServer = _configuration["Email:SmtpServer"];
//                var smtpPort = int.Parse(_configuration["Email:SmtpPort"]);
//                var smtpUsername = _configuration["Email:Username"];
//                var smtpPassword = _configuration["Email:Password"];
//                var senderEmail = _configuration["Email:SenderEmail"];
//                var senderName = _configuration["Email:SenderName"];

//                // Validate configuration
//                if (string.IsNullOrEmpty(smtpServer) || string.IsNullOrEmpty(smtpUsername) ||
//                    string.IsNullOrEmpty(smtpPassword) || string.IsNullOrEmpty(senderEmail))
//                {
//                    _logger.LogError("Email configuration is incomplete");
//                    return StatusCode(500, new { success = false, message = "Email service is not properly configured" });
//                }

//                // Create mail message
//                var mailMessage = new MailMessage
//                {
//                    From = new MailAddress(senderEmail, senderName ?? "Meeting Manager"),
//                    Subject = request.Subject,
//                    Body = request.Body,
//                    IsBodyHtml = request.IsHtml
//                };

//                mailMessage.To.Add(request.To);

//                // Configure SMTP client
//                var smtpClient = new SmtpClient(smtpServer)
//                {
//                    Port = smtpPort,
//                    Credentials = new NetworkCredential(smtpUsername, smtpPassword),
//                    EnableSsl = true
//                };

//                // Send email
//                await smtpClient.SendMailAsync(mailMessage);

//                _logger.LogInformation($"Email sent successfully to {request.To}");
//                return Ok(new { success = true, message = "Email sent successfully" });
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex, $"Failed to send email: {ex.Message}");
//                return StatusCode(500, new { success = false, message = $"Failed to send email: {ex.Message}" });
//            }
//        }
//    }

//    public class EmailRequest
//    {
//        public string To { get; set; }
//        public string Subject { get; set; }
//        public string Body { get; set; }
//        public bool IsHtml { get; set; } = false;
//    }
//}



using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using MeetSummarizer.Core.DTOs;
using MeetSummarizer.Core.Interfaces;

namespace MeetSummarizer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        public EmailController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        [HttpPost("send-to-user/{userId}")]
        public async Task<ActionResult> SendEmailToUser(int userId, [FromBody] EmailRequestDTO emailRequest)
        {
            try
            {
                // Get user details
                var user = await _userService.GetUserById(userId);
                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                if (string.IsNullOrWhiteSpace(user.Email))
                {
                    return BadRequest(new { message = "User email is missing or empty" });
                }

                // Email configuration
                var smtpHost = _configuration["EmailSettings:SmtpHost"];
                var smtpPort = int.Parse(_configuration["EmailSettings:SmtpPort"]);
                var senderEmail = _configuration["EmailSettings:SenderEmail"];
                var senderPassword = _configuration["EmailSettings:SenderPassword"];
                var senderName = _configuration["EmailSettings:SenderName"];

                using (var client = new SmtpClient(smtpHost, smtpPort))
                {
                    client.EnableSsl = true;
                    client.Credentials = new NetworkCredential(senderEmail, senderPassword);

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(senderEmail, senderName),
                        Subject = emailRequest.Subject,
                        Body = emailRequest.Body,
                        IsBodyHtml = true
                    };

                    mailMessage.To.Add(user.Email);

                    await client.SendMailAsync(mailMessage);
                }

                return Ok(new { message = "Email sent successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Failed to send email", error = ex.Message });
            }
        }
    }

    public class EmailRequestDTO
    {
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}
