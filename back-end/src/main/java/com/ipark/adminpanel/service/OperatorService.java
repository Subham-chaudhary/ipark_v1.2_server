package com.ipark.adminpanel.service;

import com.ipark.adminpanel.entity.Operator;
import com.ipark.adminpanel.repository.OperatorRepo;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Component
public class OperatorService {

    @Autowired
    private OperatorRepo operatorRepo;

    @Transactional
    public void saveEntry(Operator employee) {
        operatorRepo.save(employee);
    }

    @Transactional
    public void saveNewUser(Operator employee) {
        employee.setRoles(Arrays.asList("EMPLOYEE"));
        operatorRepo.save(employee);
    }

    @Transactional
    public void saveAdmin(Operator employee) {
        employee.setRoles(Arrays.asList("EMPLOYEE", "ADMIN"));
        operatorRepo.save(employee);
    }

    public List<Operator> getAll() {
        return operatorRepo.findAll();
    }

    public List<Operator> getAllAdmin() {
        return operatorRepo.findByRoles(Arrays.asList("EMPLOYEE", "ADMIN"));
    }

    public void deleteByPhoneNumber(String phoneNumber) {
        operatorRepo.deleteByPhoneNumber(phoneNumber);
    }

    public Operator findByPhoneNumber(String phoneNumber) {
        return operatorRepo.findByPhoneNumber(phoneNumber);
    }
}
