package com.ipark.adminpanel.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "consumers0")
public class Consumers {
    @Id
    @Column(name = "consumer_uid", nullable = false)
    private String consumer_uid;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "contacts")
    private String contacts;

    @Column(name = "registered_phone", nullable = false)
    private String registered_phone;

    @Column(name = "is_active")
    private boolean is_active;

    @Column(name = "vehicle_uid")
    private String vehicle_id;

    @Column(name = "is_online")
    private boolean is_online;
}