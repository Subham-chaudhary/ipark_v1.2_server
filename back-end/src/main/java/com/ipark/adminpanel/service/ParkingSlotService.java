package com.ipark.adminpanel.service;


import com.ipark.adminpanel.entity.ParkingSlot;
import com.ipark.adminpanel.repository.ParkingSlotRepo;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Component
public class ParkingSlotService {

    @Autowired
    private ParkingSlotRepo parkingSlotRepo;
    
    
    public void savingSlot(ParkingSlot parkingSlot) {
        parkingSlot.setTime(LocalDateTime.now());
        parkingSlot.setIsBooked(false);
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

    public ParkingSlot updateSlotById(ObjectId id) {
        ParkingSlot slot = parkingSlotRepo.findById(id).orElse(null);
        if(slot != null) {
            slot.setIsBooked(!slot.getIsBooked());
            slot.setTime(LocalDateTime.now());
            parkingSlotRepo.save(slot);
        }
        return slot;
    }

    public List<ParkingSlot> isEmpty() {
        return parkingSlotRepo.findByIsBooked(false);
    }

    public ParkingSlot getFirstAvailableSlot() {
        return parkingSlotRepo.findByIsBooked(false).getFirst();
    }
}
