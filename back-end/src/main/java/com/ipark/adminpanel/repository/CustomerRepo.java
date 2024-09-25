package com.ipark.adminpanel.repository;

import com.ipark.adminpanel.entity.Customer;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface CustomerRepo extends MongoRepository<Customer, ObjectId> {
    public Customer findByPhoneNumber(String PhoneNumber);
    public void deleteByPhoneNumber(String PhoneNumber);
}
    