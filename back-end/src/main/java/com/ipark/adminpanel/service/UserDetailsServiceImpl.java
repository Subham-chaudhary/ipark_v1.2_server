package com.ipark.adminpanel.service;


import com.ipark.adminpanel.entity.Clients;
import com.ipark.adminpanel.entity.Operator;
import com.ipark.adminpanel.enums.Role;
import com.ipark.adminpanel.repository.OperatorRepo;
import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    private final ClientService clientService;

    @Autowired
    public UserDetailsServiceImpl(ClientService clientService) {
        this.clientService = clientService;
    }


    @Override
    public UserDetails loadUserByUsername(String uid) throws UsernameNotFoundException {
        Clients client = clientService.getClientById(UUID.fromString(uid));
        if (client == null) {
            throw new UsernameNotFoundException("Client not found: " + uid);
        }
        Role clientRole = client.getRole();
        List<String> roles = new ArrayList<>();
        roles.add(clientRole.name());
        System.out.println("Client Role: " + clientRole);
        return org.springframework.security.core.userdetails.User.builder()
                .username(client.getClientUid().toString())
                .password("{noop}" + client.getClientUid())
                .roles(roles.toArray(new String[0]))
                .build();
    }
}
