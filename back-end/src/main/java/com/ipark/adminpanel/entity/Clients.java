package com.ipark.adminpanel.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity class representing a client.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "clients0")
public class Clients {

    /**
     * Unique identifier for the client.
     */
    @Id
    @Column(name = "client_uid", nullable = false)
    private String client_uid;

    /**
     * Name of the client.
     */
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * Contact information of the client.
     */
    @Column(name = "contacts", nullable = false)
    private String contacts;

    /**
     * Registered phone number of the client.
     */
    @Column(name = "registered_phone", nullable = false)
    private String registered_phone;

    /**
     * Role of the client.
     */
    @Column(name = "role", nullable = false)
    private String role;

    /**
     * Timestamp when the client was created.
     */
    @Column(name = "created_at", nullable = false)
    private String created_at;

    /**
     * Unique identifier of the user who added the client.
     */
    @Column(name = "added_by", nullable = false)
    private String added_by;

    /**
     * Timestamp when the client was last updated.
     */
    @Column(name = "updated_at")
    private String updated_at;

    /**
     * Unique identifier of the user who last updated the client.
     */
    @Column(name = "updated_by")
    private String updated_by;

    /**
     * Timestamp of the client's last login.
     */
    @Column(name = "last_login_at", nullable = false)
    private String last_login_at;

    /**
     * Indicates whether the client is a bot.
     */
    @Column(name = "is_bot")
    private boolean is_bot;

    /**
     * Indicates whether the client is active.
     */
    @Column(name = "is_active")
    private boolean is_active;

    /**
     * Indicates whether the client is online.
     */
    @Column(name = "is_online")
    private boolean is_online;

    /**
     * Unique identifier for the parking lot associated with the client.
     */
    @Column(name = "lot_uid", nullable = false)
    private String lot_uid;

    /**
     * Shift schedule of the client.
     */
    @Column(name = "shift_schedule", nullable = false)
    private String shift_schedule;
}