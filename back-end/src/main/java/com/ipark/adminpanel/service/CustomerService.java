package com.ipark.adminpanel.service;

import com.ipark.adminpanel.entity.CheckIn;
import com.ipark.adminpanel.entity.Customer;
import com.ipark.adminpanel.repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Transactional
    public void saveUser(Customer user) {
        customerRepo.save(user);
    }

    public List<Customer> getAll() {
        return customerRepo.findAll();
    }

    public Customer findByPhoneNumber(String phoneNumber) {
        return customerRepo.findByPhoneNumber(phoneNumber);
    }

    public void deleteByPhoneNumber(String phoneNumber) {
        customerRepo.deleteByPhoneNumber(phoneNumber);
    }

    public void updateCustomerByCheckIn(CheckIn data) {
        Customer user = findByPhoneNumber(data.getPhoneNumber());
        List<CheckIn> list = user.getCheckIns();
        list.add(data);
        user.setCheckIns(list);
        saveUser(user);
    }
}
