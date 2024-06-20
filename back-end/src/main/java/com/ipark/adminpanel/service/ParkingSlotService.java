package com.ipark.adminpanel.service;


import com.ipark.adminpanel.entity.ParkingSlot;
import com.ipark.adminpanel.repository.ParkingSlotRepo;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;


@Component
public class ParkingSlotService {

    @Autowired
    private ParkingSlotRepo parkingSlotRepo;
    
    
    public void savingSlot(ParkingSlot parkingSlot) {
        parkingSlotRepo.save(parkingSlot);

    }
    public List<ParkingSlot> getAll(){
        return parkingSlotRepo.findAll();
    }
    public Optional<ParkingSlot> getSlotById(ObjectId id){
        return parkingSlotRepo.findById(id);
    }
    public void deleteSlot(ObjectId id){
        parkingSlotRepo.deleteById(id);
    }
}
