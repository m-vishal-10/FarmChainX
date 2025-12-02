package com.farmchain.farmchainbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.farmchain.farmchainbackend.entity.Shipment;
import com.farmchain.farmchainbackend.entity.User;

public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    List<Shipment> findByDistributor(User distributor);
}

