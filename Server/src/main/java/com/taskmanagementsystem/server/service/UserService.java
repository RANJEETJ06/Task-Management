package com.taskmanagementsystem.server.service;

import com.taskmanagementsystem.server.entities.User;
import com.taskmanagementsystem.server.payloads.UserDto;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto user);
    UserDto userUpdate(UserDto user,Integer userId);
    UserDto getUserById(Integer userId);
    List<UserDto> getAllUsers();
    void deleteUser(Integer UserId);
    User getUserByUserName(String UserName);
}
