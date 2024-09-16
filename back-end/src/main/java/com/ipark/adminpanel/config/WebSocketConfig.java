package com.ipark.adminpanel.config;

import com.ipark.adminpanel.controller.SlotSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {


    private final SlotSocketHandler slotSocketHandler;

    public WebSocketConfig(SlotSocketHandler slotSocketHandler) {
        this.slotSocketHandler = slotSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(slotSocketHandler, "/socket/parking").setAllowedOrigins("*");
    }
}
