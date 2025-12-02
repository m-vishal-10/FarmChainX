package com.farmchain.farmchainbackend.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ProductRequest {
    private String name;
    private String type;
    private int quantity;
    private String location;
    private LocalDate date;
    private String grade;
}
