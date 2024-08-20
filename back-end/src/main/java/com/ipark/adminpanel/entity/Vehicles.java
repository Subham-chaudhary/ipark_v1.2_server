package com.ipark.adminpanel.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity class representing a vehicle.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "vehicles0")
public class Vehicles {

    /**
     * Unique identifier for the vehicle.
     */
    @Id
    @Column(name = "vehicle_uid", nullable = false)
    private String vehicle_uid;

    /**
     * Number (license plate) of the vehicle.
     */
    @Column(name = "number", nullable = false)
    private String number;

    /**
     * Color of the vehicle.
     */
    @Column(name = "color")
    private String color;

    /**
     * Size of the vehicle.
     */
    @Column(name = "size")
    private String size;

    /**
     * Number of wheels on the vehicle.
     */
    @Column(name = "wheel_count")
    private int wheel_count;

    /**
     * Indicates whether the vehicle is a taxi.
     */
    @Column(name = "is_taxi")
    private boolean is_taxi;

    /**
     * Indicates whether the vehicle is currently on the road.
     */
    @Column(name = "is_on_road")
    private boolean is_on_road;

    /**
     * Indicates whether the vehicle is currently parked.
     */
    @Column(name = "is_parked")
    private boolean is_parked;

    /**
     * Unique identifier for the consumer who owns the vehicle.
     */
    @Column(name = "consumer_id", nullable = false)
    private String consumer_id;
}