package com.bhimtal.portal.service.impl;

import com.bhimtal.portal.dto.PlaceRequestDto;
import com.bhimtal.portal.dto.PlaceResponseDto;
import com.bhimtal.portal.exception.ResourceNotFoundException;
import com.bhimtal.portal.model.Place;
import com.bhimtal.portal.model.PlaceCategory;
import com.bhimtal.portal.repository.PlaceRepository;
import com.bhimtal.portal.service.PlaceService;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class PlaceServiceImpl implements PlaceService {

    private final PlaceRepository placeRepository;

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    @Override
    public List<PlaceResponseDto> getAllPlaces(PlaceCategory category, Boolean featured, String keyword) {
        Specification<Place> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (category != null) {
                predicates.add(cb.equal(root.get("category"), category));
            }
            if (featured != null) {
                predicates.add(cb.equal(root.get("isFeatured"), featured));
            }
            if (keyword != null && !keyword.trim().isEmpty()) {
                String pattern = "%" + keyword.trim().toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("title")), pattern),
                        cb.like(cb.lower(root.get("description")), pattern)
                ));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return placeRepository.findAll(spec)
                .stream()
                .map(PlaceResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public PlaceResponseDto getPlaceById(Long id) {
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Place", "id", id));
        return PlaceResponseDto.fromEntity(place);
    }

    @Override
    public PlaceResponseDto getPlaceBySlug(String slug) {
        Place place = placeRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Place", "slug", slug));
        return PlaceResponseDto.fromEntity(place);
    }

    @Override
    @Transactional
    public PlaceResponseDto createPlace(PlaceRequestDto requestDto) {
        String slug = (requestDto.getSlug() != null && !requestDto.getSlug().trim().isEmpty())
                ? toSlug(requestDto.getSlug())
                : toSlug(requestDto.getTitle());

        if (placeRepository.existsBySlug(slug)) {
            slug = slug + "-" + System.currentTimeMillis();
        }

        Place place = Place.builder()
                .title(requestDto.getTitle())
                .slug(slug)
                .category(requestDto.getCategory())
                .description(requestDto.getDescription())
                .latitude(requestDto.getLatitude())
                .longitude(requestDto.getLongitude())
                .elevation(requestDto.getElevation())
                .difficulty(requestDto.getDifficulty())
                .imageUrl(requestDto.getImageUrl())
                .isFeatured(Boolean.TRUE.equals(requestDto.getIsFeatured()))
                .build();

        Place savedPlace = placeRepository.save(place);
        log.info("Created new Place with id: {}, slug: {}", savedPlace.getId(), savedPlace.getSlug());
        return PlaceResponseDto.fromEntity(savedPlace);
    }

    @Override
    @Transactional
    public PlaceResponseDto updatePlace(Long id, PlaceRequestDto requestDto) {
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Place", "id", id));

        place.setTitle(requestDto.getTitle());
        place.setCategory(requestDto.getCategory());
        place.setDescription(requestDto.getDescription());
        place.setLatitude(requestDto.getLatitude());
        place.setLongitude(requestDto.getLongitude());
        place.setElevation(requestDto.getElevation());
        place.setDifficulty(requestDto.getDifficulty());
        place.setImageUrl(requestDto.getImageUrl());
        if (requestDto.getIsFeatured() != null) {
            place.setIsFeatured(requestDto.getIsFeatured());
        }

        if (requestDto.getSlug() != null && !requestDto.getSlug().trim().isEmpty()) {
            String newSlug = toSlug(requestDto.getSlug());
            if (!newSlug.equalsIgnoreCase(place.getSlug()) && placeRepository.existsBySlug(newSlug)) {
                throw new IllegalArgumentException("Place with slug '" + newSlug + "' already exists");
            }
            place.setSlug(newSlug);
        }

        Place updated = placeRepository.save(place);
        log.info("Updated Place id: {}", updated.getId());
        return PlaceResponseDto.fromEntity(updated);
    }

    @Override
    @Transactional
    public void deletePlace(Long id) {
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Place", "id", id));
        placeRepository.delete(place);
        log.info("Deleted Place id: {}", id);
    }

    private String toSlug(String input) {
        if (input == null) return "";
        String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }
}
