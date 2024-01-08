package com.taskmanagementsystem.server.exception;

import com.taskmanagementsystem.server.payloads.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler extends Exception{
    @ExceptionHandler(ResourcesNotFoundException.class)
    public ResponseEntity<ApiResponse> ResourceNotFoundException(ResourcesNotFoundException es){
        String message=es.getMessage();
        ApiResponse apiResponse=new ApiResponse(message,false,null);
        return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
    }
}
