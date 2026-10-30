package com.bhimtal.portal.controller;

import com.bhimtal.portal.dto.ApiResponse;
import com.bhimtal.portal.dto.PlaceRequestDto;
import com.bhimtal.portal.dto.PlaceResponseDto;
import com.bhimtal.portal.model.PlaceCategory;
import com.bhimtal.portal.service.PlaceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/places")
@RequiredArgsConstructor
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:3000}")
public class PlaceController {

    private final PlaceService placeService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PlaceResponseDto>>> getAllPlaces(
            @RequestParam(required = false) PlaceCategory category,
            @RequestParam(required = false) Boolean featured,
            @RequestParam(required = false) String search) {
        List<PlaceResponseDto> places = placeService.getAllPlaces(category, featured, search);
        return ResponseEntity.ok(ApiResponse.success(places));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PlaceResponseDto>> getPlaceById(@PathVariable Long id) {
        PlaceResponseDto place = placeService.getPlaceById(id);
        return ResponseEntity.ok(ApiResponse.success(place));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<PlaceResponseDto>> getPlaceBySlug(@PathVariable String slug) {
        PlaceResponseDto place = placeService.getPlaceBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success(place));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PlaceResponseDto>> createPlace(
            @Valid @RequestBody PlaceRequestDto requestDto) {
        PlaceResponseDto created = placeService.createPlace(requestDto);
        return new ResponseEntity<>(
                ApiResponse.success("Place created successfully", created),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PlaceResponseDto>> updatePlace(
            @PathVariable Long id,
            @Valid @RequestBody PlaceRequestDto requestDto) {
        PlaceResponseDto updated = placeService.updatePlace(id, requestDto);
        return ResponseEntity.ok(ApiResponse.success("Place updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePlace(@PathVariable Long id) {
        placeService.deletePlace(id);
        return ResponseEntity.ok(ApiResponse.success("Place deleted successfully", null));
    }
}
