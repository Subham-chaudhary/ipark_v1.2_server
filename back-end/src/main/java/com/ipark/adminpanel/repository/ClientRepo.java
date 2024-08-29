package com.ipark.adminpanel.repository;

import com.ipark.adminpanel.entity.Clients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClientRepo extends JpaRepository<Clients, UUID> {
    Clients findByRegisteredPhone(String registeredPhone);
    List<Clients> findByLotUID(UUID lotUID);

//    @Query(value = "SELECT * FROM clients0", nativeQuery = true)
//    List<Map<String, Object>> findAllClientsWithAllColumns();
//
//    @Query(value = "SELECT * FROM clients0 WHERE client_uid = :id", nativeQuery = true)
//    Optional<Map<String, Object>> findClientByIdWithAllColumns(@Param("id") UUID id);
}
