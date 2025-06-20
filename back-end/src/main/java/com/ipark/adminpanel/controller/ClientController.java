package com.ipark.adminpanel.controller;

import com.ipark.adminpanel.dto.ClientDto;
import com.ipark.adminpanel.entity.Clients;
import com.ipark.adminpanel.enums.Role;
import com.ipark.adminpanel.service.BookingService;
import com.ipark.adminpanel.service.ClientService;
import com.ipark.adminpanel.utils.JwtUtil;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("v2/client")
@CrossOrigin("*")
public class ClientController {

    @Autowired
    private ClientService clientService;
    @Autowired
    private JwtUtil jwtUtil;

//    @Autowired
//    private SlotSocketHandler slotSocketHandler;
//    @Autowired
//    private BookingService bookingService;

    @GetMapping("/list")
    public ResponseEntity<?> getAllClients(@CookieValue("accessToken") String accessToken) {
        if (accessToken == null || accessToken.trim().isEmpty()) {
            reqEnd();
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
//        System.out.println("accessToken: " + accessToken);
        UUID lotUid = jwtUtil.extractAccessTokenLotUid(accessToken);
        List<Clients> clients = clientService.getAllClients(lotUid);
        reqEnd();
//        System.out.println("-------------------------------------------------------------------------------\n");
        if (!clients.isEmpty()) {
            return new ResponseEntity<>(clients, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping("/login/{phoneNumber}")
    public ResponseEntity<?> clientLogin(@PathVariable String phoneNumber, HttpServletResponse res) {
        Clients client = clientService.clientLogin(phoneNumber);
        if (client == null) {
            reqEnd();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
            String accessToken = jwtUtil.generateAccessToken(client.getClientUid().toString(), client.getLotUID().toString());
            String refreshToken = jwtUtil.generateRefreshToken(client.getClientUid().toString(), client.getLotUID().toString());
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


            reqEnd();
            return new ResponseEntity<>(client, HttpStatus.OK);

    }
//    @GetMapping("/logout/{phoneNumber}")
//    public ResponseEntity<?> clientLogout(@PathVariable String phoneNumber) {
////        Clients client = clientService.clientLogout(phoneNumber);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClientById(@PathVariable UUID id) {
        Clients client = clientService.getClientById(id);
        reqEnd();
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/admin/add")
    public ResponseEntity<?> addAdmin(@RequestBody ClientDto clientDto) {
        clientDto.setRole(Role.admin);
        System.out.println("Received clientDto: " + clientDto);
        Clients client = clientService.addClient(clientDto);
        reqEnd();
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/operator/add")
    public ResponseEntity<?> addOperator(@RequestBody ClientDto clientDto) {
        clientDto.setRole(Role.valueOf("operator"));
        Clients client = clientService.addClient(clientDto);
        reqEnd();
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/admin/update/{id}")
    public ResponseEntity<?> updateClient(@PathVariable UUID id, @RequestBody ClientDto clientDto, @CookieValue("accessToken") String accessToken) {
        if (accessToken == null || accessToken.trim().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        clientDto.setUpdatedBy(jwtUtil.extractAccessTokenUid(accessToken));
        Clients client = clientService.updateClient(id, clientDto);
        reqEnd();
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    public void reqEnd(){
        System.out.println("\n--------------------------------------------------------------------------------------------\n");
    }
}
