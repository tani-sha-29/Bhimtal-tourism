package com.bhimtal.portal.repository;

import com.bhimtal.portal.model.Stay;
import com.bhimtal.portal.model.StayType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StayRepository extends JpaRepository<Stay, Long>, JpaSpecificationExecutor<Stay> {

    List<Stay> findByType(StayType type);

    List<Stay> findByPricePerNightLessThanEqual(Double maxPrice);

    List<Stay> findByTypeAndPricePerNightLessThanEqual(StayType type, Double maxPrice);
}
