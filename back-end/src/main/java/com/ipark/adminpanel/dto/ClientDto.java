package com.ipark.adminpanel.dto;


import lombok.Data;

import java.time.ZonedDateTime;
import java.util.UUID;

@Data
public class ClientDto {
    private String name;
    private String email;
    private  String preUID;
    private String secondary_number;
    private String registeredPhone;
    private String shiftSchedule;
    private UUID addedBy;
    private boolean isBot;
    private String role;

}
