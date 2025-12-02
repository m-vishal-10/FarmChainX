package com.farmchain.farmchainbackend.dto;

import lombok.Data;

@Data
public class OrderRequest {
    private Long productId;
    private int quantity;
}

