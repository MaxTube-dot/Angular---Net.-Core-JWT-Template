namespace Backend.Context;

public class AppDbContext : IdentityDbContext<IdentityUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {	  
	
    }
	
    public virtual DbSet<UserRefreshTokens> UserRefreshToken { get; set; }
}