package com.ipark.adminpanel.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity class representing a consumer.
 */
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "consumers0")
public class Consumers {

    /**
     * Unique identifier for the consumer.
     */
    @Id
    @Column(name = "consumer_uid", nullable = false)
    private String consumer_uid;

    /**
     * Name of the consumer.
     */
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * Contact information of the consumer.
     */
    @Column(name = "contacts")
    private String contacts;

    /**
     * Registered phone number of the consumer.
     */
    @Column(name = "registered_phone", nullable = false)
    private String registered_phone;

    /**
     * Indicates whether the consumer is active.
     */
    @Column(name = "is_active")
    private boolean is_active;

    /**
     * Timestamp when the consumer was created.
     */
    @Column(name = "created_at")
    private String created_at;

    /**
     * Unique identifier for the vehicle owned by the consumer.
     */
    @Column(name = "vehicle_uid")
    private String vehicle_id;

    /**
     * Indicates whether the consumer is online.
     */
    @Column(name = "is_online")
    private boolean is_online;
}