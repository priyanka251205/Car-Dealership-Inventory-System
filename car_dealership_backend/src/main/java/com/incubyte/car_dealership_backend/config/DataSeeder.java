package com.incubyte.car_dealership_backend.config;

import com.incubyte.car_dealership_backend.entity.Role;
import com.incubyte.car_dealership_backend.entity.User;
import com.incubyte.car_dealership_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        User admin = userRepository.findByEmail("admin@gmail.com").orElse(null);

        if (admin == null) {

            admin = User.builder()
                    .name("Admin")
                    .email("admin@gmail.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build();

        } else {

            admin.setRole(Role.ADMIN);
            admin.setPassword(passwordEncoder.encode("admin123"));

        }

        userRepository.save(admin);

        System.out.println("✅ Admin Ready");
    }
}