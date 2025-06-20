package com.ipark.adminpanel.controller;

import com.ipark.adminpanel.entity.Customer;
import com.ipark.adminpanel.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/signup")
    public Customer signup(@RequestBody Customer user) {
        customerService.saveUser(user);
        return user;
    }

    @PostMapping("/login")
    public Customer login(@RequestBody Customer user) {
        return customerService.findByPhoneNumber(user.getPhoneNumber());
    }
}
