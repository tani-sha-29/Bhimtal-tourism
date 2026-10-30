package com.bhimtal.portal.service.impl;

import com.bhimtal.portal.dto.StayRequestDto;
import com.bhimtal.portal.dto.StayResponseDto;
import com.bhimtal.portal.exception.ResourceNotFoundException;
import com.bhimtal.portal.model.Stay;
import com.bhimtal.portal.model.StayType;
import com.bhimtal.portal.repository.StayRepository;
import com.bhimtal.portal.service.StayService;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class StayServiceImpl implements StayService {

    private final StayRepository stayRepository;

    @Override
    public List<StayResponseDto> getAllStays(StayType type, Double maxPrice, String keyword) {
        Specification<Stay> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (type != null) {
                predicates.add(cb.equal(root.get("type"), type));
            }
            if (maxPrice != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("pricePerNight"), maxPrice));
            }
            if (keyword != null && !keyword.trim().isEmpty()) {
                String pattern = "%" + keyword.trim().toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), pattern),
                        cb.like(cb.lower(root.get("location")), pattern)
                ));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return stayRepository.findAll(spec)
                .stream()
                .map(StayResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public StayResponseDto getStayById(Long id) {
        Stay stay = stayRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stay", "id", id));
        return StayResponseDto.fromEntity(stay);
    }

    @Override
    @Transactional
    public StayResponseDto createStay(StayRequestDto requestDto) {
        Stay stay = Stay.builder()
                .name(requestDto.getName())
                .type(requestDto.getType())
                .pricePerNight(requestDto.getPricePerNight())
                .location(requestDto.getLocation())
                .contactPhone(requestDto.getContactPhone())
                .amenities(requestDto.getAmenities() != null ? new ArrayList<>(requestDto.getAmenities()) : new ArrayList<>())
                .imageUrl(requestDto.getImageUrl())
                .build();

        Stay savedStay = stayRepository.save(stay);
        log.info("Created new Stay with id: {}, name: {}", savedStay.getId(), savedStay.getName());
        return StayResponseDto.fromEntity(savedStay);
    }

    @Override
    @Transactional
    public StayResponseDto updateStay(Long id, StayRequestDto requestDto) {
        Stay stay = stayRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stay", "id", id));

        stay.setName(requestDto.getName());
        stay.setType(requestDto.getType());
        stay.setPricePerNight(requestDto.getPricePerNight());
        stay.setLocation(requestDto.getLocation());
        stay.setContactPhone(requestDto.getContactPhone());
        if (requestDto.getAmenities() != null) {
            stay.setAmenities(new ArrayList<>(requestDto.getAmenities()));
        }
        stay.setImageUrl(requestDto.getImageUrl());

        Stay updated = stayRepository.save(stay);
        log.info("Updated Stay id: {}", updated.getId());
        return StayResponseDto.fromEntity(updated);
    }

    @Override
    @Transactional
    public void deleteStay(Long id) {
        Stay stay = stayRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stay", "id", id));
        stayRepository.delete(stay);
        log.info("Deleted Stay id: {}", id);
    }
}
