package com.incubyte.car_dealership_backend.repository;

import com.incubyte.car_dealership_backend.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository
        extends JpaRepository<Vehicle, Long> {

}