package com.incubyte.car_dealership_backend.service;

import com.incubyte.car_dealership_backend.dto.PurchaseRequest;
import com.incubyte.car_dealership_backend.entity.PurchaseHistory;
import com.incubyte.car_dealership_backend.entity.User;
import com.incubyte.car_dealership_backend.entity.Vehicle;
import com.incubyte.car_dealership_backend.exception.VehicleNotFoundException;
import com.incubyte.car_dealership_backend.repository.PurchaseHistoryRepository;
import com.incubyte.car_dealership_backend.repository.UserRepository;
import com.incubyte.car_dealership_backend.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PurchaseService {

    private final PurchaseHistoryRepository purchaseHistoryRepository;
    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    @Transactional
    public String purchaseVehicle(PurchaseRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new VehicleNotFoundException("Vehicle not found"));

        if (vehicle.getQuantity() < request.getQuantity()) {
            throw new RuntimeException("Insufficient stock. Only " + vehicle.getQuantity() + " available.");
        }

        vehicle.setQuantity(vehicle.getQuantity() - request.getQuantity());
        vehicleRepository.save(vehicle);

        PurchaseHistory history = PurchaseHistory.builder()
                .vehicle(vehicle)
                .customerName(request.getCustomerName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .pincode(request.getPincode())
                .quantity(request.getQuantity())
                .purchaseDate(LocalDate.now())
                .purchaseTime(LocalTime.now())
                .purchasedByUser(user)
                .build();

        purchaseHistoryRepository.save(history);

        return "Vehicle Purchased Successfully";
    }

    public List<PurchaseHistory> getAllPurchaseHistory() {
        return purchaseHistoryRepository.findAll();
    }
}
