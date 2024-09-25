package com.ipark.adminpanel.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "customer")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Id
    private ObjectId id;
    @NonNull
    private String userName;
    @Indexed(unique = true)
    private String phoneNumber;
    @NonNull
    private String password;
    @DBRef
    private List<CheckIn> checkIns = new ArrayList<>();
}
