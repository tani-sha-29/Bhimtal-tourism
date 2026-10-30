package com.bhimtal.portal.config;

import com.bhimtal.portal.model.Adventure;
import com.bhimtal.portal.model.AdventureType;
import com.bhimtal.portal.model.Place;
import com.bhimtal.portal.model.PlaceCategory;
import com.bhimtal.portal.model.Stay;
import com.bhimtal.portal.model.StayType;
import com.bhimtal.portal.repository.AdventureRepository;
import com.bhimtal.portal.repository.PlaceRepository;
import com.bhimtal.portal.repository.StayRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final PlaceRepository placeRepository;
    private final StayRepository stayRepository;
    private final AdventureRepository adventureRepository;

    @Bean
    public CommandLineRunner initDatabase() {
        return args -> {
            seedPlaces();
            seedStays();
            seedAdventures();
        };
    }

    private void seedPlaces() {
        if (placeRepository.count() > 0) {
            log.info("Places already initialized. Skipping seeding.");
            return;
        }

        List<Place> places = List.of(
                Place.builder()
                        .title("Bhimtal Lake")
                        .slug("bhimtal-lake")
                        .category(PlaceCategory.LAKE)
                        .description("The largest lake in the Kumaon region, Bhimtal Lake is iconic for its serene turquoise waters and an picturesque island at its center housing an aquarium. Visitors can enjoy serene Shikara boat rides, lakeside promenade walks, and peaceful mountain vistas.")
                        .latitude(29.3499)
                        .longitude(79.5544)
                        .elevation("1,370 m")
                        .difficulty("Easy")
                        .imageUrl("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80")
                        .isFeatured(true)
                        .build(),

                Place.builder()
                        .title("Hidimba Parvat Trek")
                        .slug("hidimba-parvat-trek")
                        .category(PlaceCategory.TREK)
                        .description("A scenic 5 km mountain trail ascending to Hidimba Parvat, named after the epic Mahabharata character. The route winds through fragrant oak and rhododendron forests, leading to Vankhandi Ashram where hermit monk Vankhandi Maharaj once resided.")
                        .latitude(29.3620)
                        .longitude(79.5630)
                        .elevation("1,850 m")
                        .difficulty("Moderate")
                        .imageUrl("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80")
                        .isFeatured(true)
                        .build(),

                Place.builder()
                        .title("Sattal Lakes")
                        .slug("sattal-lakes")
                        .category(PlaceCategory.LAKE)
                        .description("An interconnected cluster of seven pristine freshwater lakes (Ram Tal, Sita Tal, Lakshman Tal, Nal Damyanti Tal, etc.) set amidst dense oak and pine woodlands. A paradise for birdwatchers, silent kayaking enthusiasts, and nature campers.")
                        .latitude(29.3565)
                        .longitude(79.5338)
                        .elevation("1,370 m")
                        .difficulty("Easy")
                        .imageUrl("https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80")
                        .isFeatured(true)
                        .build(),

                Place.builder()
                        .title("Naukuchiatal")
                        .slug("naukuchiatal")
                        .category(PlaceCategory.LAKE)
                        .description("Affectionately called the 'Lake of Nine Corners', Naukuchiatal is the deepest lake in the region. Surrounded by verdant terraced slopes, it serves as the premier base for paragliding takeoffs, angling, and peaceful sunset paddling.")
                        .latitude(29.3190)
                        .longitude(79.5828)
                        .elevation("1,220 m")
                        .difficulty("Easy")
                        .imageUrl("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80")
                        .isFeatured(true)
                        .build(),

                Place.builder()
                        .title("Victoria Dam")
                        .slug("victoria-dam")
                        .category(PlaceCategory.ATTRACTION)
                        .description("Constructed in 1883 at the southern periphery of Bhimtal Lake, this 40-foot masonry dam features beautifully manicured terraced flower gardens on both flanks and scenic walkways popular for evening strolls.")
                        .latitude(29.3421)
                        .longitude(79.5511)
                        .elevation("1,370 m")
                        .difficulty("Easy")
                        .imageUrl("https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&q=80")
                        .isFeatured(false)
                        .build(),

                Place.builder()
                        .title("Karkotak Temple")
                        .slug("karkotak-temple")
                        .category(PlaceCategory.TEMPLE)
                        .description("Dedicated to the mythical serpent king Karkotak Maharaja, this revered hilltop shrine sits atop Karkotak Hill. The trail offers a tranquil pilgrim hike with panoramic 360-degree views across Bhimtal, Naukuchiatal, and the higher Himalayan ranges.")
                        .latitude(29.3582)
                        .longitude(79.5440)
                        .elevation("1,550 m")
                        .difficulty("Moderate")
                        .imageUrl("https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80")
                        .isFeatured(true)
                        .build()
        );

        placeRepository.saveAll(places);
        log.info("Successfully seeded {} Bhimtal landmark places.", places.size());
    }

    private void seedStays() {
        if (stayRepository.count() > 0) {
            log.info("Stays already initialized. Skipping seeding.");
            return;
        }

        List<Stay> stays = List.of(
                Stay.builder()
                        .name("The Lake Resort, Naukuchiatal")
                        .type(StayType.RESORT)
                        .pricePerNight(6500.0)
                        .location("Lakefront, Naukuchiatal, Bhimtal")
                        .contactPhone("+91 98765 43210")
                        .amenities(Arrays.asList("Lake View Cottages", "In-house Multi-cuisine Dining", "Kayaking Gear", "Bonfire", "Free Wi-Fi", "Valet Parking"))
                        .imageUrl("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80")
                        .build(),

                Stay.builder()
                        .name("Fisherman's Lodge & Boutique Stay")
                        .type(StayType.HOTEL)
                        .pricePerNight(4800.0)
                        .location("Mandir Marg, Bhimtal Lake Promenade")
                        .contactPhone("+91 98765 43211")
                        .amenities(Arrays.asList("Lake Promenade Access", "Rooftop Cafe", "Balcony Rooms", "Wi-Fi", "Room Service", "Airport Shuttle"))
                        .imageUrl("https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80")
                        .build(),

                Stay.builder()
                        .name("Pine Crest Heritage Homestay")
                        .type(StayType.HOMESTAY)
                        .pricePerNight(2800.0)
                        .location("Bhowali Road, Near Pines, Bhimtal")
                        .contactPhone("+91 98765 43212")
                        .amenities(Arrays.asList("Authentic Kumaoni Home Cooking", "Valley View", "Private Garden", "Pet Friendly", "Kitchen Access", "Guided Walks"))
                        .imageUrl("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80")
                        .build(),

                Stay.builder()
                        .name("Sattal Forest Eco Resort")
                        .type(StayType.RESORT)
                        .pricePerNight(5200.0)
                        .location("Suriyatal Forest Road, Sattal")
                        .contactPhone("+91 98765 43213")
                        .amenities(Arrays.asList("Bird Watching Guides", "Eco Cottages", "Bonfire Evenings", "Fresh Organic Dining", "Star Gazing Deck"))
                        .imageUrl("https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80")
                        .build(),

                Stay.builder()
                        .name("June Estate Kumaoni Homestay")
                        .type(StayType.HOMESTAY)
                        .pricePerNight(2400.0)
                        .location("June Estate, Bhimtal Hills")
                        .contactPhone("+91 98765 43214")
                        .amenities(Arrays.asList("Traditional Stone House", "Local Host Family", "Wi-Fi", "Campfire", "Complimentary Breakfast"))
                        .imageUrl("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80")
                        .build()
        );

        stayRepository.saveAll(stays);
        log.info("Successfully seeded {} Bhimtal stays (homestays & resorts).", stays.size());
    }

    private void seedAdventures() {
        if (adventureRepository.count() > 0) {
            log.info("Adventures already initialized. Skipping seeding.");
            return;
        }

        List<Adventure> adventures = List.of(
                Adventure.builder()
                        .title("Tandem Paragliding at Naukuchiatal Takeoff")
                        .activityType(AdventureType.PARAGLIDING)
                        .price(2500.0)
                        .duration("15-20 Minutes")
                        .operatorContact("+91 94120 12345")
                        .build(),

                Adventure.builder()
                        .title("High-Altitude Cross Country Paragliding - Bhimtal")
                        .activityType(AdventureType.PARAGLIDING)
                        .price(3500.0)
                        .duration("25-35 Minutes")
                        .operatorContact("+91 94120 12346")
                        .build(),

                Adventure.builder()
                        .title("Silent Water Kayaking & Boating at Sattal Lake")
                        .activityType(AdventureType.KAYAKING)
                        .price(600.0)
                        .duration("45 Minutes")
                        .operatorContact("+91 94120 12347")
                        .build(),

                Adventure.builder()
                        .title("Traditional Shikara & Paddle Boating on Bhimtal Lake")
                        .activityType(AdventureType.BOATING)
                        .price(400.0)
                        .duration("1 Hour")
                        .operatorContact("+91 94120 12348")
                        .build(),

                Adventure.builder()
                        .title("Hidimba Parvat Guided Trek & Nature Trail")
                        .activityType(AdventureType.TREKKING)
                        .price(1200.0)
                        .duration("4 Hours")
                        .operatorContact("+91 94120 12349")
                        .build()
        );

        adventureRepository.saveAll(adventures);
        log.info("Successfully seeded {} Bhimtal adventure activities.", adventures.size());
    }
}
