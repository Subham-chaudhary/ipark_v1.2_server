package com.ipark.adminpanel.dto;

import com.ipark.adminpanel.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Map;
import java.util.TimeZone;
import java.util.UUID;

/**
 * Data Transfer Object for Clients entity.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDto {
    private UUID clientUid;
    private Map<String, Object> name;
    private Map<String, Object> contacts;
    private String registeredPhone;
    private Role role;
    private UUID currentSession;
//    private ZonedDateTime createdAt;
    private UUID createdBy;
    private UUID updatedBy;
    private ZonedDateTime updatedAt;
    private boolean isBot;
//    private boolean isActive;
//    private boolean isOnline;
    private UUID lotUID;
    private Map<String, Object> shiftSchedule;
}