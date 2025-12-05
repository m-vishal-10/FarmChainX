package com.farmchain.farmchainbackend.config;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.farmchain.farmchainbackend.entity.User;
import com.farmchain.farmchainbackend.repository.UserRepository;
import com.farmchain.farmchainbackend.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepo;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // No token → move ahead
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extract token
        String token = authHeader.substring(7);

        // Extract user details from token
        Long userId = jwtService.extractUserId(token);
        String email = jwtService.extractEmail(token);

        if (userId == null || email == null) {
            filterChain.doFilter(request, response);
            return;
        }

        // Find user
        User user = userRepo.findById(userId).orElse(null);

        // Validate user
        if (user != null && user.getEmail().equals(email)) {

            // Save user id in request (optional)
            request.setAttribute("userId", user.getId());

            // ROLE_ prefix is required by Spring Security
            String role = "ROLE_" + user.getRole().name();

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    user,
                    null,
                    List.of(new SimpleGrantedAuthority(role)));

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // Continue filter chain
        filterChain.doFilter(request, response);
    }
}

// package com.farmchain.farmchainbackend.config;

// import java.io.IOException;
// import java.util.List;

// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;

// import com.farmchain.farmchainbackend.entity.User;
// import com.farmchain.farmchainbackend.repository.UserRepository;
// import com.farmchain.farmchainbackend.service.JwtService;

// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import jakarta.servlet.FilterChain;
// import lombok.RequiredArgsConstructor;

// @Component
// @RequiredArgsConstructor
// public class JwtFilter extends OncePerRequestFilter {

//     private final JwtService jwtService;
//     private final UserRepository userRepo;

//     @Override
//     protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
//             throws ServletException, IOException {

//         String authHeader = req.getHeader("Authorization");

//         if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//             chain.doFilter(req, res);
//             return;
//         }

//         String token = authHeader.substring(7);

//         Long userId = jwtService.extractUserId(token);
//         String email = jwtService.extractEmail(token);

//         User user = userRepo.findById(userId).orElse(null);

//         if (user != null && user.getEmail().equals(email)) {

//             req.setAttribute("userId", user.getId());

//             UsernamePasswordAuthenticationToken auth =
//                     new UsernamePasswordAuthenticationToken(
//                             user,
//                             null,
//                             List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
//                     );

//             SecurityContextHolder.getContext().setAuthentication(auth);
//         }

//         chain.doFilter(req, res);
//     }
// }
