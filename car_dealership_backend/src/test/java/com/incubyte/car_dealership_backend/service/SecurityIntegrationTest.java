package com.incubyte.car_dealership_backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SecurityIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void registerEndpointShouldBePublic() throws Exception {

        String request = """
                {
                  "name":"Test User",
                  "email":"security@test.com",
                  "password":"password123"
                }
                """;

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request))
                .andExpect(status().isCreated());
    }

    @Test
    void loginEndpointShouldBePublic() throws Exception {

        String request = """
                {
                  "email":"security@test.com",
                  "password":"password123"
                }
                """;

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request))
                // Endpoint is public. If user doesn't exist it may return 401,
                // if user exists it returns 200.
                .andExpect(status().isOk());
    }

    @Test
    void getVehiclesWithoutAuthenticationShouldReturnForbidden() throws Exception {

        mockMvc.perform(get("/api/vehicles"))
                .andExpect(status().isForbidden());
    }

    @Test
    void deleteVehicleWithoutAuthenticationShouldReturnForbidden() throws Exception {

        mockMvc.perform(delete("/api/vehicles/1"))
                .andExpect(status().isForbidden());
    }

    @Test
    void purchaseVehicleWithoutAuthenticationShouldReturnForbidden() throws Exception {

        mockMvc.perform(post("/api/vehicles/1/purchase"))
                .andExpect(status().isForbidden());
    }

    @Test
    void restockVehicleWithoutAuthenticationShouldReturnForbidden() throws Exception {

        mockMvc.perform(post("/api/vehicles/1/restock")
                        .param("quantity", "5"))
                .andExpect(status().isForbidden());
    }
}