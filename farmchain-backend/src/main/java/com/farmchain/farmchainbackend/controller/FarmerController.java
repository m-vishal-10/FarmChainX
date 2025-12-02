package com.farmchain.farmchainbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.farmchain.farmchainbackend.dto.ProductRequest;
import com.farmchain.farmchainbackend.service.ProductService;
import com.farmchain.farmchainbackend.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/farmer")
@RequiredArgsConstructor
public class FarmerController {

    private final ProductService productService;
    private final UserService userService;

    @PostMapping("/product/create")
public ResponseEntity<?> createProduct(@RequestBody ProductRequest req) {
    Long userId = userService.getLoggedInUserId();
    return ResponseEntity.ok(productService.create(req, userId));
}


    @GetMapping("/products")
    public ResponseEntity<?> getMyProducts(@RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(productService.getProductsByUser(userId));
    }

    @PutMapping("/product/{id}/update-status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id,
                                          @RequestParam String status) {

        return ResponseEntity.ok(productService.updateStatus(id, status));
    }
}

