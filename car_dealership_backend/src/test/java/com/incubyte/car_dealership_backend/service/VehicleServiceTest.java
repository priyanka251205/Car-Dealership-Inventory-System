package com.incubyte.car_dealership_backend.service;

import com.incubyte.car_dealership_backend.dto.VehicleRequest;
import com.incubyte.car_dealership_backend.entity.Vehicle;
import com.incubyte.car_dealership_backend.repository.VehicleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

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

        // Arrange
        VehicleRequest request = VehicleRequest.builder()
                .make("Toyota")
                .model("Fortuner")
                .category("SUV")
                .price(3500000)
                .quantity(5)
                .build();

        Vehicle savedVehicle = Vehicle.builder()
                .id(1L)
                .make(request.getMake())
                .model(request.getModel())
                .category(request.getCategory())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .build();

        when(vehicleRepository.save(any(Vehicle.class)))
                .thenReturn(savedVehicle);

        // Act
        String response = vehicleService.addVehicle(request);

        // Assert
        assertEquals("Vehicle Added Successfully", response);

        ArgumentCaptor<Vehicle> captor = ArgumentCaptor.forClass(Vehicle.class);

        verify(vehicleRepository, times(1)).save(captor.capture());

        Vehicle vehicle = captor.getValue();

        assertEquals("Toyota", vehicle.getMake());
        assertEquals("Fortuner", vehicle.getModel());
        assertEquals("SUV", vehicle.getCategory());
        assertEquals(3500000, vehicle.getPrice());
        assertEquals(5, vehicle.getQuantity());
    }
}