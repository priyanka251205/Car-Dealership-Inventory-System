package com.incubyte.car_dealership_backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleResponse {

    private Long id;

    private String make;

    private String model;

    private String category;

    private double price;

    private int quantity;

    private String imageUrl;

    private int year;

    private String description;
}