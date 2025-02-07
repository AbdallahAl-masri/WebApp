using WebApp.Entities;

namespace WebApp.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<Users>
    {
        Task CreateListAsync(List<Users> entities);
    }
}
