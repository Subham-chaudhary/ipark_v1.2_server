package com.ipark.adminpanel.repository;

import com.ipark.adminpanel.entity.ParkingSlot;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface ParkingSlotRepo extends MongoRepository<ParkingSlot, ObjectId> {
    List<ParkingSlot> findByIsBooked(boolean isBooked);
}
