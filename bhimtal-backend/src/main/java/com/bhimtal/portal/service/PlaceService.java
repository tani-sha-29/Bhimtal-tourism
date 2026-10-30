package com.bhimtal.portal.service;

import com.bhimtal.portal.dto.PlaceRequestDto;
import com.bhimtal.portal.dto.PlaceResponseDto;
import com.bhimtal.portal.model.PlaceCategory;

import java.util.List;

public interface PlaceService {

    List<PlaceResponseDto> getAllPlaces(PlaceCategory category, Boolean featured, String keyword);

    PlaceResponseDto getPlaceById(Long id);

    PlaceResponseDto getPlaceBySlug(String slug);

    PlaceResponseDto createPlace(PlaceRequestDto requestDto);

    PlaceResponseDto updatePlace(Long id, PlaceRequestDto requestDto);

    void deletePlace(Long id);
}
