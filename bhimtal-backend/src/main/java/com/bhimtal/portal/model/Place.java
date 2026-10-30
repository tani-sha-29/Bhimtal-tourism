package com.bhimtal.portal.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "places", indexes = {
    @Index(name = "idx_place_slug", columnList = "slug", unique = true),
    @Index(name = "idx_place_category", columnList = "category"),
    @Index(name = "idx_place_featured", columnList = "isFeatured")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, unique = true)
    private String slug;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private PlaceCategory category;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    private Double latitude;

    private Double longitude;

    private String elevation;

    private String difficulty;

    @Column(length = 1024)
    private String imageUrl;

    @Builder.Default
    @Column(nullable = false)
    private Boolean isFeatured = false;
}
