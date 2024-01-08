package com.taskmanagementsystem.server.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ApiResponse {
    private String message;
    private boolean success;
    private Integer userId;

    public ApiResponse(String message, boolean success, Integer userId) {
        this.message = message;
        this.success = success;
        this.userId = userId;
    }
}
