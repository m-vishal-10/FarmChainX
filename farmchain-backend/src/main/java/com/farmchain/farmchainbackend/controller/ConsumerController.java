package com.farmchain.farmchainbackend.controller;

import java.time.LocalDate;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmchain.farmchainbackend.dto.OrderRequest;
import com.farmchain.farmchainbackend.entity.Order;
import com.farmchain.farmchainbackend.entity.Product;
import com.farmchain.farmchainbackend.entity.User;
import com.farmchain.farmchainbackend.exception.ApiException;
import com.farmchain.farmchainbackend.repository.OrderRepository;
import com.farmchain.farmchainbackend.repository.ProductRepository;
import com.farmchain.farmchainbackend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/consumer")
@RequiredArgsConstructor
public class ConsumerController {

    private final ProductRepository productRepo;
    private final OrderRepository orderRepo;
    private final UserRepository userRepo;

    @GetMapping("/products")
    public ResponseEntity<?> products() {
        return ResponseEntity.ok(productRepo.findAll());
    }

    @PostMapping("/order/place")
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest req,
                                        @RequestAttribute("userId") Long userId) {

        Product product = productRepo.findById(req.getProductId())
                .orElseThrow(() -> new ApiException("Product not found"));

        User consumer = userRepo.findById(userId)
                .orElseThrow(() -> new ApiException("User not found"));

        Order o = new Order();
        o.setProductName(product.getName());
        o.setQuantity(req.getQuantity());
        o.setDate(LocalDate.now());
        o.setStatus("Placed");
        o.setConsumer(consumer);

        return ResponseEntity.ok(orderRepo.save(o));
    }

    @GetMapping("/orders")
    public ResponseEntity<?> myOrders(@RequestAttribute("userId") Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ApiException("User not found"));

        return ResponseEntity.ok(orderRepo.findByConsumer(user));
    }
}
