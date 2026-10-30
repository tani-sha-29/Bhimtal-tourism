package com.bhimtal.portal.repository;

import com.bhimtal.portal.model.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {

    List<Inquiry> findAllByOrderByCreatedDateDesc();

    List<Inquiry> findByListingTypeAndListingId(String listingType, Long listingId);

    List<Inquiry> findByUserEmail(String userEmail);
}
