package com.ipark.adminpanel.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "checkIn")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckIn {
    @Id
    private ObjectId id;
    @NonNull
    private String vehicleDetails; //type and color
    @NonNull
    private String numberPlate;
    private String phoneNumber;
    private LocalDateTime entryTime;
    private String slotInfo;
    @DBRef
    private CheckOut checkOut;
    @DBRef
    private ParkingSlot parkingSlot;
    private String status;
}
