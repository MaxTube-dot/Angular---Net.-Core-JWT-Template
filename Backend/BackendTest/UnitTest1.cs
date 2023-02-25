using System.Security.Authentication;
using Backend.Controllers;
using Backend.Models.Login;
using Backend.Services;
using Backend.Services.Repositories;

namespace BackendTest;

public class Tests
{
    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public void AutShouldAuthCorrect()
    {
        IRepository repository = new Repository();

        var user = new User()
        {
            FirstName = "Илья",
            SecondName = "Левин",
            ThirdName = "Владимирович",
            Birthdate = DateTime.Now.AddYears(-23),
            Email = "Levin.8@yandex.ru",
            Password = "Qwerty123!",
            RoleUser = "user",
        };
        repository.CreateUser(user);

        var authCred = new AuthCredential();
        authCred.Email = user.Email;
        authCred.Password = user.Password;
        
        IAuthService auth = new AuthService(repository);
        var token = auth.SignIn(authCred);
        
        Assert.IsTrue(!string.IsNullOrWhiteSpace(token));
    }
    
    [Test]
    public void AutShouldAuthUnCorrect()
    {
        IRepository repository = new Repository();

        var user = new User()
        {
            FirstName = "Илья",
            SecondName = "Левин",
            ThirdName = "Владимирович",
            Birthdate = DateTime.Now.AddYears(-23),
            Email = "Levin.8@yandex.ru",
            Password = "Qwerty123!",
            RoleUser = "user",
        };
        repository.CreateUser(user);

        var authCred = new AuthCredential();
        authCred.Email = user.Email;
        authCred.Password = "Qwerty123";
        
        IAuthService auth = new AuthService(repository);
        try
        {
            var token = auth.SignIn(authCred);
            Assert.Fail();
        }
        catch (Exception)
        {
            Assert.IsTrue(true);
        }
    }
    
    
    
    [Test]
    public void AutShouldAuthEmptyPass()
    {
        IRepository repository = new Repository();

        var user = new User()
        {
            FirstName = "Илья",
            SecondName = "Левин",
            ThirdName = "Владимирович",
            Birthdate = DateTime.Now.AddYears(-23),
            Email = "Levin.8@yandex.ru",
            Password = "Qwerty123!",
            RoleUser = "user",
        };
        repository.CreateUser(user);

        var authCred = new AuthCredential();
        authCred.Email = user.Email;
        authCred.Password = "";
        
        IAuthService auth = new AuthService(repository);
        try
        {
            var token = auth.SignIn(authCred);
            Assert.Fail();
        }
        catch (Exception)
        {
            Assert.IsTrue(true);
        }
    }
    
    [Test]
    public void AutShouldAuthEmptyPass2()
    {
        IRepository repository = new Repository();

        var user = new User()
        {
            FirstName = "Илья",
            SecondName = "Левин",
            ThirdName = "Владимирович",
            Birthdate = DateTime.Now.AddYears(-23),
            Email = "Levin.8@yandex.ru",
            Password = "Qwerty123!",
            RoleUser = "user",
        };
        repository.CreateUser(user);

        var authCred = new AuthCredential();
        authCred.Email = "";
        authCred.Password = "";
        
        IAuthService auth = new AuthService(repository);
        try
        {
            var token = auth.SignIn(authCred);
            Assert.Fail();
        }
        catch (Exception)
        {
            Assert.IsTrue(true);
        }
    }
    
    [Test]
    public void ShouldRegister()
    {
        var register = new RegistrationCredentials()
        {
            FirstName = "Илья",
            SecondName = "Левин",
            ThirdName = "Владимирович",
            Birthdate = DateTime.Now.AddYears(-23),
            Email = "Levin.8@yandex.ru",
            Password = "user",
        };
        
        IRepository repository = new Repository();
        IAuthService auth = new AuthService(repository);
        
        var token = auth.SingUp(register);
        Assert.IsTrue(!string.IsNullOrWhiteSpace(token));

        var user = repository.FindUserById(0);

        if (user.Email != null) 
            Assert.That(user.Email, Is.EqualTo(register.Email));
        else
            Assert.Fail();
    }
    
}