package com.bhimtal.portal.dto;

import com.bhimtal.portal.model.PlaceCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class PlaceRequestDto {

    @NotBlank(message = "Title is required")
    private String title;

    private String slug;

    @NotNull(message = "Category is required (TREK, LAKE, TEMPLE, ATTRACTION)")
    private PlaceCategory category;

    @NotBlank(message = "Description is required")
    private String description;

    private Double latitude;

    private Double longitude;

    private String elevation;

    private String difficulty;

    private String imageUrl;

    private Boolean isFeatured;
}
