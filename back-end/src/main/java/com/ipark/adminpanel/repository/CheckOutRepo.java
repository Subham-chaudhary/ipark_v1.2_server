package com.ipark.adminpanel.repository;

import com.ipark.adminpanel.entity.CheckOut;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface CheckOutRepo extends MongoRepository<CheckOut, ObjectId> {
}
