package com.bhimtal.portal.dto;

import com.bhimtal.portal.model.Stay;
import com.bhimtal.portal.model.StayType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StayResponseDto {

    private Long id;
    private String name;
    private StayType type;
    private Double pricePerNight;
    private String location;
    private String contactPhone;
    private List<String> amenities;
    private String imageUrl;

    public static StayResponseDto fromEntity(Stay stay) {
        if (stay == null) {
            return null;
        }
        return StayResponseDto.builder()
                .id(stay.getId())
                .name(stay.getName())
                .type(stay.getType())
                .pricePerNight(stay.getPricePerNight())
                .location(stay.getLocation())
                .contactPhone(stay.getContactPhone())
                .amenities(stay.getAmenities())
                .imageUrl(stay.getImageUrl())
                .build();
    }
}
