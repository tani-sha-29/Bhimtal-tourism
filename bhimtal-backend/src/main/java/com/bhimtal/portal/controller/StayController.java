package com.bhimtal.portal.controller;

import com.bhimtal.portal.dto.ApiResponse;
import com.bhimtal.portal.dto.StayRequestDto;
import com.bhimtal.portal.dto.StayResponseDto;
import com.bhimtal.portal.model.StayType;
import com.bhimtal.portal.service.StayService;
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
@RequestMapping("/api/v1/stays")
@RequiredArgsConstructor
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:3000}")
public class StayController {

    private final StayService stayService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<StayResponseDto>>> getAllStays(
            @RequestParam(required = false) StayType type,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String search) {
        List<StayResponseDto> stays = stayService.getAllStays(type, maxPrice, search);
        return ResponseEntity.ok(ApiResponse.success(stays));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StayResponseDto>> getStayById(@PathVariable Long id) {
        StayResponseDto stay = stayService.getStayById(id);
        return ResponseEntity.ok(ApiResponse.success(stay));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<StayResponseDto>> createStay(
            @Valid @RequestBody StayRequestDto requestDto) {
        StayResponseDto created = stayService.createStay(requestDto);
        return new ResponseEntity<>(
                ApiResponse.success("Stay created successfully", created),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<StayResponseDto>> updateStay(
            @PathVariable Long id,
            @Valid @RequestBody StayRequestDto requestDto) {
        StayResponseDto updated = stayService.updateStay(id, requestDto);
        return ResponseEntity.ok(ApiResponse.success("Stay updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteStay(@PathVariable Long id) {
        stayService.deleteStay(id);
        return ResponseEntity.ok(ApiResponse.success("Stay deleted successfully", null));
    }
}
