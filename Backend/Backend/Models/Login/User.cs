namespace Backend.Models.Login;

public class User
{
    public long Id { get; set; }
    
    public string? FirstName { get; set; }
    
    public string? SecondName { get; set; }
    
    public string? ThirdName { get; set; }
    
    public DateTime Birthdate { get; set; }
    public string? Email { get; set; }
    
    public string? Password { get; set; }
    
    public string? RoleUser { get; set; }
}
