package com.ipark.adminpanel.dto;


import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Component
public class ClientDto {
    private String name;
    private String email;
    private  String preUID;
    private String secondary_number;
    private LocalDateTime createdAt;
    private String registered_phone;
    private String shift_schedule;
    private UUID addedBy;
    private boolean isBot;
    private String role;
//    private Boolean isOnline;

}
