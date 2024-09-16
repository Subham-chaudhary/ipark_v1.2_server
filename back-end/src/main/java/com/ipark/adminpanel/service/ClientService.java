package com.ipark.adminpanel.service;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ipark.adminpanel.convert.ClientDtoConverter;
import com.ipark.adminpanel.dto.ClientDto;
import com.ipark.adminpanel.entity.Clients;
import com.ipark.adminpanel.repository.ClientRepo;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class ClientService {
    private final ClientRepo clientRepo;
    private final ModelMapper modelMapper;

    @Autowired
    private ClientDtoConverter clientDtoConverter;

    @Autowired
    public ClientService(ClientRepo clientRepo, ModelMapper modelMapper) {
        this.clientRepo = clientRepo;
        this.modelMapper = modelMapper;
    }

    public List<Clients> getAllClients(UUID lotID) {
        return clientRepo.findByLotUID(lotID);
    }

    public Clients getClientById(UUID id) {
        return clientRepo.findById(id).orElse(null);
    }

    public Clients clientLogout(String phoneNumber) {
        Clients client = clientRepo.findByRegisteredPhone(phoneNumber);
        if (client != null) {
            client.setIsOnline(false);
            clientRepo.save(client);
        }
        return client;
    }

    public Clients clientLogin(String phoneNumber) {
        Clients client = clientRepo.findByRegisteredPhone(phoneNumber);
        if (client != null) {
//            client.setOnline(true);
            Clients saved = clientRepo.save(client);
            System.out.println("Retrieved = " + saved);
        }
        return client;
    }
//
//    @Transactional
//    public Clients addClient(ClientDto clientDto) {
//        Clients clients = ClientDtoConverter.convertToEntity(clientDto);
//        System.out.println("clients before save = " + clients);
//        clientRepo.save(clients);
//        //Optional<Clients> fetched = Optional.ofNullable(clientRepo.findByClientUid(clients.getClientUid()));
//        Clients fetched = clientRepo.findByClientUid(clients.getClientUid());
//        System.out.println("Fetched after save = " + fetched);
//        return fetched;
//    }
////
//@Transactional
//public Clients updateClient(UUID id, ClientDto clientDto) {
//    Clients existingClient = clientRepo.findById(id).orElse(null);
//    if (existingClient != null) {
//        Clients updatedClient = ClientDtoConverter.convertToEntity(clientDto);
//        updatedClient.setClientUid(existingClient.getClientUid());
//        System.out.println("updatedClient = " + updatedClient);
//        return clientRepo.save(updatedClient);
//    }
//    return null;}

    @Transactional
    public Clients updateClient(UUID id, ClientDto clientDto) {
        Clients existingClient = clientRepo.findById(id).orElse(null);
        if (existingClient != null) {
            ClientDtoConverter.updateEntityFromDto(clientDto, existingClient);
            System.out.println("Updated client = " + existingClient);
            return clientRepo.save(existingClient);
        }
        return null;
    }

    @Transactional
    public Clients addClient(ClientDto clientDto) {
        Clients clients = modelMapper.map(clientDto, Clients.class);
        System.out.println("clients = " + clients);
        clientRepo.save(clients);
        return clientRepo.findByClientUid(clients.getClientUid());
    }

//    @Transactional
//    public Clients updateClient(UUID id, ClientDto clientDto) {
//        Clients existingClient = clientRepo.findById(id).orElse(null);
//        if (existingClient != null) {
//            modelMapper.typeMap(ClientDto.class, Clients.class)
//                    .addMappings(mapper -> mapper.skip(Clients::setClientUid));
//            modelMapper.map(clientDto, existingClient);
//            return clientRepo.save(existingClient);
//        }
//        return null;
//    }
}