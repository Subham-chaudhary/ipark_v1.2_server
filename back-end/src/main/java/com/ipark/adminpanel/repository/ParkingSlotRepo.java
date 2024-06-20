package com.ipark.adminpanel.repository;

import com.ipark.adminpanel.entity.ParkingSlot;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface ParkingSlotRepo extends MongoRepository<ParkingSlot, ObjectId> {
}
