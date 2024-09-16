package com.ipark.adminpanel.convert;

import com.ipark.adminpanel.dto.ClientDto;
import com.ipark.adminpanel.entity.Clients;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.UUID;

@Component
public class ClientDtoConverter {
    public static void updateEntityFromDto(ClientDto clientDto, Clients existingClient) {
        if (clientDto.getName() != null) {
            existingClient.setName(clientDto.getName());
        }
        if (clientDto.getContacts() != null) {
            existingClient.setContacts(clientDto.getContacts());
        }
        if (clientDto.getRegisteredPhone() != null) {
            existingClient.setRegisteredPhone(clientDto.getRegisteredPhone());
        }
        if (clientDto.getRole() != null) {
            existingClient.setRole(clientDto.getRole());
        }
        if (clientDto.getCurrentSession() != null) {
            existingClient.setCurrentSession(clientDto.getCurrentSession());
        }
        if (clientDto.getUpdatedBy() != null) {
            existingClient.setUpdatedBy(clientDto.getUpdatedBy());
        }
        if (clientDto.getIsBot() != null) {
            existingClient.setIsBot(clientDto.getIsBot());
        }
        if (clientDto.getIsActive() != null) {
            existingClient.setIsActive(clientDto.getIsActive());
        }
        if (clientDto.getIsOnline() != null) {
            existingClient.setIsOnline(clientDto.getIsOnline());
        }
        if (clientDto.getLotUID() != null) {
            existingClient.setLotUID(clientDto.getLotUID());
        }
        if (clientDto.getShiftSchedule() != null) {
            existingClient.setShiftSchedule(clientDto.getShiftSchedule());
        }
    }

    // Keep the convertToEntity method for creating new entities
    public static Clients convertToEntity(ClientDto clientDto) {
        Clients clients = new Clients();
        updateEntityFromDto(clientDto, clients);
        clients.setClientUid(clientDto.getClientUid());
        clients.setName(clientDto.getName());
        clients.setContacts(clientDto.getContacts());
        clients.setRegisteredPhone(clientDto.getRegisteredPhone());
        clients.setRole(clientDto.getRole());
        clients.setCurrentSession(clientDto.getCurrentSession());
//        clients.setCreatedAt(clientDto.getCreatedAt() != null ? clientDto.getCreatedAt() : LocalDateTime.now());
        clients.setCreatedBy(clientDto.getCreatedBy());
        clients.setUpdatedBy(clientDto.getUpdatedBy());
        clients.setUpdatedAt(clientDto.getUpdatedAt());
        clients.setIsBot(clientDto.getIsBot());
        clients.setIsActive(clientDto.getIsActive());
       clients.setIsOnline(clientDto.getIsOnline());
        clients.setLotUID(clientDto.getLotUID());
        clients.setShiftSchedule(clientDto.getShiftSchedule());
        System.out.println("DTO convereted entity::  "+clients);
        return clients;
    }

    // Convert Clients entity to ClientDto
//    public static ClientDto convertToDto(Clients clients) {
//        ClientDto clientDto = new ClientDto();
//        clientDto.setClientUid(clients.getClientUid());
//        clientDto.setName(clients.getName());
//        clientDto.setContacts(clients.getContacts());
//        clientDto.setRegisteredPhone(clients.getRegisteredPhone());
//        clientDto.setRole(clients.getRole());
//        clientDto.setCurrentSession(clients.getCurrentSession());
//        clientDto.setCreatedAt(clients.getCreatedAt());
//        clientDto.setBot(clients.isBot());
//        clientDto.setCreatedBy(clients.getCreatedBy());
//        clientDto.setUpdatedBy(clients.getUpdatedBy());
//        clientDto.setUpdatedAt(clients.getUpdatedAt());
//        clientDto.setActive(clients.isActive());
//        clientDto.setOnline(clients.isOnline());
//        clientDto.setLotUID(clients.getLotUID());
//        clientDto.setShiftSchedule(clients.getShiftSchedule());
//        return clientDto;
//    }
}
