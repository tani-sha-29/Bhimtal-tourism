package com.bhimtal.portal.service;

import com.bhimtal.portal.dto.AdventureRequestDto;
import com.bhimtal.portal.dto.AdventureResponseDto;
import com.bhimtal.portal.model.AdventureType;

import java.util.List;

public interface AdventureService {

    List<AdventureResponseDto> getAllAdventures(AdventureType activityType, Double maxPrice, String keyword);

    AdventureResponseDto getAdventureById(Long id);

    AdventureResponseDto createAdventure(AdventureRequestDto requestDto);

    AdventureResponseDto updateAdventure(Long id, AdventureRequestDto requestDto);

    void deleteAdventure(Long id);
}
