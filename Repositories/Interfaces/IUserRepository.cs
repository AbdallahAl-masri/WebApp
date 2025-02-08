using WebApp.Entities;

namespace WebApp.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<Users>
    {
        Task CreateListAsync(List<Users> entities);
        Task<int> GetTotalUsersAsync();
        Task<IEnumerable<Users>> GetUsersPaginatedAsync(int page, int pageSize);
    }
}
