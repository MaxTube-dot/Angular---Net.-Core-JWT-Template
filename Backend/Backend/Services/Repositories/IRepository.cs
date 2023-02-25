using Backend.Models.Login;

namespace Backend.Services.Repositories;

public interface IRepository
{
    void CreateUser(User user);

    User FindUserById(long id);

    User FindUser(User user);

    void UpdateUser(User user);

    void CreateUsers(List<User> user);

    User FindUserByCredential(AuthCredential credential);

}