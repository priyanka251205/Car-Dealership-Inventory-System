package com.incubyte.car_dealership_backend.service;

import com.incubyte.car_dealership_backend.dto.VehicleRequest;
import com.incubyte.car_dealership_backend.entity.Vehicle;
import com.incubyte.car_dealership_backend.repository.VehicleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class VehicleServiceTest {

    @Mock
    private VehicleRepository vehicleRepository;

    @InjectMocks
    private VehicleService vehicleService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldAddVehicleSuccessfully() {

        VehicleRequest request =
                VehicleRequest.builder()
                        .make("Toyota")
                        .model("Fortuner")
                        .category("SUV")
                        .price(3500000)
                        .quantity(5)
                        .build();

        Vehicle vehicle =
                Vehicle.builder()
                        .id(1L)
                        .make("Toyota")
                        .model("Fortuner")
                        .category("SUV")
                        .price(3500000)
                        .quantity(5)
                        .build();

        when(vehicleRepository.save(any(Vehicle.class)))
                .thenReturn(vehicle);

        String response =
                vehicleService.addVehicle(request);

        assertEquals(
                "Vehicle Added Successfully",
                response
        );
    }

}