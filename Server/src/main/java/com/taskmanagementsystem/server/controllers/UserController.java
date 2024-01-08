package com.taskmanagementsystem.server.controllers;


import com.taskmanagementsystem.server.entities.User;
import com.taskmanagementsystem.server.exception.ResourcesNotFoundException;
import com.taskmanagementsystem.server.payloads.ApiResponse;
import com.taskmanagementsystem.server.payloads.SignInRequest;
import com.taskmanagementsystem.server.payloads.UserDto;
import com.taskmanagementsystem.server.service.TaskService;
import com.taskmanagementsystem.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    //POST method-create User
    @PostMapping("/")
    @CrossOrigin
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
        UserDto CreatedUserDto=this.userService.createUser(userDto);
        return new ResponseEntity<>(CreatedUserDto, HttpStatus.CREATED);
    }

    @PutMapping("/{UserId}/")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto, @PathVariable String UserId){
        UserDto UpdatedUserDto=this.userService.userUpdate(userDto, Integer.valueOf(UserId));
        return ResponseEntity.ok(UpdatedUserDto);
    }

    @DeleteMapping("/{UserId}/")
    public ResponseEntity<?> deleteUser( @PathVariable String UserId){
        this.userService.deleteUser(Integer.valueOf(UserId));
        return new ResponseEntity<>(Map.of("Message","Deleted successfully"),HttpStatus.CREATED);
    }

    @GetMapping("/{UserId}/")
    public ResponseEntity<UserDto> GetUser( @PathVariable String UserId){
        UserDto user=this.userService.getUserById(Integer.valueOf(UserId));
        return new ResponseEntity<>(user,HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<UserDto>> GetAllUser(){
        List<UserDto> users= this.userService.getAllUsers();
        return new ResponseEntity<>(users,HttpStatus.CREATED);
    }

    @PostMapping("/signing/")
    public ResponseEntity<ApiResponse> signIn(@RequestBody SignInRequest signInRequest) {
        String username = signInRequest.getUserName();
        String password = signInRequest.getPassword();
        User user= this.userService.getUserByUserName(username);
        if (user != null) {
            if (password.equals(user.getPassword())) {
                return new ResponseEntity<>(new ApiResponse("Login successful", true, user.getUserId()), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(new ApiResponse("Incorrect password", false,null), HttpStatus.FORBIDDEN);
            }
        } else {
            return new ResponseEntity<>(new ApiResponse("User not found", false,null), HttpStatus.FORBIDDEN);
        }
    }
}

