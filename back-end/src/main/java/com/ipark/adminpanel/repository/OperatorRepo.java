package com.ipark.adminpanel.repository;

import com.ipark.adminpanel.entity.Operator;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface OperatorRepo extends MongoRepository<Operator, ObjectId> {
    List<Operator> findByRoles(List<String> role);
    Operator findByPhoneNumber(String phoneNumber);
    void deleteByPhoneNumber(String phoneNumber);
    Operator findByUserName(String userName);
}
