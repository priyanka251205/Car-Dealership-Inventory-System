package com.incubyte.car_dealership_backend.controller;

import com.incubyte.car_dealership_backend.dto.PurchaseRequest;
import com.incubyte.car_dealership_backend.entity.PurchaseHistory;
import com.incubyte.car_dealership_backend.service.PurchaseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PurchaseController {

    private final PurchaseService purchaseService;

    @PostMapping("/purchase")
    public ResponseEntity<String> purchase(@Valid @RequestBody PurchaseRequest request) {
        return ResponseEntity.ok(purchaseService.purchaseVehicle(request));
    }

    @GetMapping("/purchase-history")
    public ResponseEntity<List<PurchaseHistory>> getPurchaseHistory() {
        return ResponseEntity.ok(purchaseService.getAllPurchaseHistory());
    }
}
