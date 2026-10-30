# Bhimtal Portal Backend (`bhimtal-backend`)

A Spring Boot 3.x RESTful backend service powering the hyper-local travel and tourism platform for **Bhimtal, Uttarakhand** — covering scenic lakes, Himalayan treks, local homestays & boutique resorts, adventure sports (paragliding, kayaking), and tourist inquiry management.

---

## 🛠 Tech Stack & Dependencies

- **Java**: 21 (LTS) / compatible with 17+
- **Framework**: Spring Boot 3.3.4
- **Database Access**: Spring Data JPA & Hibernate 6
- **Database**: PostgreSQL / Supabase PostgreSQL (via PostgreSQL JDBC Driver `org.postgresql:postgresql`)
- **Validation**: Jakarta Bean Validation (`spring-boot-starter-validation`)
- **Email Service**: Spring Boot Starter Mail (`spring-boot-starter-mail`) with asynchronous notifications
- **Boilerplate Reduction**: Project Lombok
- **Testing**: JUnit 5, Mockito, AssertJ, H2 in-memory DB (for test isolation)
- **Frontend Compatibility**: Configured for Next.js frontend (`http://localhost:3000`) with complete CORS support

---

## 📂 Project Architecture & Package Structure

```
bhimtal-backend/
├── pom.xml
├── .env.example
├── README.md
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/bhimtal/portal/
    │   │       ├── BhimtalPortalApplication.java
    │   │       ├── config/
    │   │       │   ├── CorsConfig.java          # Cross-Origin configuration (Next.js 3000)
    │   │       │   └── DataInitializer.java     # Pre-populates real Bhimtal landmarks
    │   │       ├── controller/
    │   │       │   ├── PlaceController.java     # /api/v1/places
    │   │       │   ├── StayController.java      # /api/v1/stays
    │   │       │   ├── AdventureController.java # /api/v1/adventures
    │   │       │   └── InquiryController.java   # /api/v1/inquiries
    │   │       ├── dto/
    │   │       │   ├── ApiResponse.java         # Standard API response envelope
    │   │       │   ├── PlaceRequestDto.java & PlaceResponseDto.java
    │   │       │   ├── StayRequestDto.java & StayResponseDto.java
    │   │       │   ├── AdventureRequestDto.java & AdventureResponseDto.java
    │   │       │   └── InquiryRequestDto.java & InquiryResponseDto.java
    │   │       ├── exception/
    │   │       │   ├── ResourceNotFoundException.java
    │   │       │   ├── ErrorResponse.java
    │   │       │   └── GlobalExceptionHandler.java
    │   │       ├── model/
    │   │       │   ├── Place.java & PlaceCategory.java (TREK, LAKE, TEMPLE, ATTRACTION)
    │   │       │   ├── Stay.java & StayType.java (HOMESTAY, HOTEL, RESORT)
    │   │       │   ├── Adventure.java & AdventureType.java (PARAGLIDING, KAYAKING, BOATING, TREKKING)
    │   │       │   └── Inquiry.java
    │   │       ├── repository/
    │   │       │   ├── PlaceRepository.java
    │   │       │   ├── StayRepository.java
    │   │       │   ├── AdventureRepository.java
    │   │       │   └── InquiryRepository.java
    │   │       └── service/
    │   │           ├── PlaceService.java & impl/PlaceServiceImpl.java
    │   │           ├── StayService.java & impl/StayServiceImpl.java
    │   │           ├── AdventureService.java & impl/AdventureServiceImpl.java
    │   │           ├── InquiryService.java & impl/InquiryServiceImpl.java
    │   │           └── EmailService.java & impl/EmailServiceImpl.java
    │   └── resources/
    │       ├── application.yml                 # Supabase configuration with placeholders
    │       └── application-dev.yml             # Local dev profile using H2
    └── test/
        ├── java/com/bhimtal/portal/
        │   └── BhimtalPortalApplicationTests.java
        └── resources/
            └── application.yml                 # Test profile configuration
```

---

## 🗄️ Database Models

### 1. `Place` (`places` table)
- `id` (`Long`, Primary Key)
- `title` (`String`, not null)
- `slug` (`String`, unique, indexed)
- `category` (`Enum`: `TREK`, `LAKE`, `TEMPLE`, `ATTRACTION`)
- `description` (`TEXT`, not null)
- `latitude` (`Double`), `longitude` (`Double`)
- `elevation` (`String`, e.g., `"1,370 m"`)
- `difficulty` (`String`, e.g., `"Easy"`, `"Moderate"`)
- `imageUrl` (`String`)
- `isFeatured` (`Boolean`)

### 2. `Stay` (`stays` table)
- `id` (`Long`, Primary Key)
- `name` (`String`, not null)
- `type` (`Enum`: `HOMESTAY`, `HOTEL`, `RESORT`)
- `pricePerNight` (`Double`, not null)
- `location` (`String`, not null)
- `contactPhone` (`String`)
- `amenities` (`List<String>`, mapped via `@ElementCollection` in `stay_amenities`)
- `imageUrl` (`String`)

### 3. `Adventure` (`adventures` table)
- `id` (`Long`, Primary Key)
- `title` (`String`, not null)
- `activityType` (`Enum`: `PARAGLIDING`, `KAYAKING`, `BOATING`, `TREKKING`)
- `price` (`Double`, not null)
- `duration` (`String`, e.g., `"15-20 Minutes"`)
- `operatorContact` (`String`)

### 4. `Inquiry` (`inquiries` table)
- `id` (`Long`, Primary Key)
- `userName` (`String`, not null)
- `userEmail` (`String`, not null)
- `userPhone` (`String`)
- `message` (`TEXT`, not null)
- `listingType` (`String`, e.g., `"PLACE"`, `"STAY"`, `"ADVENTURE"`)
- `listingId` (`Long`)
- `createdDate` (`LocalDateTime`, defaults to now)

---

## 🏔️ Pre-Seeded Landmark Data (`DataInitializer`)

On initial startup, `DataInitializer` seeds real Bhimtal landmarks and activities into the database if empty:

- **Places**:
  - `Bhimtal Lake` (LAKE, Island aquarium, boating)
  - `Hidimba Parvat Trek` (TREK, 1,850 m, Vankhandi Ashram)
  - `Sattal Lakes` (LAKE, 7 interconnected lakes, birdwatching)
  - `Naukuchiatal` (LAKE, 9 corners, deep freshwater lake)
  - `Victoria Dam` (ATTRACTION, 1883 masonry dam, terraced flower gardens)
  - `Karkotak Temple` (TEMPLE, Serpent king shrine, panoramic valley views)
- **Stays**:
  - *The Lake Resort, Naukuchiatal* (RESORT)
  - *Fisherman's Lodge & Boutique Stay* (HOTEL)
  - *Pine Crest Heritage Homestay* (HOMESTAY)
  - *Sattal Forest Eco Resort* (RESORT)
  - *June Estate Kumaoni Homestay* (HOMESTAY)
- **Adventures**:
  - *Tandem Paragliding at Naukuchiatal Takeoff* (PARAGLIDING)
  - *High-Altitude Cross Country Paragliding - Bhimtal* (PARAGLIDING)
  - *Silent Water Kayaking & Boating at Sattal Lake* (KAYAKING)
  - *Traditional Shikara & Paddle Boating on Bhimtal Lake* (BOATING)
  - *Hidimba Parvat Guided Trek & Nature Trail* (TREKKING)

---

## ⚙️ Configuration & Supabase Connection

`src/main/resources/application.yml` provides placeholders for Supabase PostgreSQL.

You can configure Supabase either via the full JDBC URL or separate environment variables:

```bash
# Option 1: Full JDBC URL (from Supabase Connection Pooling - Session/Transaction mode)
export SPRING_DATASOURCE_URL="jdbc:postgresql://aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require"
export SPRING_DATASOURCE_USERNAME="postgres.your-project-ref"
export SPRING_DATASOURCE_PASSWORD="your-supabase-db-password"

# Option 2: Individual variables
export SUPABASE_DB_HOST="aws-0-ap-south-1.pooler.supabase.com"
export SUPABASE_DB_PORT="6543"
export SUPABASE_DB_NAME="postgres"
export SUPABASE_DB_USER="postgres.your-project-ref"
export SUPABASE_DB_PASSWORD="your-supabase-db-password"
```

### Mail Configuration:
```bash
export SPRING_MAIL_HOST="smtp.gmail.com"
export SPRING_MAIL_PORT="587"
export SPRING_MAIL_USERNAME="your-email@gmail.com"
export SPRING_MAIL_PASSWORD="your-gmail-app-password"
export NOTIFICATION_EMAIL="admin@bhimtaltravel.com"
```

---

## 🚀 Running the Project

### Prerequisites:
- Java 21 (or Java 17)
- Maven 3.8+

### 1. Build & Test:
```bash
mvn clean test
```

### 2. Run with Local In-Memory H2 Profile (No Supabase required for quick dev):
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```
Access H2 Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:bhimtal_dev`, User: `sa`, Password: empty)

### 3. Run against Supabase PostgreSQL:
```bash
mvn spring-boot:run
```

---

## 📡 REST API Reference (`/api/v1/`)

All response payloads are formatted with standard metadata:
```json
{
  "success": true,
  "message": "Success",
  "data": { ... },
  "timestamp": "2026-10-22T20:00:00"
}
```

### 📍 Places (`/api/v1/places`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/places` | List all places (supports `?category=LAKE&featured=true&search=bhimtal`) |
| `GET` | `/api/v1/places/{id}` | Get place by numerical ID |
| `GET` | `/api/v1/places/slug/{slug}` | Get place by slug (e.g., `/api/v1/places/slug/bhimtal-lake`) |
| `POST` | `/api/v1/places` | Create new place |
| `PUT` | `/api/v1/places/{id}` | Update existing place |
| `DELETE` | `/api/v1/places/{id}` | Delete place |

### 🏡 Stays (`/api/v1/stays`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/stays` | List all stays (supports `?type=HOMESTAY&maxPrice=3000&search=lake`) |
| `GET` | `/api/v1/stays/{id}` | Get stay by ID |
| `POST` | `/api/v1/stays` | Add a new homestay / hotel / resort |
| `PUT` | `/api/v1/stays/{id}` | Update stay details |
| `DELETE` | `/api/v1/stays/{id}` | Remove a stay |

### 🪂 Adventures (`/api/v1/adventures`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/adventures` | List activities (supports `?activityType=PARAGLIDING&maxPrice=3000`) |
| `GET` | `/api/v1/adventures/{id}` | Get adventure activity by ID |
| `POST` | `/api/v1/adventures` | Register new adventure activity |
| `PUT` | `/api/v1/adventures/{id}` | Update adventure activity |
| `DELETE` | `/api/v1/adventures/{id}` | Delete adventure activity |

### 📩 Inquiries (`/api/v1/inquiries`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/inquiries` | Submit tourist inquiry & trigger confirmation & notification emails |
| `GET` | `/api/v1/inquiries` | List all inquiries (sorted by date descending) |
| `GET` | `/api/v1/inquiries/{id}` | Get inquiry details by ID |

#### Example Submit Inquiry Payload:
```json
POST /api/v1/inquiries
Content-Type: application/json

{
  "userName": "Rahul Sharma",
  "userEmail": "rahul.sharma@example.com",
  "userPhone": "+91 98765 00000",
  "message": "Hi, I want to book paragliding for 2 people on Saturday morning.",
  "listingType": "ADVENTURE",
  "listingId": 1
}
```
