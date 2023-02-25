using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Backend.Models.JWT;
using Backend.Models.Login;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    [ApiController]
 public class LoginController : Controller
 {

        private readonly IAuthService _authService;
        public LoginController(IAuthService authService)
        {
            _authService = authService;
        }
        
        
        [HttpPost("login/register")]
        [AllowAnonymous]
        public IActionResult Registration([FromBody] RegistrationCredentials registrationCredentials)
        {
            var token = _authService.SingUp(registrationCredentials);
            
            var response = new
            {
                access_token = token
            };
            
            return Json(response);
        }

        [HttpPost("login/auth")]
        [AllowAnonymous]
        public IActionResult Auth([FromBody]AuthCredential authCredential)
        {
            var token = _authService.SignIn(authCredential);
            
            
            var response = new
            {
                access_token = token
            };
 
            return Json(response);
        }
        
        [HttpPost("refresh/token")]
        [AllowAnonymous]
        public IActionResult Auth([FromBody]AuthCredential authCredential)
        {
            var token = _authService.SignIn(authCredential);
            
            
            var response = new
            {
                access_token = token
            };
 
            return Json(response);
        }
 }
}