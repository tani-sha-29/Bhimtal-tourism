package com.bhimtal.portal.repository;

import com.bhimtal.portal.model.Place;
import com.bhimtal.portal.model.PlaceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long>, JpaSpecificationExecutor<Place> {

    Optional<Place> findBySlug(String slug);

    boolean existsBySlug(String slug);

    List<Place> findByCategory(PlaceCategory category);

    List<Place> findByIsFeatured(Boolean isFeatured);

    List<Place> findByCategoryAndIsFeatured(PlaceCategory category, Boolean isFeatured);
}
