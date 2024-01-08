package com.taskmanagementsystem.server.service;

import com.taskmanagementsystem.server.payloads.TaskDto;
import com.taskmanagementsystem.server.payloads.UserDto;

import java.util.List;

public interface TaskService {
    TaskDto createTask(TaskDto taskDto,Integer UserId);
    TaskDto taskUpdate(TaskDto taskDto,Integer taskId,Integer UserId);
    TaskDto getTaskById(Integer taskId,Integer UserId);
    void deleteTask(Integer TaskId,Integer UserId);
    List<TaskDto> getAllTasksByUser(Integer UserId);

}
