package com.farmchain.farmchainbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.farmchain.farmchainbackend.entity.Order;
import com.farmchain.farmchainbackend.entity.User;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByConsumer(User consumer);
}

