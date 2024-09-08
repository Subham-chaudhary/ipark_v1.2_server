package com.ipark.adminpanel.controller;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ipark.adminpanel.dto.ClientDto;
import com.ipark.adminpanel.entity.Clients;
import com.ipark.adminpanel.enums.Role;
import com.ipark.adminpanel.service.ClientService;
import com.ipark.adminpanel.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("v2/client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/list/{lotID}")
    public ResponseEntity<?> getAllClients(@RequestHeader("Cookie") String Cookie, @PathVariable UUID lotID) {
        System.out.println(Cookie);
        List<Clients> clients = clientService.getAllClients(lotID);
        if (!clients.isEmpty()) {
            return new ResponseEntity<>(clients, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/login/{phoneNumber}")
    public ResponseEntity<?> clientLogin(@PathVariable String phoneNumber, HttpServletResponse res) {
        Clients client = clientService.clientLogin(phoneNumber);
        if (client != null) {
            String roleName = client.getRole().name();
            String accessToken = jwtUtil.generateAccessToken(client.getClientUid().toString(), roleName);
            String refreshToken = jwtUtil.generateRefreshToken(client.getClientUid().toString(), roleName);

            ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .build();
            res.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

            ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken", accessToken)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .build();
            res.addHeader(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());

            return new ResponseEntity<>(client, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/logout/{uid}")
    public ResponseEntity<?> clientLogout(@PathVariable UUID uid) {
        Clients client = clientService.clientLogout(uid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClientById(@PathVariable UUID id) {
        Clients client = clientService.getClientById(id);
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/admin/add")
    public ResponseEntity<?> addAdmin(@RequestBody ClientDto clientDto) {
        clientDto.setRole(Role.admin);
        Clients client = clientService.addClient(clientDto);
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/operator/add")
    public ResponseEntity<?> addOperator(@RequestBody ClientDto clientDto) {
        clientDto.setRole(Role.valueOf("operator"));
        Clients client = clientService.addClient(clientDto);
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/admin/update/{id}")
    public ResponseEntity<?> updateClient(@PathVariable UUID id, @RequestBody ClientDto clientDto) {
        Clients client = clientService.updateClient(id, clientDto);
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}