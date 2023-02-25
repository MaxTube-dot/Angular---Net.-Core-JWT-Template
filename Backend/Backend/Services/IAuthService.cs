using System.IdentityModel.Tokens.Jwt;
using Backend.Models.Login;

namespace Backend.Services;

public interface IAuthService
{
    string SignIn(AuthCredential authCredential);

    string SingUp(RegistrationCredentials registrationCredentials);
}