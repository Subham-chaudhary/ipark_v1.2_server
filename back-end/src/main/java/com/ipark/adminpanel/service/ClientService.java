package com.ipark.adminpanel.service;

import com.ipark.adminpanel.convert.ClientDtoConverter;
import com.ipark.adminpanel.dto.ClientDto;
import com.ipark.adminpanel.entity.Clients;
import com.ipark.adminpanel.repository.ClientRepo;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class ClientService {
    private final ClientRepo clientRepo;

    @Autowired
    ClientDtoConverter clientDtoConverter;

    public ClientService(ClientRepo clientRepo) {
        this.clientRepo = clientRepo;
    }

    public List<Clients> getAllClients() {
        return clientRepo.findAll();
    }

    @Transactional
    public Clients addClient(ClientDto clientDto) {
        // Convert ClientDto to Clients entity using the converter
        Clients clients = ClientDtoConverter.convertToEntity(clientDto);

        // Additional logic before saving
        if (Objects.equals(clients.getRole(), "admin") || Objects.equals(clients.getRole(), "parq")) {
            clientRepo.save(clients);
        }

        return clients;


    }
}