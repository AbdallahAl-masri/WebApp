using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using WebApp.Entities;
using WebApp.Entities.Context;
using WebApp.Repositories.Interfaces;

namespace WebApp.Repositories.implementations
{
    public class LoginRepository(WebAppContext _context) : ILoginRepository
    {
        public async Task CreateAsync(Credentials entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            await _context.Credentials.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Credentials entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            _context.Credentials.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<Credentials> FindByIdAsync(int id)
        {
            var item = await _context.Credentials.FindAsync(id);

            return item == null ? null : item;
        }

        public async Task<IEnumerable<Credentials>> GetAllAsync()
        {
            return await _context.Credentials.ToListAsync();
        }

        public async Task<Credentials> GetByAsync(Expression<Func<Credentials, bool>> expression)
        {
            var item = await _context.Credentials.FindAsync(expression);

            return item ?? null;
        }

        public async Task UpdateAsync(Credentials entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            _context.Credentials.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
