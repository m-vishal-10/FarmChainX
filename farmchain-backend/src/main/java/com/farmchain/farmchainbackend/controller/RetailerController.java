package com.farmchain.farmchainbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmchain.farmchainbackend.entity.Shipment;
import com.farmchain.farmchainbackend.exception.ApiException;
import com.farmchain.farmchainbackend.repository.ShipmentRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/retailer")
@RequiredArgsConstructor
public class RetailerController {

    private final ShipmentRepository shipmentRepo;

    @GetMapping("/shipments")
    public ResponseEntity<?> getShipments() {
        return ResponseEntity.ok(shipmentRepo.findAll());
    }

    @PutMapping("/shipment/{id}/accept")
    public ResponseEntity<?> acceptShipment(@PathVariable Long id) {
        Shipment shipment = shipmentRepo.findById(id)
                .orElseThrow(() -> new ApiException("Shipment not found"));

        shipment.setStatus("Accepted");

        return ResponseEntity.ok(shipmentRepo.save(shipment));
    }
}

