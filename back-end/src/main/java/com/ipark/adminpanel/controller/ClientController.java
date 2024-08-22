package com.ipark.adminpanel.controller;


import com.ipark.adminpanel.entity.Clients;
import com.ipark.adminpanel.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("v1/client")
public class ClientController {

    @Autowired
    private ClientService clientService;


    @GetMapping("/list-all")
    public ResponseEntity<?> getAllClients() {
        List<Clients> clients = clientService.getAllClients();
        if(clients != null && !clients.isEmpty()) return new ResponseEntity<>(clients, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
