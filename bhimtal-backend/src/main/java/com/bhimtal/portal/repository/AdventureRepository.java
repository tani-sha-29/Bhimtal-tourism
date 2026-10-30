package com.bhimtal.portal.repository;

import com.bhimtal.portal.model.Adventure;
import com.bhimtal.portal.model.AdventureType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdventureRepository extends JpaRepository<Adventure, Long>, JpaSpecificationExecutor<Adventure> {

    List<Adventure> findByActivityType(AdventureType activityType);

    List<Adventure> findByPriceLessThanEqual(Double maxPrice);

    List<Adventure> findByActivityTypeAndPriceLessThanEqual(AdventureType activityType, Double maxPrice);
}
