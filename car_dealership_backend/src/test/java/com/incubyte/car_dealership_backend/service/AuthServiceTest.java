package com.incubyte.car_dealership_backend.service;

import com.incubyte.car_dealership_backend.dto.RegisterRequest;
import com.incubyte.car_dealership_backend.entity.User;
import com.incubyte.car_dealership_backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldRegisterUserSuccessfully() {

        RegisterRequest request = RegisterRequest.builder()
                .name("John")
                .email("john@gmail.com")
                .password("123456")
                .build();

        when(userRepository.existsByEmail(request.getEmail())).thenReturn(false);

        when(passwordEncoder.encode(any()))
                .thenReturn("encodedPassword");

        User savedUser = User.builder()
                .id(1L)
                .name(request.getName())
                .email(request.getEmail())
                .password("encodedPassword")
                .build();

        when(userRepository.save(any(User.class)))
                .thenReturn(savedUser);

        String response = authService.register(request);

        assertEquals("User Registered Successfully", response);

        verify(userRepository, times(1))
                .save(any(User.class));
    }
}