package com.bhimtal.portal.dto;

import com.bhimtal.portal.model.AdventureType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdventureRequestDto {

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Activity type is required (PARAGLIDING, KAYAKING, BOATING, TREKKING)")
    private AdventureType activityType;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be greater than zero")
    private Double price;

    private String duration;

    private String operatorContact;
}
