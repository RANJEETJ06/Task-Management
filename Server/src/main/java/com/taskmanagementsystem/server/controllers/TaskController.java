package com.taskmanagementsystem.server.controllers;

import com.taskmanagementsystem.server.payloads.TaskDto;
import com.taskmanagementsystem.server.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class TaskController {
    @Autowired
    private TaskService taskService;

    //POST method-create User
    @PostMapping("/{userId}/task/")
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto,@PathVariable Integer userId){
        TaskDto CreatedTaskDto=this.taskService.createTask(taskDto,userId);
        return new ResponseEntity<>(CreatedTaskDto, HttpStatus.CREATED);
    }

    @PutMapping("/{userId}/{taskId}/")
    public ResponseEntity<TaskDto> updateTask(@RequestBody TaskDto taskDto, @PathVariable String taskId, @PathVariable String userId){
        TaskDto UpdatedTaskDto=this.taskService.taskUpdate(taskDto, Integer.valueOf(taskId), Integer.valueOf(userId));
        return ResponseEntity.ok(UpdatedTaskDto);
    }

    @DeleteMapping("/{userId}/{taskId}/")
    public ResponseEntity<?> deleteTask(@PathVariable String taskId, @PathVariable String userId){
        this.taskService.deleteTask(Integer.valueOf(taskId), Integer.valueOf(userId));
        return new ResponseEntity<>(Map.of("Message","Deleted successfully"),HttpStatus.CREATED);
    }

    @GetMapping("{userId}/{taskId}/")
    public ResponseEntity<TaskDto> GetTask(@PathVariable String taskId, @PathVariable String userId){
        TaskDto taskDto=this.taskService.getTaskById(Integer.valueOf(taskId), Integer.valueOf(userId));
        return new ResponseEntity<>(taskDto,HttpStatus.CREATED);
    }

    @GetMapping("{userId}/tasks/")
    public ResponseEntity<List<TaskDto>> GetAllTask(@PathVariable String userId){
        List<TaskDto> tasks= this.taskService.getAllTasksByUser(Integer.valueOf(userId));
        return new ResponseEntity<>(tasks,HttpStatus.CREATED);
    }
}
