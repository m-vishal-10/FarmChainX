package com.farmchain.farmchainbackend.service;

import java.util.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.stereotype.Service;

import com.farmchain.farmchainbackend.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtService {

    private final String SECRET = "Yh67HYTqplLs9FzxPqT5WkG8R0Np3Kx8UoPw9Vb3FdLqD7FvS6HxNc1Zt8QkLp2R";

    // ------------------------------------------
    // 🔥 Generate JWT for user
    // ------------------------------------------
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())  // <--- EMAIL as subject (IMPORTANT)
                .claim("id", user.getId())    // optional but useful
                .claim("role", user.getRole().name())
                .setIssuedAt(new Date())
                .setExpiration(Date.from(Instant.now().plus(2, ChronoUnit.HOURS)))
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
    }

    // ------------------------------------------
    // Extract all claims
    // ------------------------------------------
    private Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
    }

    // ------------------------------------------
    // 🔥 Extract email (username) from token
    // because we stored it in subject
    // ------------------------------------------
    public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }

    // ------------------------------------------
    // Extract user ID if needed
    // ------------------------------------------
    public Long extractUserId(String token) {
        Object idClaim = getClaims(token).get("id");
        return Long.parseLong(idClaim.toString());
    }
}
