package com.incubyte.car_dealership_backend.service;

import com.incubyte.car_dealership_backend.dto.AuthResponse;
import com.incubyte.car_dealership_backend.dto.LoginRequest;
import com.incubyte.car_dealership_backend.dto.RegisterRequest;
import com.incubyte.car_dealership_backend.entity.Role;
import com.incubyte.car_dealership_backend.entity.User;
import com.incubyte.car_dealership_backend.repository.UserRepository;
import com.incubyte.car_dealership_backend.security.JwtService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.ArgumentCaptor;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthService authService;

    private RegisterRequest getRegisterRequest() {
        return RegisterRequest.builder()
                .name("Priyanka")
                .email("priya@test.com")
                .password("password123")
                .build();
    }

    private LoginRequest getLoginRequest() {
        return LoginRequest.builder()
                .email("priya@test.com")
                .password("password123")
                .build();
    }

    private User getUser() {
        return User.builder()
                .id(1L)
                .name("Priyanka")
                .email("priya@test.com")
                .password("encodedPassword")
                .role(Role.USER)
                .build();
    }

    @Test
    void shouldRegisterUserSuccessfully() {

        RegisterRequest request = getRegisterRequest();

        when(userRepository.existsByEmail(request.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encodedPassword");

        String result = authService.register(request);

        assertEquals("User Registered Successfully", result);

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());

        User savedUser = captor.getValue();

        assertEquals("Priyanka", savedUser.getName());
        assertEquals("priya@test.com", savedUser.getEmail());
        assertEquals("encodedPassword", savedUser.getPassword());
        assertEquals(Role.USER, savedUser.getRole());
    }

    @Test
    void shouldThrowExceptionWhenEmailAlreadyExists() {

        RegisterRequest request = getRegisterRequest();

        when(userRepository.existsByEmail(request.getEmail()))
                .thenReturn(true);

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> authService.register(request)
        );

        assertEquals("Email already exists", exception.getMessage());

        verify(userRepository, never()).save(any());
    }

    @Test
    void shouldLoginSuccessfully() {

        LoginRequest request = getLoginRequest();

        User user = getUser();

        when(userRepository.findByEmail(request.getEmail()))
                .thenReturn(Optional.of(user));

        when(jwtService.generateToken(any()))
                .thenReturn("jwt-token");

        AuthResponse response = authService.login(request);

        verify(authenticationManager).authenticate(
                any(UsernamePasswordAuthenticationToken.class)
        );

        assertEquals("jwt-token", response.getToken());
        assertEquals("USER", response.getRole());
        assertEquals("Priyanka", response.getName());
        assertEquals("Login Successful", response.getMessage());
    }

    @Test
    void shouldThrowExceptionWhenUserNotFoundDuringLogin() {

        LoginRequest request = getLoginRequest();

        when(userRepository.findByEmail(request.getEmail()))
                .thenReturn(Optional.empty());

        assertThrows(
                RuntimeException.class,
                () -> authService.login(request)
        );
    }

    @Test
    void shouldEncodePasswordDuringRegistration() {

        RegisterRequest request = getRegisterRequest();

        when(userRepository.existsByEmail(anyString())).thenReturn(false);

        when(passwordEncoder.encode(anyString()))
                .thenReturn("encodedPassword");

        authService.register(request);

        verify(passwordEncoder).encode("password123");
    }
}