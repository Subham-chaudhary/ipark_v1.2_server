package com.ipark.adminpanel.config;

import com.ipark.adminpanel.controller.SlotSocketHandler;
import com.ipark.adminpanel.service.ClientService;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Setter
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    
    private final SlotSocketHandler slotSocketHandler;

    @Autowired
    public WebSocketConfig(SlotSocketHandler slotSocketHandler) {
        this.slotSocketHandler = slotSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(slotSocketHandler, "/ws/parq" , "/ws/client").setAllowedOrigins("*");
    }

}
