package com.taskmanagementsystem.server.repositories;

import com.taskmanagementsystem.server.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Integer> {

    User findByUserName(String userName);
}
