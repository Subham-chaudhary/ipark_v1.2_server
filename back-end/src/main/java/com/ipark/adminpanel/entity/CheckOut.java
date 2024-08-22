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
import java.util.ArrayList;
import java.util.List;

@Document(collection = "checkOut")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckOut {
    @Id
    private ObjectId id;
    private LocalDateTime exitTime;
    private String payingOption;
    private double billAmount;
}
