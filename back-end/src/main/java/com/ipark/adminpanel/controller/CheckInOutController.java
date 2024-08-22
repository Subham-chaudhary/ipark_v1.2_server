package com.ipark.adminpanel.controller;

import com.ipark.adminpanel.entity.CheckIn;
import com.ipark.adminpanel.entity.CheckOut;
import com.ipark.adminpanel.service.CheckInOutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/park")
public class CheckInOutController {

    @Autowired
    private CheckInOutService checkInOutService;

    @PostMapping("/check-in")
    public ResponseEntity<?> createEntry(@RequestBody CheckIn data) {
        CheckIn checked = checkInOutService.checkIn(data);
        if(checked == null) return new ResponseEntity<>("No slots available or Please register", HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(checked, HttpStatus.CREATED);
    }

    @PostMapping("/check-out/{slotInfo}")
    public ResponseEntity<?> createCheckOut(@RequestBody CheckOut data, @PathVariable String slotInfo) {
        CheckOut checked = checkInOutService.checkOut(slotInfo, data);
        if(checked == null) return new ResponseEntity<>("Already Checked-out", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(checked, HttpStatus.OK);
    }

    @GetMapping("/check-in/cancel/{slotInfo}")
    public ResponseEntity<?> cancelCheckIn(@PathVariable String slotInfo) {
        CheckIn checked = checkInOutService.cancelCheckIn(slotInfo);
        if(checked == null) return new ResponseEntity<>("Slot Number is invalid", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(checked, HttpStatus.OK);
    }


}
