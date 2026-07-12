package com.incubyte.car_dealership_backend.controller;

import com.incubyte.car_dealership_backend.dto.VehicleRequest;
import com.incubyte.car_dealership_backend.entity.Vehicle;
import com.incubyte.car_dealership_backend.service.VehicleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    // Add Vehicle
    @PostMapping
    public ResponseEntity<String> addVehicle(
            @Valid @RequestBody VehicleRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(vehicleService.addVehicle(request));
    }

    // Get All Vehicles
    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicles() {

        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }

    // Search Vehicle by Make
    @GetMapping("/search")
    public ResponseEntity<List<Vehicle>> searchVehicle(
            @RequestParam String make) {

        return ResponseEntity.ok(
                vehicleService.searchByMake(make)
        );
    }

    // Update Vehicle
    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(
            @PathVariable Long id,
            @Valid @RequestBody VehicleRequest request) {

        return ResponseEntity.ok(
                vehicleService.updateVehicle(id, request)
        );
    }

    // Delete Vehicle
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVehicle(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                vehicleService.deleteVehicle(id)
        );
    }

    // Purchase Vehicle
    @PostMapping("/{id}/purchase")
    public ResponseEntity<String> purchaseVehicle(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                vehicleService.purchaseVehicle(id)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {

        return ResponseEntity.ok(
                vehicleService.getVehicleById(id)
        );
    }
    // Restock Vehicle
    @PostMapping("/{id}/restock")
    public ResponseEntity<String> restockVehicle(
            @PathVariable Long id,
            @RequestParam int quantity) {

        return ResponseEntity.ok(
                vehicleService.restockVehicle(id, quantity)
        );
    }
}