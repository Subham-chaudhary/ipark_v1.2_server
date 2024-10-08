package com.ipark.adminpanel.controller;

import com.ipark.adminpanel.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Component
public class SlotSocketHandler extends TextWebSocketHandler {

    @Autowired
    private ClientService clientService;


    // bhai listed map ke badle list use kar leta use kar leta 😭😭😭
    private final ConcurrentHashMap<String, Map<String, WebSocketSession>> lotSessions = new ConcurrentHashMap<>();


    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//        String lotId = Objects.requireNonNull(session.getUri()).getQuery().split("=")[1];
        URI sessionUri = session.getUri();
        if(sessionUri == null || sessionUri.getQuery() == null) {
            session.close();
            return;
        }
            String lotUid = Objects.requireNonNull(extractParam(sessionUri.getQuery(), "lotUid"));
            String userUid = Objects.requireNonNull(extractParam(sessionUri.getQuery(), "userUid"));
            session.getAttributes().put("lotUid", lotUid);
            session.getAttributes().put("userUid", userUid);
            lotSessions.computeIfAbsent(lotUid, k -> new ConcurrentHashMap<>()).put(session.getId(), session);
        System.out.println("Connection established: " + session.getId());
        System.out.println("LotSessions: " + lotSessions);
        session.sendMessage(new TextMessage("Connection established: " + session.getId()));
//        clientService.updateClientOnlineStatus(UUID.fromString(userUid), true);
    }

    public String extractParam(String query, String paramName) {
        if (query != null) {
            String[] pairs = query.split("&");
            for (String pair : pairs) {
                String[] keyValue = pair.split("=");
                if (keyValue.length == 2 && keyValue[0].equals(paramName)) {
                    return keyValue[1].replace("\"", ""); // Remove quotes if present
                }
            }
        }
        return null;
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws IOException {
        lotSessions.values().forEach(sessions -> sessions.remove(session.getId()));
//        clientService.updateClientOnlineStatus(UUID.fromString((String) session.getAttributes().get("userUid")), false);
        System.out.println("Connection Closes: " + session.getId());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        ConcurrentHashMap<String, WebSocketSession> currentlotSessions = (ConcurrentHashMap<String, WebSocketSession>) lotSessions.get((String) session.getAttributes().get("lotUid"));
//        ConcurrentHashMap<String, WebSocketSession> currLotSessions = lotSessions.get(session.getAttributes().get("lotUid"));
        if(currentlotSessions == null) {
            session.close();
            return;
        }
        for (WebSocketSession webSocketSession : currentlotSessions.values()) {
            if (webSocketSession.isOpen() && !session.getId().equals(webSocketSession.getId())) {
                webSocketSession.sendMessage(message);
            }
        }
    }

    // fucntion to rerturn the list of sessions for a particular lot
    public Map<String, WebSocketSession> getSessionsByLot(String lotId) {
        Map<String, WebSocketSession> sessions = lotSessions.get(lotId);
        if(sessions != null && !sessions.isEmpty()) {
            return sessions;
        }
        return null;
    }


    public void notifyOperators(String lotId, String message) {
        Map<String, WebSocketSession> sessions = lotSessions.get(lotId);
        System.out.println("Sessions: " + sessions + " Message: " + message + " LotId: " + lotId);
        if(sessions != null && !sessions.isEmpty() && message != null && !message.isEmpty()) {
            sessions.values().forEach(session -> {
                try{ if(!session.isOpen()) {
                    return;
                    }
                    session.sendMessage(new TextMessage(message));
                    System.out.println("Sending message to parking lot " + lotId + ": " + message);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
        }
    }
}
