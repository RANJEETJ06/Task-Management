package com.taskmanagementsystem.server.exception;

public class ResourcesNotFoundException extends RuntimeException{
    String resourcesName;
    String fieldName;
    long fieldValue;

    public ResourcesNotFoundException(String resourcesName, String fieldName,long fieldValue) {
        super(String.format("%s not found with %s:%s",resourcesName,fieldName,fieldValue));
        this.resourcesName = resourcesName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }
}
