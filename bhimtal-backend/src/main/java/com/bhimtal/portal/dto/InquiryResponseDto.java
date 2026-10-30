package com.bhimtal.portal.dto;

import com.bhimtal.portal.model.Inquiry;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InquiryResponseDto {

    private Long id;
    private String userName;
    private String userEmail;
    private String userPhone;
    private String message;
    private String listingType;
    private Long listingId;
    private LocalDateTime createdDate;

    public static InquiryResponseDto fromEntity(Inquiry inquiry) {
        if (inquiry == null) {
            return null;
        }
        return InquiryResponseDto.builder()
                .id(inquiry.getId())
                .userName(inquiry.getUserName())
                .userEmail(inquiry.getUserEmail())
                .userPhone(inquiry.getUserPhone())
                .message(inquiry.getMessage())
                .listingType(inquiry.getListingType())
                .listingId(inquiry.getListingId())
                .createdDate(inquiry.getCreatedDate())
                .build();
    }
}
