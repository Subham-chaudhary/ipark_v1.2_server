package com.ipark.adminpanel.entity;


import com.ipark.adminpanel.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Map;
import java.util.TimeZone;
import java.util.UUID;


/**
 * Entity class representing a client.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "clients0")
public class Clients {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "client_uid")
    private UUID clientUid;


    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "name", nullable = false,columnDefinition = "jsonb")
    private Map<String, Object> name;


    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "contacts", nullable = false,columnDefinition = "jsonb")
    private Map<String, Object> contacts;


    // Registered phone number of the client.
    @Column(name = "registered_phone", nullable = false)
    private String registeredPhone;

    // Role of the client.
    @Enumerated(EnumType.STRING)
    @Column(name = "role",columnDefinition = "role_type")
    private Role role;

    @Column(name = "current_session")
    private UUID currentSession;

    // Timestamp when the client was created, with time zone support.
    @Column(name = "created_at")
    private ZonedDateTime createdAt;

    @Column(name="created_by")
    private UUID createdBy;

    @Column(name="updated_by")
    private UUID updatedBy;

    @Column(name="updated_at")
    private ZonedDateTime updatedAt;


    // Indicates whether the client is active.
    @Column(name = "is_active")
    private Boolean isActive ;

    // Indicates whether the client is a bot.
    @Column(name = "is_bot")
    private Boolean isBot;

    // Indicates whether the client is online.
    @Column(name = "is_online", columnDefinition = "boolean default false")
    private Boolean isOnline;


    @Column(name = "lot_uid")
    private UUID lotUID;


    // Shift schedule of the client, stored as JSONB.
    @Column(name = "shift_schedule", nullable = false,columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> shiftSchedule;


}
