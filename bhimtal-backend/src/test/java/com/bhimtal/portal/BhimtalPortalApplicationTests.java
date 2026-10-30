package com.bhimtal.portal;

import com.bhimtal.portal.dto.InquiryRequestDto;
import com.bhimtal.portal.dto.PlaceResponseDto;
import com.bhimtal.portal.model.PlaceCategory;
import com.bhimtal.portal.repository.AdventureRepository;
import com.bhimtal.portal.repository.PlaceRepository;
import com.bhimtal.portal.repository.StayRepository;
import com.bhimtal.portal.service.InquiryService;
import com.bhimtal.portal.service.PlaceService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class BhimtalPortalApplicationTests {

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private StayRepository stayRepository;

    @Autowired
    private AdventureRepository adventureRepository;

    @Autowired
    private PlaceService placeService;

    @Autowired
    private InquiryService inquiryService;

    @MockBean
    private JavaMailSender javaMailSender;

    @Test
    void contextLoads() {
        assertThat(placeRepository).isNotNull();
        assertThat(stayRepository).isNotNull();
        assertThat(adventureRepository).isNotNull();
    }

    @Test
    @DisplayName("Verify DataInitializer seeds Bhimtal landmark places")
    void testSeedPlacesLoaded() {
        List<PlaceResponseDto> places = placeService.getAllPlaces(null, null, null);
        assertThat(places).isNotEmpty();
        assertThat(places.size()).isGreaterThanOrEqualTo(6);

        PlaceResponseDto bhimtalLake = placeService.getPlaceBySlug("bhimtal-lake");
        assertThat(bhimtalLake).isNotNull();
        assertThat(bhimtalLake.getTitle()).isEqualTo("Bhimtal Lake");
        assertThat(bhimtalLake.getCategory()).isEqualTo(PlaceCategory.LAKE);
        assertThat(bhimtalLake.getIsFeatured()).isTrue();
    }

    @Test
    @DisplayName("Verify DataInitializer seeds Stays and Adventures")
    void testSeedStaysAndAdventuresLoaded() {
        assertThat(stayRepository.count()).isGreaterThanOrEqualTo(5);
        assertThat(adventureRepository.count()).isGreaterThanOrEqualTo(5);
    }

    @Test
    @DisplayName("Verify Inquiry submission saves record")
    void testInquirySubmission() {
        InquiryRequestDto inquiryRequest = InquiryRequestDto.builder()
                .userName("Rahul Sharma")
                .userEmail("rahul@example.com")
                .userPhone("+91 99999 88888")
                .message("Looking for paragliding booking for 2 adults this weekend.")
                .listingType("ADVENTURE")
                .listingId(1L)
                .build();

        var created = inquiryService.createInquiry(inquiryRequest);
        assertThat(created).isNotNull();
        assertThat(created.getId()).isNotNull();
        assertThat(created.getUserName()).isEqualTo("Rahul Sharma");
        assertThat(created.getUserEmail()).isEqualTo("rahul@example.com");
    }
}
