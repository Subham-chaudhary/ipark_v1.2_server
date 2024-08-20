package com.ipark.adminpanel.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "clients0")
public class Clients {
    @Id
    @Column(name = "client_uid", nullable = false)
    private String client_uid;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "contacts", nullable = false)
    private String contacts;

    @Column(name = "registered_phone", nullable = false)
    private String registered_phone;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "created_at", nullable = false)
    private String created_at;

    @Column(name = "last_login_at", nullable = false)
    private String last_login_at;

    @Column(name = "is_active")
    private boolean is_active;

    @Column(name = "is_online")
    private boolean is_online;

    @Column(name = "lot_uid", nullable = false)
    private String lot_uid;

    @Column(name = "shift_schedule", nullable = false)
    private String shift_schedule;
}