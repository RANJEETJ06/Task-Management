package com.taskmanagementsystem.server.repositories;

import com.taskmanagementsystem.server.entities.Task;
import com.taskmanagementsystem.server.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface TaskRepo extends JpaRepository<Task, Integer> {
    List<Task> findByUser(User user);
}

