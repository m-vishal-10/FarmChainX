package com.farmchain.farmchainbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmchain.farmchainbackend.dto.ProductRequest;
import com.farmchain.farmchainbackend.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody ProductRequest req,
                                    @RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(productService.create(req, userId));
    }

    @GetMapping("/my")
    public ResponseEntity<?> myProducts(@RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(productService.getProductsByUser(userId));
    }

    @GetMapping("/all")
    public ResponseEntity<?> allProducts() {
        return ResponseEntity.ok(productService.getAll());
    }
}

