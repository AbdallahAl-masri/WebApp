using Microsoft.EntityFrameworkCore;

namespace WebApp.Entities.Context
{
    public class WebAppContext : DbContext
    {
        public WebAppContext()
        {
        }

        public WebAppContext(DbContextOptions<WebAppContext> options) : base(options) { }

        public DbSet<Credentials> Credentials { get; set; }
        public DbSet<Users> Users { get; set; }
    }
}
