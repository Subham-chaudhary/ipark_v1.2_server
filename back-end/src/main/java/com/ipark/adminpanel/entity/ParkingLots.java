package com.ipark.adminpanel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity class representing a parking lot.
 */
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "parking_lots0")
public class ParkingLots {

    /**
     * Unique identifier for the parking lot.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="lot_uid", nullable = false, updatable = false)
    private String lot_uid; // private key

    /**
     * Name of the parking lot.
     */
    @Column(name="name", nullable = false)
    private String name;

    /**
     * Address of the parking lot.
     */
    @Column(name="address", nullable = false)
    private String address;

    /**
     * City where the parking lot is located.
     */
    @Column(name="city", nullable = false)
    private String city;

    /**
     * State where the parking lot is located.
     */
    @Column(name="state", nullable = false)
    private String state;

    /**
     * ZIP code of the parking lot.
     */
    @Column(name="zip_code", nullable = false)
    private String zip_code;

    /**
     * Number of available slots in the parking lot.
     */
    @Column(name="available_slots", nullable = false)
    private int available_slots;

    /**
     * Total capacity of the parking lot.
     */
    @Column(name="total_capacity", nullable = false)
    private int total_capacity;

    /**
     * Sections within the parking lot.
     */
    @Column(name="sections", nullable = false)
    private String sections;

    /*
    * Floors within the parking lot.
    * */
    @Column(name="floors", nullable = false)
    private String floors;
    /**
     * Owner of the parking lot.
     */
    @Column(name="lot_owner", nullable = false)
    private String lot_owner;

    @Column(name="added_at")
    private String added_at;

    /**
     * Indicates whether the parking lot is closed.
     */
    @Column(name="is_closed", nullable = false)
    private boolean is_closed;

    /**
     * Location of the parking lot.
     */
    @Column(name="location", nullable = false)
    private String location;

    /**
     * Type of the parking lot.
     */
    @Column(name="type_of_lot", nullable = false)
    private String typeOfLot;
}