using Backend.Models.Login;

namespace Backend.Services.Repositories;

public class Repository : IRepository
{
    public void CreateUser(User user)
    {
        usersRepository.Add(user);
    }
    
    public void CreateUsers(List<User> users)
    {
        usersRepository.AddRange(users);
    }

    public User FindUserByCredential(AuthCredential credential)
    {
      return usersRepository
          .First(x => x.Email == credential.Email && x.Password == credential.Password);
    }

    public User FindUserById(long id)
    {
        return usersRepository.First(x => x.Id == id);
    }

    public User FindUser(User user)
    {
        return  usersRepository.First(x => x.Id == user.Id);
    }

    public void UpdateUser(User user)
    {
        var userOld = usersRepository.First(x => x.Id == user.Id);
        usersRepository.Remove(userOld);
        usersRepository.Add(user);
    }
    
    
    private List<User> usersRepository = new List<User>();
    
}