package com.bhimtal.portal.controller;

import com.bhimtal.portal.dto.ApiResponse;
import com.bhimtal.portal.dto.InquiryRequestDto;
import com.bhimtal.portal.dto.InquiryResponseDto;
import com.bhimtal.portal.service.InquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/inquiries")
@RequiredArgsConstructor
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:3000}")
public class InquiryController {

    private final InquiryService inquiryService;

    @PostMapping
    public ResponseEntity<ApiResponse<InquiryResponseDto>> submitInquiry(
            @Valid @RequestBody InquiryRequestDto requestDto) {
        InquiryResponseDto created = inquiryService.createInquiry(requestDto);
        return new ResponseEntity<>(
                ApiResponse.success("Inquiry submitted successfully. Confirmation email sent.", created),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<InquiryResponseDto>>> getAllInquiries() {
        List<InquiryResponseDto> inquiries = inquiryService.getAllInquiries();
        return ResponseEntity.ok(ApiResponse.success(inquiries));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<InquiryResponseDto>> getInquiryById(@PathVariable Long id) {
        InquiryResponseDto inquiry = inquiryService.getInquiryById(id);
        return ResponseEntity.ok(ApiResponse.success(inquiry));
    }
}
