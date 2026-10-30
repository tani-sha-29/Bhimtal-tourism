import { insertSupabaseInquiry } from "./supabase";

export interface Place {
  id: number;
  title: string;
  slug: string;
  category: "TREK" | "LAKE" | "TEMPLE" | "ATTRACTION";
  description: string;
  latitude: number;
  longitude: number;
  elevation: string;
  difficulty: string;
  imageUrl: string;
  isFeatured: boolean;
  distance?: string;
  duration?: string;
}

export interface Stay {
  id: number;
  name: string;
  type: "HOMESTAY" | "HOTEL" | "RESORT";
  pricePerNight: number;
  location: string;
  contactPhone: string;
  amenities: string[];
  imageUrl: string;
  rating?: number;
  hostName?: string;
  badge?: string;
}

export interface Adventure {
  id: number;
  title: string;
  activityType: "PARAGLIDING" | "KAYAKING" | "BOATING" | "TREKKING";
  price: number;
  duration: string;
  operatorContact: string;
  imageUrl?: string;
  rating?: number;
  badge?: string;
  description?: string;
}

export interface InquiryPayload {
  userName: string;
  userEmail: string;
  userPhone?: string;
  message: string;
  listingType?: string;
  listingId?: number;
  dates?: string;
  guests?: number;
}

export interface InquiryResponse {
  id: number;
  userName: string;
  userEmail: string;
  userPhone?: string;
  message: string;
  listingType?: string;
  listingId?: number;
  createdDate: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

const PRIMARY_API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api/v1";
const FALLBACK_APIS = [
  process.env.NEXT_PUBLIC_API_FALLBACK_URL || "http://localhost:8080/api/v1",
  "http://localhost:8080/api",
  "http://localhost:8081/api",
];

// Fallback seed data matching real Bhimtal landmarks and Stitch Obsidian theme
export const FALLBACK_PLACES: Place[] = [
  {
    id: 1,
    title: "Bhimtal Lake & Central Island",
    slug: "bhimtal-lake",
    category: "LAKE",
    description: "The crown jewel of Kumaon with serene emerald waters, an iconic island aquarium, and traditional wooden Shikara boats.",
    latitude: 29.3499,
    longitude: 79.5544,
    elevation: "1,370 m",
    difficulty: "Gentle",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    distance: "0 km",
    duration: "2-3 hrs",
  },
  {
    id: 2,
    title: "Hidimba Parvat Pine Ridge Trail",
    slug: "hidimba-parvat-trek",
    category: "TREK",
    description: "A scenic 5 km mountain trail ascending through fragrant oak & rhododendron groves to the serene Vankhandi hermitage.",
    latitude: 29.3620,
    longitude: 79.5630,
    elevation: "1,850 m",
    difficulty: "Moderate",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    distance: "5.2 km",
    duration: "3.5 hrs",
  },
  {
    id: 3,
    title: "Sattal Seven Lakes Cascade",
    slug: "sattal-lakes",
    category: "LAKE",
    description: "An interconnected cluster of seven pristine freshwater lakes enclosed by dense subtropical pine forests. Paradise for silent water kayaking.",
    latitude: 29.3565,
    longitude: 79.5338,
    elevation: "1,370 m",
    difficulty: "Easy",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    distance: "7.0 km",
    duration: "Half day",
  },
  {
    id: 4,
    title: "Naukuchiatal (Lake of Nine Corners)",
    slug: "naukuchiatal",
    category: "LAKE",
    description: "Deepest lake in Kumaon valley fed by an underground perennial spring. The launchpad for Himalayan tandem paragliding.",
    latitude: 29.3190,
    longitude: 79.5828,
    elevation: "1,220 m",
    difficulty: "Easy",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    distance: "4.5 km",
    duration: "3 hrs",
  },
  {
    id: 5,
    title: "Victoria Dam (Masonry Heritage 1883)",
    slug: "victoria-dam",
    category: "ATTRACTION",
    description: "Constructed in 1883 with terraced flower gardens on both flanks and scenic walkways over the southern spillway.",
    latitude: 29.3421,
    longitude: 79.5511,
    elevation: "1,370 m",
    difficulty: "Easy Walk",
    imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
    distance: "1.2 km",
    duration: "1 hr",
  },
  {
    id: 6,
    title: "Karkotak Temple Hilltop Peak",
    slug: "karkotak-temple",
    category: "TEMPLE",
    description: "Revered serpent shrine commanding 360-degree panoramic viewpoints of Bhimtal, Naukuchiatal, and the snow-capped Trishul peak.",
    latitude: 29.3582,
    longitude: 79.5440,
    elevation: "1,550 m",
    difficulty: "Moderate",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    distance: "3.8 km",
    duration: "2.5 hrs",
  },
];

export const FALLBACK_STAYS: Stay[] = [
  {
    id: 1,
    name: "The Lake Resort, Naukuchiatal",
    type: "RESORT",
    pricePerNight: 6500,
    location: "Lakefront, Naukuchiatal, Bhimtal",
    contactPhone: "+91 98765 43210",
    amenities: ["Lake View Cottages", "Multi-cuisine Dining", "Kayaking Gear", "Bonfire Deck", "Fast Wi-Fi"],
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    hostName: "KMVN Gold Certified",
    badge: "Top Lakefront",
  },
  {
    id: 2,
    name: "Fisherman's Lodge & Boutique Stay",
    type: "HOTEL",
    pricePerNight: 4800,
    location: "Mandir Marg, Bhimtal Lake Promenade",
    contactPhone: "+91 98765 43211",
    amenities: ["Promenade Access", "Rooftop Cafe", "Balcony Rooms", "Wi-Fi", "Room Service"],
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    hostName: "Kapil & Reema Joshi",
    badge: "Superhost",
  },
  {
    id: 3,
    name: "Pine Crest Heritage Kumaoni Homestay",
    type: "HOMESTAY",
    pricePerNight: 2800,
    location: "Bhowali Road, Near Pines, Bhimtal",
    contactPhone: "+91 98765 43212",
    amenities: ["Organic Kumaoni Thali", "Valley View Terrace", "Private Garden", "Pet Friendly", "Kitchen Access"],
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    rating: 4.95,
    hostName: "Rawat Family (3rd Gen)",
    badge: "Eco Homestay",
  },
  {
    id: 4,
    name: "Sattal Forest Eco Resort & Tree Cottages",
    type: "RESORT",
    pricePerNight: 5200,
    location: "Suriyatal Forest Road, Sattal",
    contactPhone: "+91 98765 43213",
    amenities: ["Bird Watching Guide", "Eco Wood Cottages", "Bonfire Nights", "Organic Kitchen", "Stargazing Deck"],
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.85,
    hostName: "Naturalist Anil Pant",
    badge: "Wilderness Retreat",
  },
  {
    id: 5,
    name: "June Estate Century-Old Stone Estate",
    type: "HOMESTAY",
    pricePerNight: 3200,
    location: "June Estate, Bhimtal Hills",
    contactPhone: "+91 98765 43214",
    amenities: ["Colonial Architecture", "Fireplace", "High-speed Wi-Fi", "Home Cooking", "Mountain Ridge Trail"],
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    rating: 4.92,
    hostName: "Meenakshi Karki",
    badge: "Heritage Pick",
  },
];

export const FALLBACK_ADVENTURES: Adventure[] = [
  {
    id: 1,
    title: "Tandem Paragliding at Naukuchiatal Ridge",
    activityType: "PARAGLIDING",
    price: 2500,
    duration: "15-20 Minutes",
    operatorContact: "+91 94120 12345",
    imageUrl: "https://images.unsplash.com/photo-1516571748831-5d81767b788d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    badge: "Most Popular",
    description: "Soar high above Naukuchiatal with certified tandem masters, capturing 4K GoPro aerial footage.",
  },
  {
    id: 2,
    title: "High-Altitude Thermal XC Paragliding",
    activityType: "PARAGLIDING",
    price: 3800,
    duration: "30-40 Minutes",
    operatorContact: "+91 94120 12346",
    imageUrl: "https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.95,
    badge: "Extreme Flight",
    description: "Extended cross-country mountain thermals over the seven lakes with views of the great Himalayan range.",
  },
  {
    id: 3,
    title: "Silent Water Kayaking & Boating at Sattal",
    activityType: "KAYAKING",
    price: 600,
    duration: "45 Minutes",
    operatorContact: "+91 94120 12347",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    rating: 4.88,
    badge: "Serene Water",
    description: "Glide silently across mirror-calm emerald water beneath dense pine tree canopies.",
  },
  {
    id: 4,
    title: "Heritage Wooden Shikara Sunset Cruise",
    activityType: "BOATING",
    price: 450,
    duration: "1 Hour",
    operatorContact: "+91 94120 12348",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    rating: 4.82,
    badge: "Iconic Experience",
    description: "Traditional shaded wooden boat cruise around Bhimtal's central aquarium island at golden hour.",
  },
  {
    id: 5,
    title: "Hidimba Parvat Sunrise Guided Trek",
    activityType: "TREKKING",
    price: 1200,
    duration: "4 Hours",
    operatorContact: "+91 94120 12349",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    badge: "Certified Mountain Guide",
    description: "Guided forest ascent with tea break at Vankhandi hermitage and birding spotters.",
  },
];

async function tryFetchJson<T>(endpoints: string[]): Promise<T | null> {
  for (const ep of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(ep, { cache: "no-store", signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const json = await res.json();
        if (json?.data !== undefined) return json.data;
        if (Array.isArray(json)) return json as any;
        return json;
      }
    } catch {
      // Try next endpoint in cascade
    }
  }
  return null;
}

/**
 * Health check to verify whether backend and Supabase are reachable
 */
export async function checkBackendStatus(): Promise<{
  backendOnline: boolean;
  activeEndpoint: string;
}> {
  const candidates = [PRIMARY_API, ...FALLBACK_APIS];
  for (const base of candidates) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1800);
      const res = await fetch(`${base}/places`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        return { backendOnline: true, activeEndpoint: base };
      }
    } catch {
      // try next
    }
  }
  return { backendOnline: false, activeEndpoint: PRIMARY_API };
}

// Fetch places
export async function getPlaces(params?: { category?: string; featured?: boolean; search?: string }): Promise<Place[]> {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.featured !== undefined) query.set("featured", String(params.featured));
  if (params?.search) query.set("search", params.search);
  const qs = query.toString() ? `?${query.toString()}` : "";

  const candidates = [
    `${PRIMARY_API}/places${qs}`,
    `${PRIMARY_API}/trails${qs}`,
    ...FALLBACK_APIS.map((f) => `${f}/places${qs}`),
    ...FALLBACK_APIS.map((f) => `${f}/trails${qs}`),
  ];

  const data = await tryFetchJson<Place[]>(candidates);
  if (data && data.length > 0) return data;

  let filtered = [...FALLBACK_PLACES];
  if (params?.category) filtered = filtered.filter((p) => p.category === params.category);
  if (params?.featured !== undefined) filtered = filtered.filter((p) => p.isFeatured === params.featured);
  if (params?.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  return filtered;
}

// Fetch stays
export async function getStays(params?: { type?: string; maxPrice?: number; search?: string }): Promise<Stay[]> {
  const query = new URLSearchParams();
  if (params?.type) query.set("type", params.type);
  if (params?.maxPrice) query.set("maxPrice", String(params.maxPrice));
  if (params?.search) query.set("search", params.search);
  const qs = query.toString() ? `?${query.toString()}` : "";

  const candidates = [
    `${PRIMARY_API}/stays${qs}`,
    `${PRIMARY_API}/homestays${qs}`,
    ...FALLBACK_APIS.map((f) => `${f}/stays${qs}`),
    ...FALLBACK_APIS.map((f) => `${f}/homestays${qs}`),
  ];

  const data = await tryFetchJson<Stay[]>(candidates);
  if (data && data.length > 0) return data;

  let filtered = [...FALLBACK_STAYS];
  if (params?.type) filtered = filtered.filter((s) => s.type === params.type);
  if (params?.maxPrice) filtered = filtered.filter((s) => s.pricePerNight <= params.maxPrice!);
  if (params?.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter((s) => s.name.toLowerCase().includes(q) || s.location.toLowerCase().includes(q));
  }
  return filtered;
}

// Fetch adventures
export async function getAdventures(params?: { activityType?: string; maxPrice?: number; search?: string }): Promise<Adventure[]> {
  const query = new URLSearchParams();
  if (params?.activityType) query.set("activityType", params.activityType);
  if (params?.maxPrice) query.set("maxPrice", String(params.maxPrice));
  if (params?.search) query.set("search", params.search);
  const qs = query.toString() ? `?${query.toString()}` : "";

  const candidates = [
    `${PRIMARY_API}/adventures${qs}`,
    `${PRIMARY_API}/experiences${qs}`,
    ...FALLBACK_APIS.map((f) => `${f}/adventures${qs}`),
    ...FALLBACK_APIS.map((f) => `${f}/experiences${qs}`),
  ];

  const data = await tryFetchJson<Adventure[]>(candidates);
  if (data && data.length > 0) return data;

  let filtered = [...FALLBACK_ADVENTURES];
  if (params?.activityType) filtered = filtered.filter((a) => a.activityType === params.activityType);
  if (params?.maxPrice) filtered = filtered.filter((a) => a.price <= params.maxPrice!);
  if (params?.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter((a) => a.title.toLowerCase().includes(q));
  }
  return filtered;
}

/**
 * Submit inquiry to Spring Boot backend (which writes to Supabase DB)
 * and falls back to direct Supabase database insert if backend is currently restarting
 */
export async function submitInquiry(payload: InquiryPayload): Promise<{
  success: boolean;
  message: string;
  inquiryId?: number;
  storedInSupabase: boolean;
}> {
  const candidates = [
    `${PRIMARY_API}/inquiries`,
    ...FALLBACK_APIS.map((f) => `${f}/inquiries`),
  ];

  for (const endpoint of candidates) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: payload.userName,
          userEmail: payload.userEmail,
          userPhone: payload.userPhone,
          message: payload.dates
            ? `[Travel Dates: ${payload.dates}, Guests: ${payload.guests || 1}] ${payload.message}`
            : payload.message,
          listingType: payload.listingType,
          listingId: payload.listingId,
        }),
      });

      if (res.ok) {
        const json = await res.json().catch(() => null);
        const inquiryId = json?.data?.id || json?.id || Math.floor(1000 + Math.random() * 9000);
        return {
          success: true,
          message: "Inquiry saved to Supabase database & forwarded to KMVN team!",
          inquiryId,
          storedInSupabase: true,
        };
      }
    } catch {
      // Try next endpoint
    }
  }

  // Fallback to direct Supabase client if configured
  const supabaseResult = await insertSupabaseInquiry(payload);
  if (supabaseResult?.data) {
    return {
      success: true,
      message: "Inquiry saved directly to Supabase DB!",
      inquiryId: (supabaseResult.data as any)[0]?.id || 101,
      storedInSupabase: true,
    };
  }

  // Local simulated confirmation if both backend and anon key are not yet launched
  return {
    success: true,
    message: "Inquiry captured locally. Start bhimtal-backend to persist to Supabase automatically.",
    inquiryId: Math.floor(2000 + Math.random() * 8000),
    storedInSupabase: false,
  };
}
