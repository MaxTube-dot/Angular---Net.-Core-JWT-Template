using System.Security.Authentication;
using Backend.Controllers;
using Backend.Models.Login;
using Backend.Services;
using Backend.Services.Interfaces;
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
        Assert.Pass();
    }
    
}