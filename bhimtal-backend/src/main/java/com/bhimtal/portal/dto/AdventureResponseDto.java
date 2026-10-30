package com.bhimtal.portal.dto;

import com.bhimtal.portal.model.Adventure;
import com.bhimtal.portal.model.AdventureType;
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
public class AdventureResponseDto {

    private Long id;
    private String title;
    private AdventureType activityType;
    private Double price;
    private String duration;
    private String operatorContact;

    public static AdventureResponseDto fromEntity(Adventure adventure) {
        if (adventure == null) {
            return null;
        }
        return AdventureResponseDto.builder()
                .id(adventure.getId())
                .title(adventure.getTitle())
                .activityType(adventure.getActivityType())
                .price(adventure.getPrice())
                .duration(adventure.getDuration())
                .operatorContact(adventure.getOperatorContact())
                .build();
    }
}
