package com.taskmanagementsystem.server.service.impl;

import com.taskmanagementsystem.server.entities.Task;
import com.taskmanagementsystem.server.entities.User;
import com.taskmanagementsystem.server.exception.ResourcesNotFoundException;
import com.taskmanagementsystem.server.payloads.TaskDto;
import com.taskmanagementsystem.server.repositories.TaskRepo;
import com.taskmanagementsystem.server.repositories.UserRepo;
import com.taskmanagementsystem.server.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepo taskRepo;
    @Autowired
    private UserRepo userRepo;
    @Override
    public TaskDto createTask(TaskDto taskDto,Integer UserId) {
        User user=this.userRepo.findById(UserId).orElseThrow(()-> new ResourcesNotFoundException("User","User Id",UserId));
        Task task=this.DtoToTask(taskDto);
        user.setNoOfTask(user.getNoOfTask()+1);
        task.setUser(user);
        Task saved=this.taskRepo.save(task);
        return this.taskToDto(saved);
    }
    @Override
    public TaskDto taskUpdate(TaskDto taskDto, Integer taskId, Integer UserId) {
        Task task=this.taskRepo.findById(taskId).orElseThrow(()-> new ResourcesNotFoundException("User","User Id",taskId));
        User user=this.userRepo.findById(UserId).orElseThrow(()-> new ResourcesNotFoundException("User","User Id",UserId));
        user.getTasks().remove(task);
        task.setTaskName(taskDto.getTaskName());
        task.setDescription(taskDto.getDescription());
        task.setDeadLine(taskDto.getDeadLine());
        task.setWorkOfStatus(taskDto.getWorkOfStatus());

        user.getTasks().add(task);

        Task UpdatedTask=this.taskRepo.save(task);

        return this.taskToDto(UpdatedTask);
    }

    @Override
    public TaskDto getTaskById(Integer taskId,Integer UserId){
        User user=this.userRepo.findById(UserId).orElseThrow(()-> new ResourcesNotFoundException("User","User Id",UserId));
        List<Task> tasks=this.taskRepo.findByUser(user);
        Task task = tasks.stream().filter(obj -> Objects.equals(obj.getTaskId(), taskId)).findFirst().orElseThrow(()-> new ResourcesNotFoundException("Task","task Id",(long)taskId));
        return this.taskToDto(task);
    }

    @Override
    public void deleteTask(Integer taskId,Integer UserId) {
        User user=this.userRepo.findById(UserId).orElseThrow(()-> new ResourcesNotFoundException("User","User Id",UserId));
        Task task=this.taskRepo.findById(taskId).orElseThrow(()-> new ResourcesNotFoundException("Task","task Id",(long)taskId));
        user.getTasks().remove(task);
        this.taskRepo.delete(task);
    }

    @Override
    public List<TaskDto> getAllTasksByUser(Integer UserId) {
        User user=this.userRepo.findById(UserId).orElseThrow(()-> new ResourcesNotFoundException("User","User Id",(long)UserId));
        List<Task> tasks=this.taskRepo.findByUser(user);
        return tasks.stream().map(this::taskToDto).toList();
    }

    public Task DtoToTask(TaskDto taskDto){
        Task task=new Task();
        task.setTaskId(taskDto.getTaskId());
        task.setTaskName(taskDto.getTaskName());
        task.setDescription(taskDto.getDescription());
        task.setDeadLine(taskDto.getDeadLine());
        task.setWorkOfStatus(taskDto.getWorkOfStatus());
        return task;
    }
    public TaskDto taskToDto(Task task){
        TaskDto taskDto=new TaskDto();
        taskDto.setTaskId(task.getTaskId());
        taskDto.setTaskName(task.getTaskName());
        taskDto.setDescription(task.getDescription());
        taskDto.setDeadLine(task.getDeadLine());
        taskDto.setWorkOfStatus(task.getWorkOfStatus());
        return  taskDto;
    }
}
