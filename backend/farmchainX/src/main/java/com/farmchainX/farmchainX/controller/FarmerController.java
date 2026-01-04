package com.farmchainX.farmchainX.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmchainX.farmchainX.model.Product;
import com.farmchainX.farmchainX.model.User;
import com.farmchainX.farmchainX.repository.ProductRepository;
import com.farmchainX.farmchainX.repository.SupplyChainLogRepository;
import com.farmchainX.farmchainX.repository.UserRepository;

@RestController
@RequestMapping("/api/farmer")
public class FarmerController {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final SupplyChainLogRepository supplyChainLogRepository;

    public FarmerController(
            ProductRepository productRepository,
            UserRepository userRepository,
            SupplyChainLogRepository supplyChainLogRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.supplyChainLogRepository = supplyChainLogRepository;
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<?> getFarmerStats(Principal principal) {
        try {
            if (principal == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Authentication required"));
            }

            String email = principal.getName();
            User farmer = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Farmer not found"));

            // Get all products by this farmer
            List<Product> allProducts = productRepository.findByFarmerId(farmer.getId());

            // Calculate statistics
            int totalProducts = allProducts.size();
            int soldProducts = 0;
            int activeProducts = 0;
            double totalRevenue = 0.0;
            double estimatedValue = 0.0;

            for (Product product : allProducts) {
                boolean isSold = supplyChainLogRepository.existsByProductId(product.getId());

                if (isSold) {
                    soldProducts++;
                    // For sold products, add to revenue
                    // ✅ FIX: Better handling of null/zero values
                    Double price = product.getPrice();
                    Double quantity = product.getQuantity();
                    if (price != null && price > 0 && quantity != null && quantity > 0) {
                        totalRevenue += price * quantity;
                    }
                } else {
                    activeProducts++;
                    // For active products, add to estimated value
                    Double price = product.getPrice();
                    Double quantity = product.getQuantity();
                    if (price != null && price > 0 && quantity != null && quantity > 0) {
                        estimatedValue += price * quantity;
                    }
                }
            }

            // Build response
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalProducts", totalProducts);
            stats.put("soldProducts", soldProducts);
            stats.put("activeProducts", activeProducts);
            stats.put("totalRevenue", totalRevenue);
            stats.put("estimatedValue", estimatedValue);
            stats.put("farmerName", farmer.getName());

            // ✅ Add debug logging
            System.out.println("[FARMER STATS] User: " + email +
                    " | Total: " + totalProducts +
                    " | Sold: " + soldProducts +
                    " | Active: " + activeProducts +
                    " | Revenue: ₹" + totalRevenue);

            return ResponseEntity.ok(stats);

        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("error", "Failed to load statistics: " + e.getMessage()));
        }
    }
}
