package com.ipark.adminpanel.service;


import com.ipark.adminpanel.entity.Operator;
import com.ipark.adminpanel.repository.OperatorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private OperatorRepo operatorRepo;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Operator user = operatorRepo.findByUserName(userName);
        if(user == null) throw new UsernameNotFoundException("Phone number not found: " + userName);

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUserName())
                .password("{noop}" + user.getPhoneNumber())
                .roles(user.getRoles().toArray(new String[0]))
                .build();
    }
}
