package com.ipark.adminpanel.repository;

import com.ipark.adminpanel.entity.Clients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepo extends JpaRepository<Clients, String> {
}
