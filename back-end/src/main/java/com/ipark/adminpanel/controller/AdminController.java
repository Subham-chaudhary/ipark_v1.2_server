package com.ipark.adminpanel.controller;


import com.ipark.adminpanel.entity.Customer;
import com.ipark.adminpanel.entity.Operator;
import com.ipark.adminpanel.service.CustomerService;
import com.ipark.adminpanel.service.OperatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private OperatorService operatorService;
    @Autowired
    private CustomerService customerService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody Operator user) {
        operatorService.saveAdmin(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/signup/add-employee")
    public ResponseEntity<?> signUpEmployee(@RequestBody Operator user) {
        operatorService.saveNewUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/getEmployee")
    public ResponseEntity<?> viewEmployee() {
        List<Operator> user = operatorService.getAll();
        if (!user.isEmpty() && user != null) return new ResponseEntity<>(user, HttpStatus.FOUND);
        return new ResponseEntity<>("DATABASE EMPTY", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getEmployee/{phoneNumber}")
    public ResponseEntity<?> viewEmployeeByPhoneNumber(@PathVariable String phoneNumber) {
        Operator user = operatorService.findByPhoneNumber(phoneNumber);
        if (user != null) return new ResponseEntity<>(user, HttpStatus.FOUND);
        return new ResponseEntity<>("DATABASE EMPTY", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getCustomer/{phoneNumber}")
    public ResponseEntity<?> getCustomerByPhoneNumber(@PathVariable String phoneNumber) {
        Customer user = customerService.findByPhoneNumber(phoneNumber);
        if (user != null) return new ResponseEntity<>(user, HttpStatus.FOUND);
        return new ResponseEntity<>("DATABASE EMPTY", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getCustomer")
    public ResponseEntity<?> getCustomer() {
        List<Customer> user = customerService.getAll();
        if (!user.isEmpty() && user != null) return new ResponseEntity<>(user, HttpStatus.FOUND);
        return new ResponseEntity<>("DATABASE EMPTY", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/customer/{phoneNumber}")
    public ResponseEntity<?> deleteCustomerByPhoneNumber(@PathVariable String phoneNumber) {
        Customer user = customerService.findByPhoneNumber(phoneNumber);
        if (user != null) {
            customerService.deleteByPhoneNumber(phoneNumber);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/employee/{phoneNumber}")
    public ResponseEntity<?> deleteEmployeeByPhoneNumber(@PathVariable String phoneNumber) {
        Operator user = operatorService.findByPhoneNumber(phoneNumber);
        if (user != null) {
            operatorService.deleteByPhoneNumber(phoneNumber);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    @GetMapping("get-admin")
    public ResponseEntity<?> getAllAdmins() {
        List<Operator> user = operatorService.getAllAdmin();
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }
}
