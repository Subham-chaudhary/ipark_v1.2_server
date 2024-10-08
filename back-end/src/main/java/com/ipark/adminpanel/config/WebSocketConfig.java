package com.ipark.adminpanel.config;

import com.ipark.adminpanel.controller.SlotSocketHandler;
import com.ipark.adminpanel.service.ClientService;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Setter
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {


//    public void setSlotSocketHandler(slotSocketHandler slotSocketHandler) {
//        this.slotSocketHandler = slotSocketHandler;
//    }
    
    private SlotSocketHandler slotSocketHandler;

    public WebSocketConfig(SlotSocketHandler slotSocketHandler) {
        this.slotSocketHandler = slotSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(slotSocketHandler, "/ws/parking").setAllowedOrigins("*");
    }
}
