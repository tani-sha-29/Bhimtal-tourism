package com.bhimtal.portal.service;

import com.bhimtal.portal.dto.InquiryRequestDto;
import com.bhimtal.portal.dto.InquiryResponseDto;

import java.util.List;

public interface InquiryService {

    InquiryResponseDto createInquiry(InquiryRequestDto requestDto);

    List<InquiryResponseDto> getAllInquiries();

    InquiryResponseDto getInquiryById(Long id);
}
