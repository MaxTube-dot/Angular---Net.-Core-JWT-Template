using System.Security.Claims;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface IJWTManagerRepository
{
    Tokens GenerateToken(string userName);
    Tokens GenerateRefreshToken(string userName);
    ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
}