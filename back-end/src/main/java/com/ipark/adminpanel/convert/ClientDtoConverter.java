package com.ipark.adminpanel.convert;

import com.ipark.adminpanel.dto.ClientDto;
import com.ipark.adminpanel.entity.Clients;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ClientDtoConverter {

    // Convert ClientDto to Clients entity
    public static Clients convertToEntity(ClientDto clientDto) {
        Clients clients = new Clients();
        clients.setName(clientDto.getName());
        clients.setEmail(clientDto.getEmail());
        clients.setPreUID(clientDto.getPreUID());
        clients.setSecondaryNumber(clientDto.getSecondary_number());
        clients.setRegisteredPhone(clientDto.getRegistered_phone());
        clients.setShiftSchedule(clientDto.getShift_schedule());
        clients.setAddedBy(clientDto.getAddedBy());
        clients.setCreatedAt(LocalDateTime.now());
        clients.setActive(clientDto.isActive());
//        clients.setOnline(clientDto.getIsOnline());
        clients.setBot(clientDto.isBot());
        clients.setRole(clientDto.getRole());
        return  clients;
    }

    // Convert Clients entity to ClientDto
    public static ClientDto convertToDto(Clients clients) {
        ClientDto clientDto = new ClientDto();
        clientDto.setName(clients.getName());
        clientDto.setEmail(clients.getEmail());
        clientDto.setPreUID(clients.getPreUID());
        clientDto.setSecondary_number(clients.getSecondaryNumber());
        clientDto.setRegistered_phone(clients.getRegisteredPhone());
        clientDto.setShift_schedule(clients.getShiftSchedule());
        clientDto.setAddedBy(clients.getAddedBy());
        clientDto.setBot(clients.isBot());
        clientDto.setRole(clients.getRole());
        return clientDto;
    }
}
