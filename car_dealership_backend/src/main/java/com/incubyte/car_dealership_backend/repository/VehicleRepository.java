package com.incubyte.car_dealership_backend.repository;

import com.incubyte.car_dealership_backend.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    List<Vehicle> findByMakeIgnoreCase(String make);

    List<Vehicle> findByModelIgnoreCase(String model);

    List<Vehicle> findByCategoryIgnoreCase(String category);

    List<Vehicle> findByPriceBetween(double minPrice, double maxPrice);

}