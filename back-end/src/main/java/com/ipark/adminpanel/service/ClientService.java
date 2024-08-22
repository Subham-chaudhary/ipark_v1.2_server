package com.ipark.adminpanel.service;

import com.ipark.adminpanel.entity.Clients;
import com.ipark.adminpanel.repository.ClientRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
private final ClientRepo clientRepo;

    public ClientService(ClientRepo clientRepo) {
        this.clientRepo = clientRepo;
    }

    public List<Clients> getAllClients() {
        return clientRepo.findAll();
    }

    public Clients getClientById(String id) {
        return clientRepo.findById(id).orElse(null);
    }

    public Clients addClient(Clients client) {
        return clientRepo.save(client);
    }

    public Clients updateClient(Clients client) {
        return clientRepo.save(client);
    }

    public void deleteClient(String id) {
        clientRepo.deleteById(id);
    }
}
