package com.farmchain.farmchainbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmchain.farmchainbackend.dto.ShipmentRequest;
import com.farmchain.farmchainbackend.entity.Product;
import com.farmchain.farmchainbackend.entity.Shipment;
import com.farmchain.farmchainbackend.entity.User;
import com.farmchain.farmchainbackend.exception.ApiException;
import com.farmchain.farmchainbackend.repository.ProductRepository;
import com.farmchain.farmchainbackend.repository.ShipmentRepository;
import com.farmchain.farmchainbackend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/distributor")
@RequiredArgsConstructor
public class DistributorController {

    private final ProductRepository productRepo;
    private final UserRepository userRepo;
    private final ShipmentRepository shipmentRepo;

    @GetMapping("/products/farmer")
    public ResponseEntity<?> allFarmerProducts() {
        return ResponseEntity.ok(productRepo.findAll());
    }

    @PostMapping("/shipment/create")
    public ResponseEntity<?> createShipment(@RequestBody ShipmentRequest req,
                                            @RequestAttribute("userId") Long userId) {

        Product product = productRepo.findById(req.getProductId())
                .orElseThrow(() -> new ApiException("Product not found"));

        User distributor = userRepo.findById(userId)
                .orElseThrow(() -> new ApiException("Distributor not found"));

        Shipment s = new Shipment();
        s.setProduct(product);
        s.setQuantity(req.getQuantity());
        s.setProductName(product.getName());
        s.setStatus("Pending");
        s.setDistributor(distributor);

        return ResponseEntity.ok(shipmentRepo.save(s));
    }

    @GetMapping("/shipments")
    public ResponseEntity<?> myShipments(@RequestAttribute("userId") Long userId) {
        User distributor = userRepo.findById(userId)
                .orElseThrow(() -> new ApiException("User not found"));

        return ResponseEntity.ok(shipmentRepo.findByDistributor(distributor));
    }
}

