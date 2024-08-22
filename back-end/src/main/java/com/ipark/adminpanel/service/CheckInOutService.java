package com.ipark.adminpanel.service;

import com.ipark.adminpanel.entity.CheckIn;
import com.ipark.adminpanel.entity.CheckOut;
import com.ipark.adminpanel.entity.ParkingSlot;
import com.ipark.adminpanel.repository.CheckInRepo;
import com.ipark.adminpanel.repository.CheckOutRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Component
public class CheckInOutService {

    @Autowired
    private CheckInRepo checkInRepo;

    @Autowired
    private CheckOutRepo checkOutRepo;

    @Autowired
    ParkingSlotService parkingSlotService;

    @Autowired
    private CustomerService customerService;

    @Transactional
    public CheckIn checkIn(CheckIn data) {
        if(allocateSlot(data)) {
            setEntryTime(data);
            data.setStatus("Booked");
            checkInRepo.save(data);
            saveUpdateAndGenerateSlotInfo(data);
            customerService.updateCustomerByCheckIn(data);
            return data;
        }
        return null;
    }

    private boolean allocateSlot(CheckIn data) {
        if(parkingSlotService.isEmpty() == null && parkingSlotService.isEmpty().isEmpty()) return false;
        ParkingSlot slot = parkingSlotService.getFirstAvailableSlot();
        data.setParkingSlot(slot);
        parkingSlotService.updateSlotById(data.getParkingSlot().getId());
        return true;
    }

    private void setEntryTime(CheckIn data) {
        data.setEntryTime(LocalDateTime.now());
    }

    public CheckIn cancelCheckIn(String slotInfo) {
        CheckIn data = checkInRepo.findBySlotInfo(slotInfo);
        if(data == null) return null;
        if(data.getStatus().equals("Completed")) return null;
        data.setStatus("Cancel");
        freeSlot(data);
        checkInRepo.save(data);
        return data;
    }

    private void saveUpdateAndGenerateSlotInfo(CheckIn data) {
        String slotData = data.getParkingSlot().getId().toString().substring(20);
        data.setSlotInfo(data.getId().toString().substring(20) + slotData + data.getNumberPlate().substring(5));
        checkInRepo.save(data);
    }

    @Transactional
    public CheckOut checkOut(String slotInfo, CheckOut checkOutData) {
        CheckIn data = checkInRepo.findBySlotInfo(slotInfo);
        if(data == null || data.getStatus().equals("Completed") || data.getStatus().equals("Cancel")) return null;
        setExitTime(checkOutData);
        billGenerate(data, checkOutData);
        freeSlot(data);
        data.setCheckOut(checkOutData);
        data.setStatus("Completed");
        checkOutRepo.save(checkOutData);
        checkInRepo.save(data);
        return checkOutData;
    }

    private void setExitTime(CheckOut data) {
        data.setExitTime(LocalDateTime.now());
    }

    private void billGenerate(CheckIn data, CheckOut data2) {
        data2.setPayingOption("UPI");
        double bill = data.getEntryTime().until(data2.getExitTime(), ChronoUnit.MINUTES) * 0.17;
        data2.setBillAmount(bill);
    }

    private void freeSlot(CheckIn data) {
        ParkingSlot slot = data.getParkingSlot();
        parkingSlotService.updateSlotById(slot.getId());
    }
}
