package com.farmchain.farmchainbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmchain.farmchainbackend.repository.ProductRepository;
import com.farmchain.farmchainbackend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepo;
    private final ProductRepository productRepo;

    @GetMapping("/users")
    public ResponseEntity<?> users() {
        return ResponseEntity.ok(userRepo.findAll());
    }

    @GetMapping("/products")
    public ResponseEntity<?> products() {
        return ResponseEntity.ok(productRepo.findAll());
    }
}

