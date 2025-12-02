package com.farmchain.farmchainbackend.dto;

import lombok.Data;

@Data
public class ShipmentRequest {
    private Long productId;
    private int quantity;
}

