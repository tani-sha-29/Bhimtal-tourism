package com.bhimtal.portal.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
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
public class InquiryRequestDto {

    @NotBlank(message = "User name is required")
    private String userName;

    @NotBlank(message = "User email is required")
    @Email(message = "Invalid email format")
    private String userEmail;

    private String userPhone;

    @NotBlank(message = "Message cannot be empty")
    private String message;

    private String listingType;

    private Long listingId;
}
