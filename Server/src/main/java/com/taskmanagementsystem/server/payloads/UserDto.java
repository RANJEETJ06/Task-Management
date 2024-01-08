package com.taskmanagementsystem.server.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserDto {
    private Integer UserId;
    private String userName;
    private String password;
    private int noOfTask;
}