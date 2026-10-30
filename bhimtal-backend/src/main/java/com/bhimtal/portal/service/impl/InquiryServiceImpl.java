package com.bhimtal.portal.service.impl;

import com.bhimtal.portal.dto.InquiryRequestDto;
import com.bhimtal.portal.dto.InquiryResponseDto;
import com.bhimtal.portal.exception.ResourceNotFoundException;
import com.bhimtal.portal.model.Inquiry;
import com.bhimtal.portal.repository.InquiryRepository;
import com.bhimtal.portal.service.EmailService;
import com.bhimtal.portal.service.InquiryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class InquiryServiceImpl implements InquiryService {

    private final InquiryRepository inquiryRepository;
    private final EmailService emailService;

    @Override
    @Transactional
    public InquiryResponseDto createInquiry(InquiryRequestDto requestDto) {
        Inquiry inquiry = Inquiry.builder()
                .userName(requestDto.getUserName())
                .userEmail(requestDto.getUserEmail())
                .userPhone(requestDto.getUserPhone())
                .message(requestDto.getMessage())
                .listingType(requestDto.getListingType())
                .listingId(requestDto.getListingId())
                .build();

        Inquiry savedInquiry = inquiryRepository.save(inquiry);
        log.info("Persisted new inquiry ID: {} from user: {}", savedInquiry.getId(), savedInquiry.getUserEmail());

        // Send asynchronous notifications to admin and confirmation to user
        emailService.sendInquiryNotification(savedInquiry);
        emailService.sendInquiryConfirmation(savedInquiry);

        return InquiryResponseDto.fromEntity(savedInquiry);
    }

    @Override
    public List<InquiryResponseDto> getAllInquiries() {
        return inquiryRepository.findAllByOrderByCreatedDateDesc()
                .stream()
                .map(InquiryResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public InquiryResponseDto getInquiryById(Long id) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry", "id", id));
        return InquiryResponseDto.fromEntity(inquiry);
    }
}
