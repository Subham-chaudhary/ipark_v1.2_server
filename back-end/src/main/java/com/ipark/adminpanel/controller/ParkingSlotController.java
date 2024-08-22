package com.ipark.adminpanel.controller;

import java.time.LocalDateTime;
import java.util.List;
import com.ipark.adminpanel.entity.ParkingSlot;
import com.ipark.adminpanel.service.ParkingSlotService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/parkingSlot")
public class ParkingSlotController {

    @Autowired
    ParkingSlotService parkingSlotService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<ParkingSlot> slots = parkingSlotService.getAll();
        if(slots != null && !slots.isEmpty()) return new ResponseEntity<>(slots, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping
    public ResponseEntity<?> createEntry(@RequestBody ParkingSlot entry) {
        parkingSlotService.savingSlot(entry);
        return new ResponseEntity<>("True", HttpStatus.CREATED);
    }

    @GetMapping("id/{id}")
    public ResponseEntity<?> getSlotById(@PathVariable ObjectId id) {
        ParkingSlot slot = parkingSlotService.getSlotById(id).orElse(null);
        if(slot != null) return new ResponseEntity<>(slot, HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("id/{id}")
    public ResponseEntity<?> deleteSlot(@PathVariable ObjectId id) {
        parkingSlotService.deleteSlot(id);
        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }

    @PutMapping("id/{id}")
    public ResponseEntity<?> updateSlot(@PathVariable ObjectId id) {
        ParkingSlot slot = parkingSlotService.updateSlotById(id);
        if(slot != null) return new ResponseEntity<>(slot, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("emptySlots")
    public ResponseEntity<?> getAllEmptySlots() {
        List<ParkingSlot> slots = parkingSlotService.isEmpty();
        if(slots != null && !slots.isEmpty()) return new ResponseEntity<>(slots, HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
