using Backend.Models.Login;

namespace Backend.Services.Interfaces;

public interface IRepository
{
    void CreateUser(Users user);

    Users FindUserById(long id);

    Users FindUser(Users user);

    void UpdateUser(Users user);

    void CreateUsers(List<Users> user);

    Users FindUserByCredential(AuthCredential credential);

}