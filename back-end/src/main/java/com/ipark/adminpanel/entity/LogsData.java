package com.ipark.adminpanel.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity class representing log data.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "logs_data0")
public class LogsData {

    /**
     * Unique identifier for the log entry.
     */
    @Id
    @Column(name = "log_id", nullable = false)
    private String log_id;

    /**
     * Level of the log (e.g., INFO, ERROR).
     */
    @Column(name = "log_level", nullable = false)
    private String log_level;

    /**
     * Source of the log entry.
     */
    @Column(name = "source", nullable = false)
    private String source;

    /**
     * Message of the log entry.
     */
    @Column(name = "message", nullable = false)
    private String message;

    /**
     * Detailed information about the log entry.
     */
    @Column(name = "details", nullable = false)
    private String details;

    /**
     * Unique identifier for the client related to the log entry.
     */
    @Column(name = "client_uid")
    private String client_uid;

    /**
     * Unique identifier for the user related to the log entry.
     */
    @Column(name = "user_id", nullable = false)
    private String user_id;

    /**
     * IP address from which the log entry was generated.
     */
    @Column(name = "ip_address", nullable = false)
    private String ip_address;

    /**
     * User agent from which the log entry was generated.
     */
    @Column(name = "user_agent", nullable = false)
    private String user_agent;

    /**
     * Type of the related entity.
     */
    @Column(name = "related_entity_type", nullable = false)
    private String related_entity_type;

    /**
     * Unique identifier for the related entity.
     */
    @Column(name = "related_entity_id", nullable = false)
    private String related_entity_id;
}