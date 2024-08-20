package com.ipark.adminpanel.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity class representing a parking slot.
 */
@Data
@NoArgsConstructor
@Entity
@AllArgsConstructor
@Table(name = "parking_slots0")
public class ParkingSlots {

    /**
     * Unique identifier for the parking slot.
     */
    @Id
    @Column(name = "slot_uid", nullable = false)
    private String slot_uid;

    /**
     * Unique identifier for the consumer.
     */
    @Column(name = "consumer_uid", nullable = false)
    private String consumer_uid;

    /**
     * Unique identifier for the parking lot.
     */
    @Column(name = "lot_uid", nullable = false)
    private String lot_uid;

    /**
     * Indicates whether the parking slot is active.
     */
    @Column(name = "is_active")
    private boolean is_active;

    /**
     * Indicates whether the parking slot is booked.
     */
    @Column(name = "is_booked")
    private boolean is_booked;

    /**
     * Indicates whether the parking slot is booked online.
     */
    @Column(name = "is_booked_online")
    private boolean is_booked_online;

    /**
     * Physical property of the parking slot.
     */
    @Column(name = "physical_property", nullable = false)
    private String physical_property;
}