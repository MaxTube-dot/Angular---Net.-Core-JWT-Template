using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
using System.Security.Claims;
using Backend.Models.JWT;
using Backend.Models.Login;
using Backend.Services.Repositories;

namespace Backend.Services;

public class AuthService: IAuthService
{
    private readonly IRepository _repository;
    public AuthService(IRepository repository)
    {
        _repository = repository;
    }
    
    public void SingUp()
    {
        throw new NotImplementedException();
    }
    
    public string SignIn(AuthCredential authCredential)
    {
        var identity = GetIdentity(authCredential);
        return GetToken(identity);
    }

    public string SingUp(RegistrationCredentials registrationCredentials)
    {
        var user = new User()
        {
            FirstName = registrationCredentials.FirstName,
            SecondName = registrationCredentials.SecondName,
            ThirdName = registrationCredentials.ThirdName,
            Birthdate = registrationCredentials.Birthdate,
            Email = registrationCredentials.Email,
            Password = registrationCredentials.Password,
            RoleUser = "user",
        };
        
        _repository.CreateUser(user);
        
        if (registrationCredentials == null
            || string.IsNullOrWhiteSpace(registrationCredentials.Email)
            || string.IsNullOrWhiteSpace(registrationCredentials.Password))
            throw new InvalidCredentialException();

        var authCred = new AuthCredential
        {
            Email = registrationCredentials.Email,
            Password = registrationCredentials.Password
        };

        var identity = GetIdentity(authCred);
        return GetToken(identity);

    }

    private string GetToken(ClaimsIdentity identity)
    {
        var now = DateTime.UtcNow;
        // создаем JWT-токен
        var jwt = new JwtSecurityToken(
            issuer: AuthOptions.ISSUER,
            audience: AuthOptions.AUDIENCE,
            notBefore: now,
            claims: identity.Claims,
            expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
            signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

        return encodedJwt;
    }

    private ClaimsIdentity GetIdentity(AuthCredential authCredential)
    {
        User user = _repository.FindUserByCredential(authCredential);
        
        if (authCredential == null
            || string.IsNullOrWhiteSpace(authCredential.Email)
            || string.IsNullOrWhiteSpace(authCredential.Password))
            throw new InvalidCredentialException();
        
        var claims = new List<Claim>
        {
            new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
            new Claim(ClaimsIdentity.DefaultRoleClaimType, user.RoleUser)
        };
        ClaimsIdentity claimsIdentity =
            new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
        return claimsIdentity;
    }
}