package com.taskmanagementsystem.server.service.impl;

import com.taskmanagementsystem.server.entities.User;
import com.taskmanagementsystem.server.exception.ResourcesNotFoundException;
import com.taskmanagementsystem.server.payloads.UserDto;
import com.taskmanagementsystem.server.repositories.UserRepo;
import com.taskmanagementsystem.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;
    @Override
    public UserDto createUser(UserDto userDto) {
        User user=this.DtoToUser(userDto);
        User saved=this.userRepo.save(user);
        return this.userToDto(saved);
    }

    @Override
    public UserDto userUpdate(UserDto userDto, Integer userId) {
        User user=this.userRepo.findById(userId).orElseThrow(()-> new ResourcesNotFoundException("User","User Id",userId));

        user.setUserName(userDto.getUserName());
        user.setPassword(userDto.getPassword());
        user.setNoOfTask(userDto.getNoOfTask());

        User UpdatedUser=this.userRepo.save(user);

        return this.userToDto(UpdatedUser);
    }

    @Override
    public UserDto getUserById(Integer userId) {
        User user=this.userRepo.findById(userId).orElseThrow(()-> new ResourcesNotFoundException("User","User Id",(long)userId));
        return this.userToDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users=this.userRepo.findAll();
        return users.stream().map(this::userToDto).toList();
    }

    @Override
    public void deleteUser(Integer userId) {
        User user=this.userRepo.findById(userId).orElseThrow(()-> new ResourcesNotFoundException("User","User Id",(long)userId));
        this.userRepo.delete(user);
    }

    @Override
    public User getUserByUserName(String UserName) {
        return this.userRepo.findByUserName(UserName);
    }

    public User DtoToUser(UserDto userDto){
        User user=new User();
        user.setUserId(userDto.getUserId());
        user.setUserName(userDto.getUserName());
        user.setPassword(userDto.getPassword());
        user.setNoOfTask(userDto.getNoOfTask());
        return user;
    }
    public UserDto userToDto(User user){
        UserDto userDto=new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setUserName(user.getUserName());
        userDto.setPassword(user.getPassword());
        userDto.setNoOfTask(user.getNoOfTask());
        return  userDto;
    }
}
