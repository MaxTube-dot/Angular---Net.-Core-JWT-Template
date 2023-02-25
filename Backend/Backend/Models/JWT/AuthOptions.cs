using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Backend.Models.JWT;

public class AuthOptions
{ 
    public static SymmetricSecurityKey GetSymmetricSecurityKey(string key)
    {
        return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
    }
}