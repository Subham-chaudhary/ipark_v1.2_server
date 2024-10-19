package com.ipark.adminpanel.service;

import com.ipark.adminpanel.controller.SlotSocketHandler;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    private final SlotSocketHandler slotSocketHandler;

    public BookingService(SlotSocketHandler slotSocketHandler) {
        this.slotSocketHandler = slotSocketHandler;
    }

    public void bookSlot(String lotID, String slotID) {
        String message = "Slot: " + slotID + " has been booked.";
        slotSocketHandler.notifyOperators(lotID, message);
    }
}
