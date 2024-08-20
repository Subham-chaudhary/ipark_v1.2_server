package com.ipark.adminpanel.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity class representing an event.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "events0")
public class Events {

    /**
     * Unique identifier for the event.
     */
    @Id
    @Column(name = "event_uid", nullable = false)
    private String event_uid;

    /**
     * Type of the event.
     */
    @Column(name = "type", nullable = false)
    private String type;

    /**
     * Reference unique identifier related to the event.
     */
    @Column(name = "reference_uid", nullable = false)
    private String reference_uid;

    /**
     * Status of the event.
     */
    @Column(name = "status", nullable = false)
    private String status;

    /**
     * Indicates whether the event is an error.
     */
    @Column(name = "is_an_error")
    private boolean is_an_error;

    /**
     * Unique identifier for the vehicle related to the event.
     */
    @Column(name = "vehicle_uid", nullable = false)
    private String vehicle_uid;

    /**
     * Unique identifier for the client related to the event.
     */
    @Column(name = "client_uid", nullable = false)
    private String client_uid;

    /**
     * Unique identifier for the consumer related to the event.
     */
    @Column(name = "consumer_uid", nullable = false)
    private String consumer_uid;
}