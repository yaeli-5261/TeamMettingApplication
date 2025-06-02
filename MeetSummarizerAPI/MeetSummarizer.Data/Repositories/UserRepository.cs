﻿using MeetSummarizer.Core.Entities;
using MeetSummarizer.Core.IRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetSummarizer.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }
       
        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users
                .Include(u => u.Role)
                .Include(u => u.Team)
                .ToListAsync();
        }
        
        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _context.Users.Include(u=>u.Role).Include(T=>T.Team).FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> GetUserByNameAndPasswordAsync(string password, string email)
        {
            return await _context.Users.Include(u=>u.Role).FirstOrDefaultAsync(u => u.Password == password && u.Email == email);
        }
        
        public async Task<User> AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
         
            return user;
        }
        public async Task UpdateUserAsync(int id, User user)
        {
            var userToUpdate = await GetUserByIdAsync(id);
            if (userToUpdate == null)
            {
                throw new KeyNotFoundException($"User with id {id} not found");
            }
            userToUpdate.UserName = user.UserName;
            userToUpdate.Email = user.Email;
            userToUpdate.Password = user.Password;
            userToUpdate.UpdatedAt = DateTime.Now;
            userToUpdate.RoleId = user.RoleId;
            userToUpdate.TeamId = user.TeamId;    
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await GetUserByIdAsync(id);
            if (user != null)
                _context.Users.Remove(user);
        }
    }
}
