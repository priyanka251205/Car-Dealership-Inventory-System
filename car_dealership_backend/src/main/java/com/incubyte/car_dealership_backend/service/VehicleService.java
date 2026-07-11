package com.incubyte.car_dealership_backend.service;

import com.incubyte.car_dealership_backend.dto.VehicleRequest;
import com.incubyte.car_dealership_backend.entity.Vehicle;
import com.incubyte.car_dealership_backend.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public String addVehicle(VehicleRequest request) {

        Vehicle vehicle = Vehicle.builder()
                .make(request.getMake())
                .model(request.getModel())
                .category(request.getCategory())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .build();

        vehicleRepository.save(vehicle);

        return "Vehicle Added Successfully";
    }
}