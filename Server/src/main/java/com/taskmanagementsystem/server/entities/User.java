package com.taskmanagementsystem.server.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer userId;
    @Column(name = "user_name",nullable = false,unique = true,length = 100)
    private String userName;
    @Column(name = "password",nullable = false,length = 30)
    private String password;
    @Column(name = "no_of_task",columnDefinition = "int default 0")
    private int noOfTask=0;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Task> tasks=new ArrayList<>();
}
