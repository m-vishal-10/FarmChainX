package com.farmchain.farmchainbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.farmchain.farmchainbackend.entity.Product;
import com.farmchain.farmchainbackend.entity.User;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByOwner(User owner);
}
