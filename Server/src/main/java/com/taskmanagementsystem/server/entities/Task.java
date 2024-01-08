package com.taskmanagementsystem.server.entities;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "task")
@Getter
@Setter
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer TaskId;
    @Column(name = "task_name",nullable = false,length = 100)
    private String taskName;
    @Column(name = "deadline_date",nullable = false)
    private Date deadLine;
    @Column(name = "description",length = 1000)
    private String description;
    @Column(name = "work_of_status",nullable = false)
    private String workOfStatus;
    @ManyToOne
    private User user;
}
