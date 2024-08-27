package com.ipark.adminpanel.controller;


import com.ipark.adminpanel.convert.ClientDtoConverter;
import com.ipark.adminpanel.dto.ClientDto;
import com.ipark.adminpanel.entity.Clients;
import com.ipark.adminpanel.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("v1/client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/list-all")
    public ResponseEntity<?> getAllClients() {
//        List<Map<String, Object>> clients = clientService.getAllClientsWithAllColumns();
        List<Clients> clients = clientService.getAllClients();
        if (!clients.isEmpty()) {
            return new ResponseEntity<>(clients, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/phone/{phoneNumber}")
    public ResponseEntity<?> ClientLogin(@PathVariable String phoneNumber) {
        Clients client = clientService.ClientLogin(phoneNumber);
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClientById(@PathVariable UUID id) {
//        Optional<Map<String, Object>> client = clientService.getClientByIdWithAllColumns(id);
//        return client.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
//                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        Clients client = clientService.getClientById(id);
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/admin/add")
    public ResponseEntity<?> addAdmin(@RequestBody ClientDto clientDto) {
        clientDto.setRole("admin");
        clientDto.setPreUID("ADM-0-");
        Clients client = clientService.addClient(clientDto);
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/operator/add")
    public ResponseEntity<?> addOperator(@RequestBody ClientDto clientDto) {
        clientDto.setRole("operator");
        clientDto.setPreUID("OPR-0-");
        Clients client = clientService.addClient(clientDto);
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}