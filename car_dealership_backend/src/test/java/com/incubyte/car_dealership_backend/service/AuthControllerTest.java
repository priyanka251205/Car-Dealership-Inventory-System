package com.incubyte.car_dealership_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.incubyte.car_dealership_backend.dto.AuthResponse;
import com.incubyte.car_dealership_backend.dto.LoginRequest;
import com.incubyte.car_dealership_backend.dto.RegisterRequest;
import com.incubyte.car_dealership_backend.security.JwtAuthenticationFilter;
import com.incubyte.car_dealership_backend.security.JwtService;
import com.incubyte.car_dealership_backend.service.AuthService;
import com.incubyte.car_dealership_backend.service.CustomUserDetailsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(
        controllers = AuthController.class,
        excludeAutoConfiguration = SecurityAutoConfiguration.class
)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    // Mock Security Beans
    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

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

    @Test
    void shouldRegisterUserSuccessfully() throws Exception {

        when(authService.register(any(RegisterRequest.class)))
                .thenReturn("User Registered Successfully");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(getRegisterRequest())))
                .andExpect(status().isCreated())
                .andExpect(content().string("User Registered Successfully"));
    }

    @Test
    void shouldReturnBadRequestForInvalidRegistration() throws Exception {

        RegisterRequest request = new RegisterRequest();

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldLoginSuccessfully() throws Exception {

        AuthResponse response = AuthResponse.builder()
                .token("jwt-token")
                .role("USER")
                .name("Priyanka")
                .message("Login Successful")
                .build();

        when(authService.login(any(LoginRequest.class)))
                .thenReturn(response);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(getLoginRequest())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("jwt-token"))
                .andExpect(jsonPath("$.role").value("USER"))
                .andExpect(jsonPath("$.name").value("Priyanka"))
                .andExpect(jsonPath("$.message").value("Login Successful"));
    }

    @Test
    void shouldReturnBadRequestForInvalidLogin() throws Exception {

        LoginRequest request = new LoginRequest();

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }
}