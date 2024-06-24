package com.ipark.adminpanel.repository;

import com.ipark.adminpanel.entity.CheckIn;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface CheckInRepo extends MongoRepository<CheckIn, ObjectId> {
    public CheckIn findBySlotInfo(String slotInfo);
}
