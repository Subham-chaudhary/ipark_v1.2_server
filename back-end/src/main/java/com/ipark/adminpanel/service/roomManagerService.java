package com.ipark.adminpanel.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
public class roomManagerService {

    private final Map<UUID, Set<WebSocketSession>> rooms = new ConcurrentHashMap<>();

    public void addClientToRoom(UUID lotUID, WebSocketSession session) {
        Set<WebSocketSession> sessions = rooms.computeIfAbsent(lotUID, k -> new HashSet<>());
        sessions.add(session);
    }
}
