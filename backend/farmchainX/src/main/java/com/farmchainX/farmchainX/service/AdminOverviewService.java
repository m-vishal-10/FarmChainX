package com.farmchainX.farmchainX.service;

import org.springframework.stereotype.Service;

import com.farmchainX.farmchainX.dto.AdminOverview;
import com.farmchainX.farmchainX.repository.FeedbackRepository;
import com.farmchainX.farmchainX.repository.ProductRepository;
import com.farmchainX.farmchainX.repository.SupplyChainLogRepository;
import com.farmchainX.farmchainX.repository.UserRepository;

@Service
public class AdminOverviewService {

    private final UserRepository userRepo;
    private final ProductRepository productRepo;
    private final SupplyChainLogRepository supplyChainLogRepo;
    private final FeedbackRepository feedbackRepo;

    public AdminOverviewService(UserRepository userRepo,
            ProductRepository productRepo,
            SupplyChainLogRepository supplyChainLogRepo,
            FeedbackRepository feedbackRepo) {
        this.userRepo = userRepo;
        this.productRepo = productRepo;
        this.supplyChainLogRepo = supplyChainLogRepo;
        this.feedbackRepo = feedbackRepo;
    }

    public AdminOverview getOverview() {
        // Mock/Calculate additional stats
        double salesVolume = productRepo.count() * 1500.0; // Mock avg price
        long pendingOrders = 12; // Mock
        long newUsersToday = userRepo.count() / 15 + 1; // Mock

        double avgRating = 0.0;
        long fbCount = feedbackRepo.count();
        if (fbCount > 0) {
            // We would need a custom query for real average, doing simple mock for now
            avgRating = 4.5;
        }

        return new AdminOverview(
                userRepo.count(),
                productRepo.count(),
                supplyChainLogRepo.count(),
                feedbackRepo.count(),
                salesVolume,
                pendingOrders,
                newUsersToday,
                avgRating);
    }

}