package com.incubyte.car_dealership_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.incubyte.car_dealership_backend.dto.VehicleRequest;
import com.incubyte.car_dealership_backend.entity.Vehicle;
import com.incubyte.car_dealership_backend.security.JwtAuthenticationFilter;
import com.incubyte.car_dealership_backend.security.JwtService;
import com.incubyte.car_dealership_backend.service.CustomUserDetailsService;
import com.incubyte.car_dealership_backend.service.VehicleService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(
        controllers = VehicleController.class,
        excludeAutoConfiguration = SecurityAutoConfiguration.class
)
@AutoConfigureMockMvc(addFilters = false)
class VehicleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private VehicleService vehicleService;

    // Mock Security Beans
    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    private VehicleRequest getRequest() {
        return VehicleRequest.builder()
                .make("Toyota")
                .model("Fortuner")
                .category("SUV")
                .price(4500000)
                .quantity(5)
                .imageUrl("image.jpg")
                .year(2024)
                .description("Premium SUV")
                .build();
    }

    private Vehicle getVehicle() {
        return Vehicle.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner")
                .category("SUV")
                .price(4500000)
                .quantity(5)
                .imageUrl("image.jpg")
                .year(2024)
                .description("Premium SUV")
                .build();
    }

    @Test
    void shouldGetAllVehicles() throws Exception {

        when(vehicleService.getAllVehicles())
                .thenReturn(List.of(getVehicle()));

        mockMvc.perform(get("/api/vehicles"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].make").value("Toyota"));
    }

    @Test
    void shouldGetVehicleById() throws Exception {

        when(vehicleService.getVehicleById(1L))
                .thenReturn(getVehicle());

        mockMvc.perform(get("/api/vehicles/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.model").value("Fortuner"));
    }

    @Test
    void shouldSearchVehicle() throws Exception {

        when(vehicleService.searchByMake("Toyota"))
                .thenReturn(List.of(getVehicle()));

        mockMvc.perform(get("/api/vehicles/search")
                        .param("make", "Toyota"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].make").value("Toyota"));
    }

    @Test
    void shouldAddVehicle() throws Exception {

        when(vehicleService.addVehicle(any()))
                .thenReturn("Vehicle Added Successfully");

        mockMvc.perform(post("/api/vehicles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(getRequest())))
                .andExpect(status().isCreated())
                .andExpect(content().string("Vehicle Added Successfully"));
    }

    @Test
    void shouldUpdateVehicle() throws Exception {

        when(vehicleService.updateVehicle(eq(1L), any()))
                .thenReturn(getVehicle());

        mockMvc.perform(put("/api/vehicles/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(getRequest())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.make").value("Toyota"));
    }

    @Test
    void shouldDeleteVehicle() throws Exception {

        when(vehicleService.deleteVehicle(1L))
                .thenReturn("Vehicle Deleted Successfully");

        mockMvc.perform(delete("/api/vehicles/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Vehicle Deleted Successfully"));
    }

    @Test
    void shouldPurchaseVehicle() throws Exception {

        when(vehicleService.purchaseVehicle(1L))
                .thenReturn("Vehicle Purchased Successfully");

        mockMvc.perform(post("/api/vehicles/1/purchase"))
                .andExpect(status().isOk())
                .andExpect(content().string("Vehicle Purchased Successfully"));
    }

    @Test
    void shouldRestockVehicle() throws Exception {

        when(vehicleService.restockVehicle(1L, 5))
                .thenReturn("Vehicle Restocked Successfully");

        mockMvc.perform(post("/api/vehicles/1/restock")
                        .param("quantity", "5"))
                .andExpect(status().isOk())
                .andExpect(content().string("Vehicle Restocked Successfully"));
    }

    @Test
    void shouldReturnBadRequestForInvalidVehicle() throws Exception {

        VehicleRequest request = new VehicleRequest();

        mockMvc.perform(post("/api/vehicles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

}