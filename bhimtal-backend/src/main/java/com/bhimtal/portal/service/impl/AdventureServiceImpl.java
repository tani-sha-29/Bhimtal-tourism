package com.bhimtal.portal.service.impl;

import com.bhimtal.portal.dto.AdventureRequestDto;
import com.bhimtal.portal.dto.AdventureResponseDto;
import com.bhimtal.portal.exception.ResourceNotFoundException;
import com.bhimtal.portal.model.Adventure;
import com.bhimtal.portal.model.AdventureType;
import com.bhimtal.portal.repository.AdventureRepository;
import com.bhimtal.portal.service.AdventureService;
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
public class AdventureServiceImpl implements AdventureService {

    private final AdventureRepository adventureRepository;

    @Override
    public List<AdventureResponseDto> getAllAdventures(AdventureType activityType, Double maxPrice, String keyword) {
        Specification<Adventure> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (activityType != null) {
                predicates.add(cb.equal(root.get("activityType"), activityType));
            }
            if (maxPrice != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), maxPrice));
            }
            if (keyword != null && !keyword.trim().isEmpty()) {
                String pattern = "%" + keyword.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get("title")), pattern));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return adventureRepository.findAll(spec)
                .stream()
                .map(AdventureResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public AdventureResponseDto getAdventureById(Long id) {
        Adventure adventure = adventureRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Adventure", "id", id));
        return AdventureResponseDto.fromEntity(adventure);
    }

    @Override
    @Transactional
    public AdventureResponseDto createAdventure(AdventureRequestDto requestDto) {
        Adventure adventure = Adventure.builder()
                .title(requestDto.getTitle())
                .activityType(requestDto.getActivityType())
                .price(requestDto.getPrice())
                .duration(requestDto.getDuration())
                .operatorContact(requestDto.getOperatorContact())
                .build();

        Adventure savedAdventure = adventureRepository.save(adventure);
        log.info("Created new Adventure with id: {}, title: {}", savedAdventure.getId(), savedAdventure.getTitle());
        return AdventureResponseDto.fromEntity(savedAdventure);
    }

    @Override
    @Transactional
    public AdventureResponseDto updateAdventure(Long id, AdventureRequestDto requestDto) {
        Adventure adventure = adventureRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Adventure", "id", id));

        adventure.setTitle(requestDto.getTitle());
        adventure.setActivityType(requestDto.getActivityType());
        adventure.setPrice(requestDto.getPrice());
        adventure.setDuration(requestDto.getDuration());
        adventure.setOperatorContact(requestDto.getOperatorContact());

        Adventure updated = adventureRepository.save(adventure);
        log.info("Updated Adventure id: {}", updated.getId());
        return AdventureResponseDto.fromEntity(updated);
    }

    @Override
    @Transactional
    public void deleteAdventure(Long id) {
        Adventure adventure = adventureRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Adventure", "id", id));
        adventureRepository.delete(adventure);
        log.info("Deleted Adventure id: {}", id);
    }
}
