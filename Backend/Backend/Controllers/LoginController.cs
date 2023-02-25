using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Models.Login;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    [ApiController]
 public class LoginController : Controller
 {

        private readonly IJWTManagerRepository _jWtManager;
        private readonly IUserServiceRepository _userServiceRepository;
        public LoginController(IJWTManagerRepository jWtManager, IUserServiceRepository userServiceRepository)
        {
            this._jWtManager = jWtManager;
            this._userServiceRepository = userServiceRepository;
        }
        
        
        [HttpPost("login/register")]
        [AllowAnonymous]
        public async Task<IActionResult> RegistrationAsync([FromBody] RegistrationCredentials registrationCredentials)
        {
            var validUser = await _userServiceRepository.CreateAsync(registrationCredentials);
            
            if (!validUser)
            {
                return Unauthorized("Некорректный логин или пароль!");
            }
            
            var token = _jWtManager.GenerateToken(registrationCredentials.UserName);
            
            if (token == null)
                return Unauthorized("Неудачная попытка!");

                // saving refresh token to the db
            UserRefreshTokens obj = new UserRefreshTokens
            {               
                RefreshToken = token.Refresh_Token,
                UserName = registrationCredentials.UserName
            };

            _userServiceRepository.AddUserRefreshTokens(obj);
            _userServiceRepository.SaveCommit();
            return Ok(token);
        }
        
        
        
        [HttpPost("login/auth")]
        [AllowAnonymous]
        public async  Task<IActionResult> AuthAsync([FromBody]Users userdata)
        {
            var validUser = await _userServiceRepository.IsValidUserAsync(userdata);

            if (!validUser)
            {
                return Unauthorized("Некорректный логин или пароль!");
            }

            var token = _jWtManager.GenerateToken(userdata.Login);

            if (token == null)
            {
                return Unauthorized("Неудачная попытка!");
            }

            // saving refresh token to the db
            UserRefreshTokens obj = new UserRefreshTokens
            {               
                RefreshToken = token.Refresh_Token,
                UserName = userdata.Login
            };

            _userServiceRepository.AddUserRefreshTokens(obj);
            _userServiceRepository.SaveCommit();
            return Ok(token);
        }
        
        [HttpPost("login/refresh/token")]
        [AllowAnonymous]
        public IActionResult RefreshToken([FromBody]Tokens token)
        {
            var principal = _jWtManager.GetPrincipalFromExpiredToken(token.Access_Token);
            var username = principal.Identity?.Name;

            //retrieve the saved refresh token from database
            var savedRefreshToken = _userServiceRepository.GetSavedRefreshTokens(username, token.Refresh_Token);

            if (savedRefreshToken.RefreshToken != token.Refresh_Token)
            {
                return Unauthorized("Неудачная попытка!");
            }

            var newJwtToken = _jWtManager.GenerateRefreshToken(username);

            if (newJwtToken == null)
            {
                return Unauthorized("Неудачная попытка!");
            }

            // saving refresh token to the db
            UserRefreshTokens obj = new UserRefreshTokens
            {
                RefreshToken = newJwtToken.Refresh_Token,
                UserName = username
            };

            _userServiceRepository.DeleteUserRefreshTokens(username, token.Refresh_Token);
            _userServiceRepository.AddUserRefreshTokens(obj);
            _userServiceRepository.SaveCommit();

            return Ok(newJwtToken);
        }
 }
}