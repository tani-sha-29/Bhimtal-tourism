package com.bhimtal.portal.dto;

import com.bhimtal.portal.model.StayType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StayRequestDto {

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Stay type is required (HOMESTAY, HOTEL, RESORT)")
    private StayType type;

    @NotNull(message = "Price per night is required")
    @Positive(message = "Price per night must be greater than zero")
    private Double pricePerNight;

    @NotBlank(message = "Location is required")
    private String location;

    private String contactPhone;

    @Builder.Default
    private List<String> amenities = new ArrayList<>();

    private String imageUrl;
}
