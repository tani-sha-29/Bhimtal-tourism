package com.bhimtal.portal.service;

import com.bhimtal.portal.dto.StayRequestDto;
import com.bhimtal.portal.dto.StayResponseDto;
import com.bhimtal.portal.model.StayType;

import java.util.List;

public interface StayService {

    List<StayResponseDto> getAllStays(StayType type, Double maxPrice, String keyword);

    StayResponseDto getStayById(Long id);

    StayResponseDto createStay(StayRequestDto requestDto);

    StayResponseDto updateStay(Long id, StayRequestDto requestDto);

    void deleteStay(Long id);
}
