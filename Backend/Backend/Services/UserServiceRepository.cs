using Backend.Context;
using Backend.Models;
using Backend.Models.Login;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services.Repositories;
public class UserServiceRepository : IUserServiceRepository
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly DataContext _db;

    public UserServiceRepository(UserManager<IdentityUser> userManager, DataContext db)
    {
        this._userManager = userManager;
        this._db = db;
    }

    public UserRefreshTokens AddUserRefreshTokens(UserRefreshTokens user)
    {
        _db.UserRefreshToken.Add(user);
        return user;
    }

    public void DeleteUserRefreshTokens(string username, string refreshToken)
    {
        var item = _db.UserRefreshToken.FirstOrDefault(x => x.UserName == username && x.RefreshToken == refreshToken);
        if (item != null)
        {
            _db.UserRefreshToken.Remove(item);
        }
    }
	
    public UserRefreshTokens GetSavedRefreshTokens(string username, string refreshToken)
    {
        return _db.UserRefreshToken.FirstOrDefault(x => x.UserName == username && x.RefreshToken == refreshToken && x.IsActive == true);
    }

    public int SaveCommit()
    {
        return _db.SaveChanges();
    }

    public async Task<bool> CreateAsync(RegistrationCredentials user)
    {
        IdentityUser identityUser = new IdentityUser()
        {
            UserName = user.UserName,
            Email = user.Email,
            EmailConfirmed = false, 
            TwoFactorEnabled = false, 
            PhoneNumber = user.Phone,
            NormalizedUserName = $"{user.FirstName} {user.SecondName} {user.ThirdName}",
        };
        
        var result = await _userManager.CreateAsync(identityUser, user.Password);
        return result.Succeeded;
    }

    public async Task<bool> IsValidUserAsync(Users users)
    {
        var u = _userManager.Users.FirstOrDefault(o => o.UserName == users.Login);
        var result = await _userManager.CheckPasswordAsync(u, users.Password);
        return result;

    }

}