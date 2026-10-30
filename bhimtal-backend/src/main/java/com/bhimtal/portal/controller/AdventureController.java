package com.bhimtal.portal.controller;

import com.bhimtal.portal.dto.AdventureRequestDto;
import com.bhimtal.portal.dto.AdventureResponseDto;
import com.bhimtal.portal.dto.ApiResponse;
import com.bhimtal.portal.model.AdventureType;
import com.bhimtal.portal.service.AdventureService;
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
@RequestMapping("/api/v1/adventures")
@RequiredArgsConstructor
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:3000}")
public class AdventureController {

    private final AdventureService adventureService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<AdventureResponseDto>>> getAllAdventures(
            @RequestParam(required = false) AdventureType activityType,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String search) {
        List<AdventureResponseDto> adventures = adventureService.getAllAdventures(activityType, maxPrice, search);
        return ResponseEntity.ok(ApiResponse.success(adventures));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AdventureResponseDto>> getAdventureById(@PathVariable Long id) {
        AdventureResponseDto adventure = adventureService.getAdventureById(id);
        return ResponseEntity.ok(ApiResponse.success(adventure));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AdventureResponseDto>> createAdventure(
            @Valid @RequestBody AdventureRequestDto requestDto) {
        AdventureResponseDto created = adventureService.createAdventure(requestDto);
        return new ResponseEntity<>(
                ApiResponse.success("Adventure activity created successfully", created),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AdventureResponseDto>> updateAdventure(
            @PathVariable Long id,
            @Valid @RequestBody AdventureRequestDto requestDto) {
        AdventureResponseDto updated = adventureService.updateAdventure(id, requestDto);
        return ResponseEntity.ok(ApiResponse.success("Adventure activity updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAdventure(@PathVariable Long id) {
        adventureService.deleteAdventure(id);
        return ResponseEntity.ok(ApiResponse.success("Adventure activity deleted successfully", null));
    }
}
