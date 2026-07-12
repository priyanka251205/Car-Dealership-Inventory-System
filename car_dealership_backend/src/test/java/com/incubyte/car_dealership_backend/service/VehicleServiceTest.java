package com.incubyte.car_dealership_backend.service;

import com.incubyte.car_dealership_backend.dto.VehicleRequest;
import com.incubyte.car_dealership_backend.entity.Vehicle;
import com.incubyte.car_dealership_backend.exception.VehicleNotFoundException;
import com.incubyte.car_dealership_backend.repository.VehicleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VehicleServiceTest {

    @Mock
    private VehicleRepository vehicleRepository;

    @InjectMocks
    private VehicleService vehicleService;

    private VehicleRequest getVehicleRequest() {
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
    void shouldAddVehicleSuccessfully() {

        VehicleRequest request = getVehicleRequest();

        when(vehicleRepository.save(any(Vehicle.class)))
                .thenReturn(getVehicle());

        String result = vehicleService.addVehicle(request);

        assertEquals("Vehicle Added Successfully", result);

        verify(vehicleRepository, times(1))
                .save(any(Vehicle.class));
    }

    @Test
    void shouldReturnAllVehicles() {

        List<Vehicle> vehicles = List.of(getVehicle());

        when(vehicleRepository.findAll()).thenReturn(vehicles);

        List<Vehicle> result = vehicleService.getAllVehicles();

        assertEquals(1, result.size());

        verify(vehicleRepository).findAll();
    }

    @Test
    void shouldSearchVehicleByMake() {

        when(vehicleRepository.findByMakeIgnoreCase("Toyota"))
                .thenReturn(List.of(getVehicle()));

        List<Vehicle> result = vehicleService.searchByMake("Toyota");

        assertEquals(1, result.size());

        assertEquals("Toyota", result.get(0).getMake());

        verify(vehicleRepository).findByMakeIgnoreCase("Toyota");
    }

    @Test
    void shouldUpdateVehicleSuccessfully() {

        Vehicle vehicle = getVehicle();

        VehicleRequest request = getVehicleRequest();

        request.setModel("Camry");

        when(vehicleRepository.findById(1L))
                .thenReturn(Optional.of(vehicle));

        when(vehicleRepository.save(any(Vehicle.class)))
                .thenReturn(vehicle);

        Vehicle updated = vehicleService.updateVehicle(1L, request);

        assertEquals("Camry", updated.getModel());

        verify(vehicleRepository).save(vehicle);
    }

    @Test
    void shouldThrowExceptionWhenUpdatingUnknownVehicle() {

        when(vehicleRepository.findById(1L))
                .thenReturn(Optional.empty());

        assertThrows(
                VehicleNotFoundException.class,
                () -> vehicleService.updateVehicle(1L, getVehicleRequest())
        );
    }

    @Test
    void shouldDeleteVehicleSuccessfully() {

        Vehicle vehicle = getVehicle();

        when(vehicleRepository.findById(1L))
                .thenReturn(Optional.of(vehicle));

        String result = vehicleService.deleteVehicle(1L);

        assertEquals("Vehicle Deleted Successfully", result);

        verify(vehicleRepository).delete(vehicle);
    }

    @Test
    void shouldThrowExceptionWhenDeletingUnknownVehicle() {

        when(vehicleRepository.findById(1L))
                .thenReturn(Optional.empty());

        assertThrows(
                VehicleNotFoundException.class,
                () -> vehicleService.deleteVehicle(1L)
        );
    }

    @Test
    void shouldPurchaseVehicleSuccessfully() {

        Vehicle vehicle = getVehicle();

        when(vehicleRepository.findById(1L))
                .thenReturn(Optional.of(vehicle));

        String result = vehicleService.purchaseVehicle(1L);

        assertEquals("Vehicle Purchased Successfully", result);

        assertEquals(4, vehicle.getQuantity());

        verify(vehicleRepository).save(vehicle);
    }

    @Test
    void shouldThrowExceptionWhenVehicleOutOfStock() {

        Vehicle vehicle = getVehicle();

        vehicle.setQuantity(0);

        when(vehicleRepository.findById(1L))
                .thenReturn(Optional.of(vehicle));

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> vehicleService.purchaseVehicle(1L)
        );

        assertEquals("Vehicle Out Of Stock", exception.getMessage());
    }

    @Test
    void shouldRestockVehicleSuccessfully() {

        Vehicle vehicle = getVehicle();

        when(vehicleRepository.findById(1L))
                .thenReturn(Optional.of(vehicle));

        String result = vehicleService.restockVehicle(1L, 10);

        assertEquals("Vehicle Restocked Successfully", result);

        assertEquals(15, vehicle.getQuantity());

        verify(vehicleRepository).save(vehicle);
    }

    @Test
    void shouldReturnVehicleById() {

        Vehicle vehicle = getVehicle();

        when(vehicleRepository.findById(1L))
                .thenReturn(Optional.of(vehicle));

        Vehicle result = vehicleService.getVehicleById(1L);

        assertEquals(1L, result.getId());

        verify(vehicleRepository).findById(1L);
    }

    @Test
    void shouldThrowExceptionWhenVehicleNotFoundById() {

        when(vehicleRepository.findById(1L))
                .thenReturn(Optional.empty());

        assertThrows(
                VehicleNotFoundException.class,
                () -> vehicleService.getVehicleById(1L)
        );
    }
}