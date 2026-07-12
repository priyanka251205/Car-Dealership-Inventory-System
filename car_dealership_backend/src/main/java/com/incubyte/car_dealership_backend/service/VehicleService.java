package com.incubyte.car_dealership_backend.service;

import com.incubyte.car_dealership_backend.dto.VehicleRequest;
import com.incubyte.car_dealership_backend.entity.Vehicle;
import com.incubyte.car_dealership_backend.exception.VehicleNotFoundException;
import com.incubyte.car_dealership_backend.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    // Add Vehicle
    public String addVehicle(VehicleRequest request) {

        Vehicle vehicle = Vehicle.builder()
                .make(request.getMake())
                .model(request.getModel())
                .category(request.getCategory())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .imageUrl(request.getImageUrl())
                .build();

        vehicleRepository.save(vehicle);

        return "Vehicle Added Successfully";
    }

    // Get All Vehicles
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    // Search by Make
    public List<Vehicle> searchByMake(String make) {
        return vehicleRepository.findByMakeIgnoreCase(make);
    }

    // Update Vehicle
    public Vehicle updateVehicle(Long id, VehicleRequest request) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new VehicleNotFoundException("Vehicle not found"));

        vehicle.setMake(request.getMake());
        vehicle.setModel(request.getModel());
        vehicle.setCategory(request.getCategory());
        vehicle.setPrice(request.getPrice());
        vehicle.setQuantity(request.getQuantity());
        vehicle.setImageUrl(request.getImageUrl());

        return vehicleRepository.save(vehicle);
    }

    // Delete Vehicle
    public String deleteVehicle(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new VehicleNotFoundException("Vehicle not found"));

        vehicleRepository.delete(vehicle);

        return "Vehicle Deleted Successfully";
    }

    // Purchase Vehicle
    public String purchaseVehicle(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new VehicleNotFoundException("Vehicle not found"));

        if (vehicle.getQuantity() <= 0) {
            throw new RuntimeException("Vehicle Out Of Stock");
        }

        vehicle.setQuantity(vehicle.getQuantity() - 1);

        vehicleRepository.save(vehicle);

        return "Vehicle Purchased Successfully";
    }
    public Vehicle getVehicleById(Long id) {

        return vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new VehicleNotFoundException("Vehicle Not Found"));

    }
    // Restock Vehicle
    public String restockVehicle(Long id, int quantity) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new VehicleNotFoundException("Vehicle not found"));

        vehicle.setQuantity(vehicle.getQuantity() + quantity);

        vehicleRepository.save(vehicle);

        return "Vehicle Restocked Successfully";
    }
}