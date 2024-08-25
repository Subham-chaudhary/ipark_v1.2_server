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
import java.util.UUID;


@RestController
@RequestMapping("v1/client")
public class ClientController {

    @Autowired
    private ClientService clientService;



    @GetMapping("/list-all")
    public ResponseEntity<?> getAllClients() {
        List<Clients> clients = clientService.getAllClients();
        if (clients != null && !clients.isEmpty()) return new ResponseEntity<>(clients, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/admin/add")
    public ResponseEntity<?> addAdmin(@RequestBody ClientDto clientDto) {
        // Set the role and preUID specific to admin
        clientDto.setRole("admin");
        clientDto.setPreUID("ADM-0-");

        // Add the client using the service method
        Clients clients = clientService.addClient(clientDto);

        // Check if the client was added successfully
        if (clients != null) {
            return new ResponseEntity<>("Admin Added", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // or HttpStatus.BAD_REQUEST depending on your logic
        }
    }

        @PostMapping("/operator/add")
        public ResponseEntity<?> addOperator(@RequestBody ClientDto clientDto) {
            // Set the role and preUID specific to operator
            clientDto.setRole("admin");
            clientDto.setPreUID("OPR-0-");

            // Add the client using the service method
            Clients clients = clientService.addClient(clientDto);

            // Check if the client was added successfully
            if (clients != null) {
                return new ResponseEntity<>("Operator Added", HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // or HttpStatus.BAD_REQUEST depending on your logic
            }
        }

    }
