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

//    public List<Map<String, Object>> getAllClientsWithAllColumns() {
//        return clientRepo.findAllClientsWithAllColumns();
//    }
//
//    public Optional<Map<String, Object>> getClientByIdWithAllColumns(UUID id) {
//        return clientRepo.findClientByIdWithAllColumns(id);
//    }
    public Clients getClientById(UUID id) {
        return clientRepo.findById(id).orElse(null);
    }

    public Clients ClientLogin(String phoneNumber) {
        Clients client = clientRepo.findByRegisteredPhone(phoneNumber);
        if (client != null) {
            client.setOnline(true);
           Clients saved=clientRepo.save(client);
            System.out.println("saved = " + saved);

        }
        return client;
    }


    @Transactional
    public Clients addClient(ClientDto clientDto) {
        Clients clients = ClientDtoConverter.convertToEntity(clientDto);
        System.out.println("clients = " + clients);
        return clientRepo.save(clients);
    }
}