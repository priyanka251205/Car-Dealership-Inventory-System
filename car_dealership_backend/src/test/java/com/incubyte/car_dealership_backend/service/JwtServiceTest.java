package com.incubyte.car_dealership_backend.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setUp() {

        jwtService = new JwtService();

        ReflectionTestUtils.setField(
                jwtService,
                "secret",
                "ThisIsMySuperSecretKeyForJwtAuthentication123456789"
        );

        ReflectionTestUtils.setField(
                jwtService,
                "jwtExpiration",
                3600000L
        );
    }

    private UserDetails getUserDetails() {

        return User.builder()
                .username("priya@test.com")
                .password("password")
                .authorities("USER")
                .build();
    }

    @Test
    void shouldGenerateJwtToken() {

        String token = jwtService.generateToken(getUserDetails());

        assertNotNull(token);
        assertFalse(token.isBlank());
    }

    @Test
    void shouldExtractUsername() {

        String token = jwtService.generateToken(getUserDetails());

        String username = jwtService.extractUsername(token);

        assertEquals("priya@test.com", username);
    }

    @Test
    void shouldValidateTokenSuccessfully() {

        UserDetails userDetails = getUserDetails();

        String token = jwtService.generateToken(userDetails);

        assertTrue(
                jwtService.isTokenValid(token, userDetails)
        );
    }

    @Test
    void shouldRejectTokenForDifferentUser() {

        UserDetails originalUser = getUserDetails();

        String token = jwtService.generateToken(originalUser);

        UserDetails anotherUser = User.builder()
                .username("another@test.com")
                .password("password")
                .authorities("USER")
                .build();

        assertFalse(
                jwtService.isTokenValid(token, anotherUser)
        );
    }

    @Test
    void shouldContainCorrectUsernameInsideToken() {

        UserDetails userDetails = getUserDetails();

        String token = jwtService.generateToken(userDetails);

        assertEquals(
                userDetails.getUsername(),
                jwtService.extractUsername(token)
        );
    }

}