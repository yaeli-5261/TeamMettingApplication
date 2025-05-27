using Microsoft.AspNetCore.Mvc;
using MeetSummarizer.Core.Models;
using System.Collections.Concurrent;

namespace MeetSummarizer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        // In-memory storage for simplicity - in production use database
        private static readonly ConcurrentDictionary<int, List<ChatMessage>> _teamChats = new();
        private static int _messageIdCounter = 1;

        [HttpGet("messages/{teamId}")]
        public ActionResult<List<ChatMessageDto>> GetMessages(int teamId)
        {
            try
            {
                if (!_teamChats.ContainsKey(teamId))
                {
                    _teamChats[teamId] = new List<ChatMessage>();
                }

                var messages = _teamChats[teamId]
                    .OrderBy(m => m.CreatedAt)
                    .Select(m => new ChatMessageDto
                    {
                        Id = m.Id,
                        UserName = m.UserName,
                        Message = m.Message,
                        CreatedAt = m.CreatedAt,
                        TeamId = m.TeamId
                    })
                    .ToList();

                return Ok(messages);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error retrieving messages", error = ex.Message });
            }
        }

        [HttpPost("send")]
        public ActionResult<ChatMessageDto> SendMessage([FromBody] SendMessageDto messageDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (string.IsNullOrWhiteSpace(messageDto.Message))
                {
                    return BadRequest(new { message = "Message cannot be empty" });
                }

                if (!_teamChats.ContainsKey(messageDto.TeamId))
                {
                    _teamChats[messageDto.TeamId] = new List<ChatMessage>();
                }

                var chatMessage = new ChatMessage
                {
                    Id = Interlocked.Increment(ref _messageIdCounter),
                    UserName = messageDto.UserName.Trim(),
                    Message = messageDto.Message.Trim(),
                    TeamId = messageDto.TeamId,
                    CreatedAt = DateTime.UtcNow
                };

                _teamChats[messageDto.TeamId].Add(chatMessage);

                // Keep only last 100 messages per team
                if (_teamChats[messageDto.TeamId].Count > 100)
                {
                    _teamChats[messageDto.TeamId] = _teamChats[messageDto.TeamId]
                        .OrderByDescending(m => m.CreatedAt)
                        .Take(100)
                        .OrderBy(m => m.CreatedAt)
                        .ToList();
                }

                var responseDto = new ChatMessageDto
                {
                    Id = chatMessage.Id,
                    UserName = chatMessage.UserName,
                    Message = chatMessage.Message,
                    CreatedAt = chatMessage.CreatedAt,
                    TeamId = chatMessage.TeamId
                };

                return Ok(responseDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error sending message", error = ex.Message });
            }
        }

        [HttpDelete("clear/{teamId}")]
        public ActionResult ClearChat(int teamId)
        {
            try
            {
                if (_teamChats.ContainsKey(teamId))
                {
                    _teamChats[teamId].Clear();
                }

                return Ok(new { message = "Chat cleared successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error clearing chat", error = ex.Message });
            }
        }

        [HttpGet("stats/{teamId}")]
        public ActionResult GetChatStats(int teamId)
        {
            try
            {
                if (!_teamChats.ContainsKey(teamId))
                {
                    return Ok(new { messageCount = 0, activeUsers = 0 });
                }

                var messages = _teamChats[teamId];
                var messageCount = messages.Count;
                var activeUsers = messages.Select(m => m.UserName).Distinct().Count();

                return Ok(new { messageCount, activeUsers });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error getting chat stats", error = ex.Message });
            }
        }
    }
}
