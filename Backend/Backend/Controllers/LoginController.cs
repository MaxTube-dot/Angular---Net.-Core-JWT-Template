using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Backend.Models;
using Backend.Models.JWT;
using Backend.Models.Login;
using Backend.Services;
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
        
        /*
        [HttpPost("login/register")]
        [AllowAnonymous]
        public IActionResult Registration([FromBody] RegistrationCredentials registrationCredentials)
        {
            var token = userServiceRepository..SingUp(registrationCredentials);
            
            var response = new
            {
                access_token = token
            };
            
            return Json(response);
        }
        */
        
        
        [HttpPost("login/auth")]
        [AllowAnonymous]
        public async  Task<IActionResult> AuthAsync([FromBody]Users userdata)
        {
            var validUser = await _userServiceRepository.IsValidUserAsync(userdata);

            if (!validUser)
            {
                return Unauthorized("Incorrect username or password!");
            }

            var token = _jWtManager.GenerateToken(userdata.Name);

            if (token == null)
            {
                return Unauthorized("Invalid Attempt!");
            }

            // saving refresh token to the db
            UserRefreshTokens obj = new UserRefreshTokens
            {               
                RefreshToken = token.Refresh_Token,
                UserName = userdata.Name
            };

            _userServiceRepository.AddUserRefreshTokens(obj);
            _userServiceRepository.SaveCommit();
            return Ok(token);
        }
        
        [HttpPost("refresh/token")]
        [AllowAnonymous]
        public IActionResult RefreshToken([FromBody]Tokens token)
        {
            var principal = _jWtManager.GetPrincipalFromExpiredToken(token.Access_Token);
            var username = principal.Identity?.Name;

            //retrieve the saved refresh token from database
            var savedRefreshToken = _userServiceRepository.GetSavedRefreshTokens(username, token.Refresh_Token);

            if (savedRefreshToken.RefreshToken != token.Refresh_Token)
            {
                return Unauthorized("Invalid attempt!");
            }

            var newJwtToken = _jWtManager.GenerateRefreshToken(username);

            if (newJwtToken == null)
            {
                return Unauthorized("Invalid attempt!");
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