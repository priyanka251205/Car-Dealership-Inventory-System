package com.incubyte.car_dealership_backend.service;

import com.incubyte.car_dealership_backend.entity.Vehicle;
import com.incubyte.car_dealership_backend.repository.VehicleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class VehicleSearchServiceTest {

    @Mock
    private VehicleRepository vehicleRepository;

    @InjectMocks
    private VehicleService vehicleService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldReturnVehiclesByMake() {

        Vehicle vehicle = Vehicle.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner")
                .category("SUV")
                .price(3500000)
                .quantity(5)
                .build();

        when(vehicleRepository.findByMakeIgnoreCase("Toyota"))
                .thenReturn(List.of(vehicle));

        List<Vehicle> result =
                vehicleService.searchByMake("Toyota");

        assertEquals(1, result.size());
        assertEquals("Toyota", result.get(0).getMake());
    }
}