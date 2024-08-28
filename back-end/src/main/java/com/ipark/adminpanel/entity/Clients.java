package com.ipark.adminpanel.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.UUID;


/**
 * Entity class representing a client.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "clients0")
public class Clients {
    // Unique identifier of the client.
    @Id
    @Column(name = "client_uid", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID clientUid;

    @Column(name = "name", nullable = false)
    private String name;


    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "secondary_number", nullable = false)
    private String secondaryNumber;

    // Registered phone number of the client.
    @Column(name = "registered_phone", nullable = false, unique = true)
    private String registeredPhone;

    // Role of the client.
    @Column(name = "role")
    private String role;

    // Timestamp when the client was created, with time zone support.
    @Column(name = "created_at")
    private LocalDateTime createdAt;


    // Timestamp when the client last logged in, with time zone support.
    @Column(name = "last_login_at")
    private ZonedDateTime lastLoginAt;

    // Indicates whether the client is a bot.
    @Column(name = "is_bot")
    private boolean isBot;

    @Column(name="added_by")
    private UUID addedBy;

    // Indicates whether the client is active.
    @Column(name = "is_active")
    private boolean isActive ;

    // Indicates whether the client is online.
    @Column(name = "is_online")
    private boolean isOnline;

    @Column(name = "pre_uid" )
    private String preUID;
    //Unique identifier for the parking lot associated with the client.

    @Column(name = "lot_uid")
    private UUID lotUID;


    // Shift schedule of the client, stored as JSONB.
    @Column(name = "shift_schedule")
    private String shiftSchedule;

}
