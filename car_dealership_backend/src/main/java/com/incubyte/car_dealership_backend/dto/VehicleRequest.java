package com.incubyte.car_dealership_backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleRequest {

    @NotBlank
    private String make;

    @NotBlank
    private String model;

    @NotBlank
    private String category;

    @Min(0)
    private double price;

    @Min(0)
    private int quantity;

    @NotBlank
    private String imageUrl;

    @Min(1886)
    private int year;

    @NotBlank
    private String description;
}