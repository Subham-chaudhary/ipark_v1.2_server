package com.ipark.adminpanel.convert;

import com.ipark.adminpanel.dto.ClientDto;
import com.ipark.adminpanel.entity.Clients;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;

@Component
public class ClientDtoConverter {

    public static Clients convertToEntity(ClientDto clientDto) {
        Clients clients = new Clients();
//        clients.setClientUid(UUID.fromString(clientDto.getClientUid()));
        clients.setClientUid(clientDto.getClientUid());
        System.out.println("DTOClientUID = " + clientDto.getClientUid());
        clients.setName(clientDto.getName());
        clients.setContacts(clientDto.getContacts());
        clients.setRegisteredPhone(clientDto.getRegisteredPhone());
        clients.setRole(clientDto.getRole());
        System.out.println("DTORole = " + clientDto.getRole());
        System.out.println("ENTITYRole = " + clients.getRole());
        clients.setCurrentSession(clientDto.getCurrentSession());
//        clients.setCreatedAt(clientDto.getCreatedAt() != null ? clientDto.getCreatedAt() : LocalDateTime.now());
        clients.setBot(clientDto.isBot());
        clients.setCreatedBy(clientDto.getCreatedBy());
        clients.setUpdatedBy(clientDto.getUpdatedBy());
        clients.setUpdatedAt(clientDto.getUpdatedAt());
        clients.setActive(clientDto.isActive());
        clients.setOnline(clientDto.isOnline());
        clients.setLotUID(clientDto.getLotUID());
        clients.setShiftSchedule(clientDto.getShiftSchedule());
        return clients;
    }

    // Convert Clients entity to ClientDto
    public static ClientDto convertToDto(Clients clients) {
        ClientDto clientDto = new ClientDto();
//        clientDto.setClientUid(clients.getClientUid());
        clientDto.setName(clients.getName());
        clientDto.setContacts(clients.getContacts());
        clientDto.setRegisteredPhone(clients.getRegisteredPhone());
        clientDto.setRole(clients.getRole());
        clientDto.setCurrentSession(clients.getCurrentSession());
        clientDto.setCreatedAt(clients.getCreatedAt());
        clientDto.setBot(clients.isBot());
        clientDto.setCreatedBy(clients.getCreatedBy());
        clientDto.setUpdatedBy(clients.getUpdatedBy());
        clientDto.setUpdatedAt(clients.getUpdatedAt());
        clientDto.setActive(clients.isActive());
        clientDto.setOnline(clients.isOnline());
        clientDto.setLotUID(clients.getLotUID());
        clientDto.setShiftSchedule(clients.getShiftSchedule());
        return clientDto;
    }
}
