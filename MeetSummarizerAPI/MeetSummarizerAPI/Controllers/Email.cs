
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
                //var user = await _userService.GetUserById(userId);
                //if (user == null)
                //    return NotFound(new { message = "User not found" });

                //if (string.IsNullOrWhiteSpace(user.Email))

                //    return BadRequest(new { message = "User email is missing or empty" });

                //Console.WriteLine($"📧 Will send email to: {user.Email}");

                var smtpHost = _configuration["EmailSettings:SmtpServer"];
                var smtpPort = int.Parse(_configuration["EmailSettings:SmtpPort"]);
                var senderEmail = _configuration["EmailSettings:SenderEmail"];
                var senderPassword = _configuration["EmailSettings:SenderPassword"];

                var senderName = _configuration["EmailSettings:SenderName"];

                using var client = new SmtpClient(smtpHost, smtpPort)
                {
                    EnableSsl = true,
                    Credentials = new NetworkCredential(senderEmail, senderPassword)
                };
                var mailMessage = new MailMessage
                {
                    From = new MailAddress(senderEmail, senderName),
                    Subject = emailRequest.Subject,
                    Body = emailRequest.Body,
                    IsBodyHtml = true
                };
                Console.WriteLine("nhbgvfcd");

                Console.WriteLine(mailMessage + "mailMessage");
                //uvi
                //mailMessage.To.Add(user.Email);
                mailMessage.To.Add("yaelina5261@gmail.com");


                await client.SendMailAsync(mailMessage);

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


