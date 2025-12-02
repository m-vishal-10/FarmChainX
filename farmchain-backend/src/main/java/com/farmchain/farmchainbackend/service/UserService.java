package com.farmchain.farmchainbackend.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.farmchain.farmchainbackend.dto.AuthRequest;
import com.farmchain.farmchainbackend.dto.RegisterRequest;
import com.farmchain.farmchainbackend.entity.User;
import com.farmchain.farmchainbackend.exception.ApiException;
import com.farmchain.farmchainbackend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;

    public User register(RegisterRequest req) {
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setRole(req.getRole());
        user.setActive(true);

        return userRepo.save(user);
    }

    public User login(AuthRequest req) {
        User user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new ApiException("User not found"));

        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            throw new ApiException("Invalid password");
        }

        return user;
    }

    public Long getLoggedInUserId() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    if (auth == null || auth.getPrincipal() == null) {
        throw new ApiException("User not found");
    }

    Object principal = auth.getPrincipal();

    // If the principal is the User entity (set by JwtFilter), return its id
    if (principal instanceof User) {
        return ((User) principal).getId();
    }

    // Otherwise fall back to using the authentication name (email)
    String email = auth.getName();
    return userRepo.findByEmail(email)
            .orElseThrow(() -> new ApiException("User not found"))
            .getId();
}

}

