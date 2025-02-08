using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using WebApp.Entities;
using WebApp.Entities.Context;
using WebApp.Repositories.Interfaces;

namespace WebApp.Repositories.implementations
{
    public class UserRepository(WebAppContext _context) : IUserRepository
    {
        public async Task CreateAsync(Users entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            await _context.Users.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task CreateListAsync(List<Users> entities)
        {
            if (entities == null || entities.Count == 0)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                await _context.Users.AddRangeAsync(entities);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                // Handle database update issues
                throw new Exception("An error occurred while saving the list of users.", ex);
            }
        }

        public async Task DeleteAsync(Users entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            _context.Users.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<Users> FindByIdAsync(int id)
        {
            var item = await _context.Users.FindAsync(id);

            return item == null ? null : item;
        }

        public async Task<IEnumerable<Users>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<Users> GetByAsync(Expression<Func<Users, bool>> expression)
        {
            var item = await _context.Users.FirstOrDefaultAsync(expression);

            return item;
        }

        public async Task UpdateAsync(Users entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            _context.Users.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
