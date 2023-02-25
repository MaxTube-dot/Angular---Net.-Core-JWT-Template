using Backend.Models.Login;

namespace Backend.Services.Interfaces;

public interface IAuthService
{
    string SignIn(AuthCredential authCredential);

    string SingUp(RegistrationCredentials registrationCredentials);

}