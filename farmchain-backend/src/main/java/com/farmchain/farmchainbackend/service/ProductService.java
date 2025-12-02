package com.farmchain.farmchainbackend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.farmchain.farmchainbackend.dto.ProductRequest;
import com.farmchain.farmchainbackend.entity.Product;
import com.farmchain.farmchainbackend.entity.User;
import com.farmchain.farmchainbackend.exception.ApiException;
import com.farmchain.farmchainbackend.repository.ProductRepository;
import com.farmchain.farmchainbackend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepo;
    private final UserRepository userRepo;

    public Product create(ProductRequest req, Long userId) {

        User owner = userRepo.findById(userId)
                .orElseThrow(() -> new ApiException("User not found"));

        Product p = new Product();
        p.setName(req.getName());
        p.setType(req.getType());
        p.setQuantity(req.getQuantity());
        p.setLocation(req.getLocation());
        p.setDate(req.getDate());
        p.setGrade(req.getGrade());
        p.setOwner(owner);

        return productRepo.save(p);
    }

    public List<Product> getProductsByUser(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ApiException("User not found"));

        return productRepo.findByOwner(user);
    }

    public List<Product> getAll() {
        return productRepo.findAll();
    }

    public Product updateStatus(Long id, String status) {

    Product product = productRepo.findById(id)
            .orElseThrow(() -> new ApiException("Product not found"));

    product.setStatus(status);  // Make sure Product has a status field

    return productRepo.save(product);
}
}
