package com.bhimtal.portal.dto;

import com.bhimtal.portal.model.Place;
import com.bhimtal.portal.model.PlaceCategory;
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
public class PlaceResponseDto {

    private Long id;
    private String title;
    private String slug;
    private PlaceCategory category;
    private String description;
    private Double latitude;
    private Double longitude;
    private String elevation;
    private String difficulty;
    private String imageUrl;
    private Boolean isFeatured;

    public static PlaceResponseDto fromEntity(Place place) {
        if (place == null) {
            return null;
        }
        return PlaceResponseDto.builder()
                .id(place.getId())
                .title(place.getTitle())
                .slug(place.getSlug())
                .category(place.getCategory())
                .description(place.getDescription())
                .latitude(place.getLatitude())
                .longitude(place.getLongitude())
                .elevation(place.getElevation())
                .difficulty(place.getDifficulty())
                .imageUrl(place.getImageUrl())
                .isFeatured(place.getIsFeatured())
                .build();
    }
}
