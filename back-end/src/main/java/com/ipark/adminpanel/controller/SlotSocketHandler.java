package com.ipark.adminpanel.controller;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SlotSocketHandler extends TextWebSocketHandler {

    private final Map<String, Map<String, WebSocketSession>> lotSessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String lotId = session.getUri().getQuery().split("=")[1];
        lotSessions.computeIfAbsent(lotId, k -> new ConcurrentHashMap<>()).put(session.getId(), session);
        System.out.println("Connection established: " + session.getId());
        System.out.println("LotSessions: " + lotSessions);
        session.sendMessage(new TextMessage("Connection established: " + session.getId()));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        lotSessions.values().forEach(sessions -> sessions.remove(session.getId()));
        System.out.println("Connection Closes: " + session.getId());
    }

    public void notifyOperators(String lotId, String message) {
        Map<String, WebSocketSession> sessions = lotSessions.get(lotId);
        System.out.println("Sessions: " + sessions + " Message: " + message + " LotId: " + lotId);
        if(sessions != null) {
            sessions.values().forEach(session -> {
                try{
                    session.sendMessage(new TextMessage(message));
                    System.out.println("Sending message to parking lot " + lotId + ": " + message);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
        }
    }
}
