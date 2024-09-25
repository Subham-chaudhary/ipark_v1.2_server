package com.ipark.adminpanel.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection="parking_slot")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParkingSlot {

    //Uid
    @Id
    private ObjectId id;

    //isBooked
    private Boolean isBooked;

    //time
    public LocalDateTime time;


}
