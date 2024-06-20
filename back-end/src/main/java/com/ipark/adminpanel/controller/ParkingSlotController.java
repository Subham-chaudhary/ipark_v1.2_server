package com.ipark.adminpanel.controller;

import java.time.LocalDateTime;
import java.sql.Date;
import java.util.List;
import com.ipark.adminpanel.entity.ParkingSlot;
import com.ipark.adminpanel.repository.ParkingSlotRepo;
import com.ipark.adminpanel.service.ParkingSlotService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/parkingSlot")
public class ParkingSlotController {

    @Autowired
    ParkingSlotService parkingSlotService;

    @GetMapping
    public List<ParkingSlot> getAll() {
        return parkingSlotService.getAll();
    }

    @PostMapping
    public boolean createEntry(@RequestBody ParkingSlot entry) {
        entry.setTime(LocalDateTime.now());
        parkingSlotService.savingSlot(entry);
        return true;
    }

    @GetMapping("id/{id}")
    public ParkingSlot getSlotById(@PathVariable ObjectId id) {
        return parkingSlotService.getSlotById(id).orElse(null);
    }
    @DeleteMapping("id/{id}")
    public boolean deleteSlot(@PathVariable ObjectId id) {
        parkingSlotService.deleteSlot(id);
        return true;
    }
    @PutMapping("id/{id}")
    public ParkingSlot updateSlot(@PathVariable ObjectId id, @RequestBody ParkingSlot newEntry) {
        ParkingSlot old =parkingSlotService.getSlotById(id).orElse(null);
        if (old != null) {
            // Toggle the isBooked field
            old.setIsBooked(!old.getIsBooked());
            old.setTime(newEntry.getTime());
            parkingSlotService.savingSlot(old);
        }

        return old;
    }

}
