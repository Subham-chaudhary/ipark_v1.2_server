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

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private OperatorRepo operatorRepo;
    @Autowired
    private ClientService clientService;


    @Override
    public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
        Clients client = clientService.clientLogin(phoneNumber);
        if (client == null) {
            throw new UsernameNotFoundException("Phone number not found: " + phoneNumber);
        }

        Role clientRole = client.getRole();
        String roleName = clientRole.name();

        return org.springframework.security.core.userdetails.User.builder()
                .username(client.getRegisteredPhone())
                .password("{noop}" + client.getClientUid())
                .roles(roleName)
                .build();
    }
}
