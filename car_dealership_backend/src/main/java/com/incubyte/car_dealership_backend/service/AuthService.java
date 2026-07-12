package com.incubyte.car_dealership_backend.service;

import com.incubyte.car_dealership_backend.dto.AuthResponse;
import com.incubyte.car_dealership_backend.dto.LoginRequest;
import com.incubyte.car_dealership_backend.dto.RegisterRequest;
import com.incubyte.car_dealership_backend.entity.Role;
import com.incubyte.car_dealership_backend.entity.User;
import com.incubyte.car_dealership_backend.repository.UserRepository;
import com.incubyte.car_dealership_backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);

        return "User Registered Successfully";
    }

    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        UserDetails userDetails =
                org.springframework.security.core.userdetails.User
                        .withUsername(user.getEmail())
                        .password(user.getPassword())
                        .authorities(user.getRole().name())
                        .build();

        String token = jwtService.generateToken(userDetails);

        return AuthResponse.builder()
                .token(token)
                .role(user.getRole().name())
                .name(user.getName())
                .message("Login Successful")
                .build();
    }
}