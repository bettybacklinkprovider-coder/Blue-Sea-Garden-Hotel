/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { 
  Phone, 
  MapPin, 
  Calendar, 
  Users, 
  Wifi, 
  Coffee, 
  Tv, 
  Compass, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Menu, 
  Check, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck,
  GlassWater,
  Heart,
  Maximize2,
  CalendarDays,
  Info,
  Clock,
  Briefcase,
  Copy,
  AlertTriangle,
  RefreshCw,
  Sliders,
  Globe,
  Search,
  Code,
  Layers,
  FileText,
  Trash2,
  Link
} from "lucide-react";

// --- DOMAIN TYPES & CONSTANTS ---
interface Room {
  id: string;
  name: string;
  price: number; // in EUR
  capacity: string;
  beds: string;
  size: string;
  image: string;
  description: string;
  amenities: string[];
  view: string;
  highlights: string[];
}

const ROOMS_DATA: Room[] = [
  {
    id: "standard",
    name: "Standard Room",
    price: 120,
    capacity: "2 Guests",
    beds: "1 Double Bed",
    size: "22 m²",
    image: "/assets/images/lagado_elegant_room_1791357264775.jpg",
    description: "Our Standard Room balances warm, traditional Turkish design with contemporary convenience. Thoughtfully detailed with gold-trimmed fabrics and authentic Antalya stone accents, it offers a peaceful sanctuary.",
    view: "Charming Street View",
    amenities: ["Complimentary High-speed Wi-Fi", "Individually Controlled AC", "Full HD Smart TV", "Luxury Bath Products", "Personal Safety Box", "Gourmet Minibar"],
    highlights: ["Traditional Antalya styled windows", "Satin-weave custom linens", "Plush sitting armchair"]
  },
  {
    id: "deluxe",
    name: "Deluxe Suite",
    price: 160,
    capacity: "2 Guests",
    beds: "1 Royal King Bed",
    size: "30 m²",
    image: "/assets/images/lagado_elegant_room_1791357264775.jpg",
    description: "The Deluxe Suite epitomizes luxury and romantic elegance. Spacious and light-filled, it boasts custom hand-finished gilded headboards, high plaster ceilings, and a delightful private balcony for evening relaxation.",
    view: "Private Balcony & Garden Vista",
    amenities: ["Private Balcony with Chairs", "Premium Espresso Machine", "Marble Walk-in Rain Shower", "Full HD Smart TV", "Complimentary High-speed Wi-Fi", "Luxury Bathrobes & Slippers"],
    highlights: ["Charming garden terrace views", "Velvet plum tufted sofa", "In-room artisanal tea station"]
  },
  {
    id: "superior",
    name: "Superior King Room",
    price: 210,
    capacity: "3 Guests",
    beds: "1 King Bed + 1 Daybed",
    size: "45 m²",
    image: "/assets/images/lagado_elegant_room_1791357264775.jpg",
    description: "Immerse yourself in history with our gorgeous vaulted stone ceilings and premium Ottoman craftsmanship. The Superior King offers an extensive footprint including a grand lounge space and extra bedding options.",
    view: "Scenic Old Town & Courtyard",
    amenities: ["Spacious Lounge Setting", "Turkish Bath styled Shower", "Complimentary High-speed Wi-Fi", "Wine Chiller & Stemware", "Fresh Antalya Fruit Basket", "Premium Bluetooth Soundbar"],
    highlights: ["18th-century stone arch architecture", "Plush down-filled lounge daybed", "Bespoke brass hardware fixtures"]
  },
  {
    id: "family",
    name: "Signature Family Suite",
    price: 260,
    capacity: "4 Guests",
    beds: "1 King Bed + 2 Single Beds",
    size: "55 m²",
    image: "/assets/images/lagado_elegant_room_1791357264775.jpg",
    description: "Expertly configured for absolute family comfort, this signature suite features two beautifully appointed connected bedrooms and generous outdoor space, ensuring privacy and relaxation for everyone.",
    view: "Mediterranean Breeze Patio",
    amenities: ["Two Private Bedrooms", "Two En-Suite Luxury Bathrooms", "Spacious Private Patio Area", "Dual Full HD Smart TVs", "Complimentary High-speed Wi-Fi", "In-room Dining Table"],
    highlights: ["Private outdoor terrace layout", "Dual independent climate zones", "Children's luxury welcome amenities"]
  }
];

const GALLERY_DATA = [
  {
    id: "gal-1",
    url: "/assets/images/lagado_hero_exterior_1791357223511.jpg",
    category: "Hotel",
    title: "Blue Sea Garden Exterior",
    desc: "Our historic Antalya stone facade illuminated beautifully at twilight."
  },
  {
    id: "gal-2",
    url: "/assets/images/lagado_garden_courtyard_1791357248872.jpg",
    category: "Hotel",
    title: "Botanical Central Courtyard",
    desc: "A lush, serene botanical haven with gentle fountains away from city noise."
  },
  {
    id: "gal-3",
    url: "/assets/images/lagado_elegant_room_1791357264775.jpg",
    category: "Rooms",
    title: "Elegant Ottoman Suite",
    desc: "Bespoke gold details, rich fabrics, and majestic vaulted ceilings."
  },
  {
    id: "gal-4",
    url: "/assets/images/lagado_dining_patio_1791357294293.jpg",
    category: "Interiors",
    title: "Terrace Dining Experience",
    desc: "Gourmet Turkish breakfast overlooking the turquoise Mediterranean cliffs."
  },
  {
    id: "gal-5",
    url: "/assets/images/lagado_hadrians_gate_1791357283304.jpg",
    category: "Antalya",
    title: "Historic Hadrian's Gate",
    desc: "The majestic ancient monument located just steps from Blue Sea Garden."
  }
];

// --- SEO SLUG & VERCEL LINK UTILITY FUNCTION ---
const slugifyText = (text: string, options: { separator: string; removeNumbers: boolean; lowercase: boolean }) => {
  let result = text;
  
  // Normalize Turkish & accented characters to standard alphanumeric
  result = result
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accent marks
    .replace(/[ıI]/g, "i")
    .replace(/[ğĞ]/g, "g")
    .replace(/[üÜ]/g, "u")
    .replace(/[şŞ]/g, "s")
    .replace(/[öÖ]/g, "o")
    .replace(/[çÇ]/g, "c");

  if (options.lowercase) {
    result = result.toLowerCase();
  }

  // Strip non-alphanumeric except space, hyphen, and underscore
  if (options.removeNumbers) {
    result = result.replace(/[^a-zA-Z\s\-_]/g, "");
  } else {
    result = result.replace(/[^a-zA-Z0-9\s\-_]/g, "");
  }

  const sep = options.separator || "-";
  // Replace multiple spaces, hyphens, and underscores with a single separator
  result = result.replace(/[\s\-_]+/g, sep);

  // Trim leading/trailing separators
  if (sep) {
    const escapedSep = sep.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const leadingReg = new RegExp(`^${escapedSep}+`);
    const trailingReg = new RegExp(`${escapedSep}+$`);
    result = result.replace(leadingReg, "").replace(trailingReg, "");
  }

  return result;
};

export default function App() {
  // --- STATE-BASED ROUTER ---
  const [currentPage, setCurrentPage] = useState<"home" | "rooms" | "gallery" | "contact" | "linktool">("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<string>("standard");

  // --- GALLERY FILTER & LIGHTBOX STATE ---
  const [galleryFilter, setGalleryFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // --- BOOKING FORM STATE ---
  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    roomType: "standard",
    requests: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [bookingConfirmation, setBookingConfirmation] = useState<any | null>(null);

  // --- VERCEL LINK READY (SEO) STATES ---
  const [activeSubTab, setActiveSubTab] = useState<"single" | "batch" | "auditor">("single");
  const [singleText, setSingleText] = useState<string>("Luxury Suite Booking in Antalya Türkiye");
  const [customDomain, setCustomDomain] = useState<string>("blueseagarden.vercel.app");
  const [slugSeparator, setSlugSeparator] = useState<string>("-");
  const [removeNumbers, setRemoveNumbers] = useState<boolean>(false);
  const [lowerCaseOnly, setLowerCaseOnly] = useState<boolean>(true);
  const [copyNotification, setCopyNotification] = useState<string>("");

  const [batchText, setBatchText] = useState<string>(
    "Hadrian's Gate Historic Tour\nLuxury Boutique Rooms Antalya\nTerrace Garden Dining Breakfast Menu\nAntalya Cliffs Beach Access\nContact Blue Sea Garden Hotel"
  );

  const [auditText, setAuditText] = useState<string>(
    "https://blueseagarden.vercel.app/About-Us\nhttps://blueseagarden.vercel.app/ROOMS_AND_SUITES\nhttps://blueseagarden.vercel.app/Gallery-Main?idx=2\nhttps://blueseagarden.vercel.app/contact-booking\nhttps://blueseagarden.vercel.app/FAQ_section"
  );

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyNotification(label);
    setTimeout(() => setCopyNotification(""), 2000);
  };

  // Listen for hash changes to support natural browser routing (#home, #rooms, etc.)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#/", "").replace("#", "");
      if (hash === "home" || hash === "rooms" || hash === "gallery" || hash === "contact" || hash === "linktool") {
        setCurrentPage(hash as any);
      } else {
        // default route
        setCurrentPage("home");
        window.location.hash = "#/home";
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Initialize
    if (!window.location.hash) {
      window.location.hash = "#/home";
    } else {
      handleHashChange();
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Update hash when page state changes
  const navigateTo = (page: "home" | "rooms" | "gallery" | "contact" | "linktool") => {
    window.location.hash = `#/${page}`;
    setMobileMenuOpen(false);
  };

  // Sticky Navbar state
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filtered Gallery Items
  const filteredGallery = galleryFilter === "All"
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.category === galleryFilter);

  // --- BOOKING FORM SUBMISSION & VALIDATION ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
    // Clear error
    if (formErrors[name]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!bookingForm.fullName.trim()) errors.fullName = "Please enter your full name";
    if (!bookingForm.email.trim()) {
      errors.email = "Please enter your email address";
    } else if (!/\S+@\S+\.\S+/.test(bookingForm.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!bookingForm.phone.trim()) errors.phone = "Please enter your contact phone number";
    
    if (!bookingForm.checkIn) {
      errors.checkIn = "Check-in date is required";
    } else {
      const checkInDate = new Date(bookingForm.checkIn);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (checkInDate < today) {
        errors.checkIn = "Check-in cannot be in the past";
      }
    }

    if (!bookingForm.checkOut) {
      errors.checkOut = "Check-out date is required";
    } else if (bookingForm.checkIn) {
      const checkInDate = new Date(bookingForm.checkIn);
      const checkOutDate = new Date(bookingForm.checkOut);
      if (checkOutDate <= checkInDate) {
        errors.checkOut = "Check-out must be at least one day after check-in";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Calculate nights
    const checkInDate = new Date(bookingForm.checkIn);
    const checkOutDate = new Date(bookingForm.checkOut);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));

    // Get selected room price
    const room = ROOMS_DATA.find(r => r.id === bookingForm.roomType) || ROOMS_DATA[0];
    const totalPrice = room.price * nights;

    // Create unique booking code
    const confCode = `BSG-${2026}-${Math.floor(1000 + Math.random() * 9000)}`;

    setBookingConfirmation({
      fullName: bookingForm.fullName,
      email: bookingForm.email,
      phone: bookingForm.phone,
      checkIn: bookingForm.checkIn,
      checkOut: bookingForm.checkOut,
      guests: bookingForm.guests,
      roomName: room.name,
      roomPrice: room.price,
      nights,
      totalPrice,
      confCode,
      specialRequests: bookingForm.requests
    });

    // Scroll to top of confirmation area
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const startBookingWithRoom = (roomId: string) => {
    setBookingForm(prev => ({ ...prev, roomType: roomId }));
    navigateTo("contact");
  };

  // --- IMAGE WITH FALLBACK RESILIENT COMPONENT ---
  const ResilientImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
    const [failed, setFailed] = useState(false);
    return (
      <div className={`relative overflow-hidden bg-[#180a22] ${className}`}>
        {failed ? (
          <div className="w-full h-full min-h-[140px] bg-gradient-to-tr from-[#1b0826] to-[#39154a] flex flex-col items-center justify-center p-4 text-center">
            <Sparkles className="w-6 h-6 text-[#d4af37] mb-1" />
            <span className="font-display text-xs text-[#f3e5ab] tracking-wider uppercase">Blue Sea Garden Hotel</span>
            <span className="text-[10px] text-gray-400 mt-0.5">Antalya, Turkey</span>
          </div>
        ) : (
          <img 
            src={src} 
            alt={alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0d0611] text-[#f6eeff] font-sans-body flex flex-col relative">
      
      {/* --- REUSABLE HEADER / STICKY NAVIGATION --- */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-[#0d0611]/95 backdrop-blur-md py-3 border-b border-[#d4af37]/25 shadow-lg shadow-[#000]/40" 
          : "bg-transparent py-5 border-b border-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* Zone 1: Brand title (One single text element) */}
            <div className="flex-shrink-0">
              <a 
                href="#/home" 
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("home");
                }}
                className="text-xs sm:text-base md:text-lg lg:text-xl font-display font-bold tracking-wider sm:tracking-widest text-gold-gradient cursor-pointer block whitespace-nowrap"
              >
                BLUE SEA GARDEN HOTEL & GARDENS
              </a>
            </div>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6">
              {[
                { name: "Home", page: "home" },
                { name: "Rooms & Suites", page: "rooms" },
                { name: "Gallery", page: "gallery" },
                { name: "Contact & Booking", page: "contact" },
                { name: "Vercel Link Ready", page: "linktool" }
              ].map((item) => (
                <a
                  key={item.page}
                  href={`#/${item.page}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(item.page as any);
                  }}
                  className={`text-xs font-semibold tracking-wider uppercase transition-all duration-200 relative py-1 hover:text-[#f3e5ab] ${
                    currentPage === item.page 
                      ? "text-[#d4af37]" 
                      : "text-gray-300"
                  }`}
                >
                  {item.name}
                  {currentPage === item.page && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#f3e5ab] to-[#aa7c11]" />
                  )}
                </a>
              ))}
            </nav>

            {/* Zone 3: Navigation Actions (Call Now & Book Stay) */}
            <div className="hidden lg:flex items-center space-x-4">
              <a 
                href="tel:+902422488213" 
                className="px-3 py-2 text-[11px] font-bold tracking-wider text-gray-300 hover:text-[#f3e5ab] flex items-center gap-1.5 transition-all duration-200 whitespace-nowrap"
              >
                <Phone className="w-3 h-3 text-[#d4af37]" />
                +90 242 248 82 13
              </a>
              <button 
                onClick={() => navigateTo("contact")}
                className="px-4 py-2 text-[11px] uppercase tracking-wider font-bold btn-gold rounded-none hover:shadow-lg transition-all duration-300 whitespace-nowrap"
              >
                Book Your Stay
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="lg:hidden flex items-center space-x-3">
              <a 
                href="tel:+902422488213" 
                className="p-2 text-gray-300 hover:text-[#f3e5ab] transition-colors"
                aria-label="Call Hotel"
              >
                <Phone className="w-4 h-4 text-[#d4af37]" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-300 hover:text-[#d4af37] focus:outline-none transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu (Sticky Cap Safety Checked) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#110817]/95 backdrop-blur-lg border-b border-[#d4af37]/20 absolute top-full left-0 right-0 py-4 px-6 shadow-2xl transition-all duration-300 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              {[
                { name: "Home", page: "home" },
                { name: "Rooms & Suites", page: "rooms" },
                { name: "Gallery", page: "gallery" },
                { name: "Contact & Booking", page: "contact" },
                { name: "Vercel Link Ready", page: "linktool" }
              ].map((item) => (
                <a
                  key={item.page}
                  href={`#/${item.page}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(item.page as any);
                  }}
                  className={`text-sm tracking-widest uppercase font-semibold py-2 block ${
                    currentPage === item.page ? "text-[#d4af37] border-l-2 border-[#d4af37] pl-3" : "text-gray-300 hover:text-[#f3e5ab] pl-3"
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2 border-t border-[#d4af37]/10 flex flex-col space-y-3">
                <a 
                  href="tel:+902422488213" 
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#f3e5ab] py-1 font-semibold"
                >
                  <Phone className="w-4 h-4 text-[#d4af37]" />
                  +90 242 248 82 13
                </a>
                <button
                  onClick={() => navigateTo("contact")}
                  className="w-full text-center py-2.5 text-xs uppercase tracking-wider font-bold btn-gold rounded-none"
                >
                  Book Your Stay
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Spacer to push content below the fixed header */}
      <div className="h-16" />

      {/* --- PAGE CONTENTS --- */}
      <main className="flex-grow">
        
        {/* ==================== PAGE 1: HOME ==================== */}
        {currentPage === "home" && (
          <div className="animate-fadeIn">
            
            {/* SECTION 1 — HERO */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
              {/* Backing Luxury Image & Scrim Overlay */}
              <div className="absolute inset-0 z-0">
                <ResilientImage 
                  src="/assets/images/lagado_hero_exterior_1791357223511.jpg" 
                  alt="Blue Sea Garden Hotel Exterior" 
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0611] via-[#100717]/80 to-[#100717]/45" />
                <div className="absolute inset-0 bg-black/35" />
              </div>

              {/* Decorative Frame */}
              <div className="absolute inset-8 border border-[#d4af37]/20 pointer-events-none z-10 hidden md:block" />

              <div className="relative z-20 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-12">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="h-[1px] w-8 bg-[#d4af37]" />
                  <span className="font-display text-xs tracking-[0.3em] uppercase text-[#f3e5ab] font-bold">Luxury Boutique Hotel</span>
                  <span className="h-[1px] w-8 bg-[#d4af37]" />
                </div>
                
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-white tracking-wider mb-6 leading-tight drop-shadow-md text-wrap-balance">
                  Blue Sea Garden Hotel & Gardens
                </h1>
                
                <p className="font-editorial italic text-[#f3e5ab] text-lg sm:text-xl md:text-2xl mb-4 text-wrap-balance">
                  A Refined Stay in the Heart of Antalya
                </p>

                <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-200 font-light tracking-wide leading-relaxed mb-10 text-wrap-balance">
                  Experience comfort, elegance and authentic Antalya hospitality in a beautifully designed hotel surrounded by the romantic charm of historic Muratpaşa Kaleiçi.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => navigateTo("contact")}
                    className="w-full sm:w-auto px-8 py-3.5 btn-gold tracking-widest text-xs uppercase font-bold"
                  >
                    Book Your Stay
                  </button>
                  <button 
                    onClick={() => navigateTo("rooms")}
                    className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-[#d4af37] text-[#f3e5ab] hover:bg-[#d4af37]/10 transition-all duration-300 tracking-widest text-xs uppercase font-bold"
                  >
                    Explore Rooms
                  </button>
                </div>
              </div>

              {/* Quick info bar footer inside hero */}
              <div className="absolute bottom-6 left-0 right-0 z-20 hidden lg:block">
                <div className="max-w-5xl mx-auto px-4 flex justify-between text-xs tracking-wider uppercase text-gray-400 font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#d4af37]" />
                    <span>Kaleiçi District, Antalya</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    <span>Turkish Hospitality Redefined</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GlassWater className="w-4 h-4 text-[#d4af37]" />
                    <span>Historic Courtyard & Garden</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2 — WELCOME TO BLUE SEA GARDEN HOTEL */}
            <section className="py-24 bg-[#0d0611] relative overflow-hidden border-t border-[#d4af37]/15">
              <div className="absolute -left-20 top-1/4 w-96 h-96 bg-[#39154a]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -right-20 bottom-1/4 w-96 h-96 bg-[#aa7c11]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  
                  {/* Text Container */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">
                        WELCOME
                      </span>
                      <div className="w-16 h-[2px] bg-gradient-to-r from-[#f3e5ab] to-[#aa7c11] my-2" />
                      <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wide text-wrap-balance">
                        Welcome to Blue Sea Garden Hotel & Gardens
                      </h2>
                    </div>

                    <p className="font-editorial italic text-[#f3e5ab] text-lg">
                      Steeped in rich Mediterranean heritage, designed with ultimate modern comfort.
                    </p>

                    <div className="text-gray-300 font-light space-y-4 leading-relaxed text-sm sm:text-base">
                      <p>
                        Nestled in the historical center of Antalya, known as Kaleiçi (Muratpaşa), our boutique hotel encapsulates the timeless beauty of southern Türkiye. From traditional cobblestone paths right at our doorstep, to customized deluxe amenities inside, we craft a hospitality experience that stays with you.
                      </p>
                      <p>
                        Whether you are here to marvel at Hadrian's Gate, sunbathe near the old harbor CLIFFS, or enjoy a tranquil, shaded morning in our private botanical courtyard garden, Blue Sea Garden Hotel & Gardens is your home away from home. Every detail, from downy bedding to local organic ingredients, is tailored with friendly Turkish grace.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#d4af37]/15">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-white block text-sm">Historic Core</span>
                          <span className="text-xs text-gray-400">Located directly in Kaleiçi</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-white block text-sm">Tranquil Garden</span>
                          <span className="text-xs text-gray-400">Restful botanical lounge</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image Container with Elegant Floating Border */}
                  <div className="relative">
                    <div className="absolute -inset-2 border border-[#d4af37]/20 translate-x-4 translate-y-4 z-0 hidden sm:block" />
                    <div className="relative z-10 glass-panel p-2 shadow-2xl">
                      <ResilientImage 
                        src="/assets/images/lagado_garden_courtyard_1791357248872.jpg" 
                        alt="Restful Garden Courtyard" 
                        className="w-full aspect-[4/3]"
                      />
                    </div>
                    {/* Tiny authentic highlight label */}
                    <div className="absolute -bottom-4 -left-4 bg-[#1b0a22] border border-[#d4af37] py-3 px-5 z-20 shadow-xl hidden sm:block">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-[#d4af37] animate-pulse" />
                        <span className="font-display text-xs text-[#f3e5ab] font-semibold tracking-widest uppercase">Antalya's Choice</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* SECTION 3 — ROOMS & COMFORT */}
            <section className="py-24 bg-[#110717] border-y border-[#d4af37]/15">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block mb-2">ACCOMMODATION</span>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wide text-wrap-balance mb-4">
                    Rooms Designed for Comfort
                  </h2>
                  <p className="text-gray-400 font-light text-sm sm:text-base">
                    Every luxury space has been crafted to harmonize historic Antalya charm with superior relaxation elements. Find your ideal haven.
                  </p>
                </div>

                {/* Rooms Preview Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                  {ROOMS_DATA.map((room) => (
                    <div 
                      key={room.id}
                      className="group bg-[#160a1f] border border-[#d4af37]/15 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#d4af37]/45 hover:shadow-2xl hover:shadow-[#d4af37]/5"
                    >
                      {/* Image Area */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <ResilientImage 
                          src={room.image} 
                          alt={room.name} 
                          className="w-full h-full"
                        />
                        <div className="absolute top-4 right-4 bg-[#0d0611]/90 border border-[#d4af37]/35 py-1 px-3 text-xs tracking-wider uppercase font-semibold text-[#f3e5ab]">
                          From €{room.price} / Night
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-[#f3e5ab] transition-colors">
                            {room.name}
                          </h3>
                          
                          {/* Unboxed Metadata (Zero Pill Compliance) */}
                          <div className="flex items-center gap-2 text-xs text-gray-400 font-light tracking-wide">
                            <span>{room.capacity}</span>
                            <span aria-hidden="true" className="text-[#d4af37]/40">·</span>
                            <span>{room.beds}</span>
                            <span aria-hidden="true" className="text-[#d4af37]/40">·</span>
                            <span>{room.size}</span>
                          </div>

                          <p className="text-gray-300 font-light text-sm line-clamp-3 leading-relaxed pt-2">
                            {room.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#d4af37]/10 flex items-center justify-between">
                          <button 
                            onClick={() => startBookingWithRoom(room.id)}
                            className="text-xs uppercase tracking-widest font-bold text-[#d4af37] hover:text-[#f3e5ab] transition-colors flex items-center gap-1.5"
                          >
                            Book Suite Now <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs italic text-gray-400 font-editorial">{room.view}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Section CTA */}
                <div className="text-center mt-12">
                  <button 
                    onClick={() => navigateTo("rooms")}
                    className="px-8 py-3 bg-transparent border border-[#d4af37] text-[#f3e5ab] hover:btn-gold transition-all duration-300 tracking-widest text-xs uppercase font-bold"
                  >
                    View All Rooms & Suites
                  </button>
                </div>

              </div>
            </section>

            {/* SECTION 4 — HOTEL EXPERIENCE */}
            <section className="py-24 bg-[#0d0611] relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block mb-2">HOTEL FEATURES</span>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wide text-wrap-balance">
                    A Stay to Remember
                  </h2>
                  <p className="text-gray-400 font-light text-sm sm:text-base mt-3">
                    Crafting a highly sophisticated hospitality journey tailored with comfort, elegance, and pristine Antalya style.
                  </p>
                </div>

                {/* 4 Premium Feature Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  
                  {/* Block 1 */}
                  <div className="bg-[#160a1f] p-8 border border-[#d4af37]/10 flex flex-col justify-between space-y-4 hover:border-[#d4af37]/45 transition-colors group">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-[#2a1135] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#0d0611] transition-all duration-300">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-display font-semibold text-white">Elegant Rooms</h3>
                      <p className="text-sm text-gray-300 font-light leading-relaxed">
                        Exquisitely designed interiors pairing traditional Turkish craftsmanship with deluxe mattresses and bespoke gold details.
                      </p>
                    </div>
                  </div>

                  {/* Block 2 */}
                  <div className="bg-[#160a1f] p-8 border border-[#d4af37]/10 flex flex-col justify-between space-y-4 hover:border-[#d4af37]/45 transition-colors group">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-[#2a1135] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#0d0611] transition-all duration-300">
                        <Heart className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-display font-semibold text-white">Warm Hospitality</h3>
                      <p className="text-sm text-gray-300 font-light leading-relaxed">
                        Attentive, round-the-clock service with helpful guest managers ready to customize your local sightseeing itinerary.
                      </p>
                    </div>
                  </div>

                  {/* Block 3 */}
                  <div className="bg-[#160a1f] p-8 border border-[#d4af37]/10 flex flex-col justify-between space-y-4 hover:border-[#d4af37]/45 transition-colors group">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-[#2a1135] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#0d0611] transition-all duration-300">
                        <Compass className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-display font-semibold text-white">Prime Antalya Location</h3>
                      <p className="text-sm text-gray-300 font-light leading-relaxed">
                        Enjoy effortless walking access to Hadrian's Gate, pristine cliffside views, and authentic local bazaars.
                      </p>
                    </div>
                  </div>

                  {/* Block 4 */}
                  <div className="bg-[#160a1f] p-8 border border-[#d4af37]/10 flex flex-col justify-between space-y-4 hover:border-[#d4af37]/45 transition-colors group">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-[#2a1135] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#0d0611] transition-all duration-300">
                        <GlassWater className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-display font-semibold text-white">Relaxing Atmosphere</h3>
                      <p className="text-sm text-gray-300 font-light leading-relaxed">
                        A peaceful botanical central garden courtyard that isolates you perfectly from external city noise.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* SECTION 5 — GALLERY PREVIEW */}
            <section className="py-24 bg-[#110717] border-y border-[#d4af37]/15">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block mb-2">VISUAL JOURNEY</span>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wide">
                      Discover Blue Sea Garden
                    </h2>
                  </div>
                  <button 
                    onClick={() => navigateTo("gallery")}
                    className="text-xs uppercase tracking-widest font-bold text-[#d4af37] hover:text-[#f3e5ab] transition-colors flex items-center gap-1.5"
                  >
                    View Entire Gallery <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Grid preview of 5 items (as GALLERY_DATA now has 5 generated images) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {GALLERY_DATA.slice(0, 5).map((item, idx) => (
                    <div 
                      key={item.id} 
                      onClick={() => {
                        navigateTo("gallery");
                        setLightboxIndex(idx);
                      }}
                      className="group relative aspect-[4/3] overflow-hidden border border-[#d4af37]/10 cursor-pointer"
                    >
                      <ResilientImage 
                        src={item.url} 
                        alt={item.title} 
                        className="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-20">
                        <span className="text-xs text-[#d4af37] uppercase tracking-widest font-bold">{item.category}</span>
                        <h4 className="font-display font-semibold text-white text-lg mt-1">{item.title}</h4>
                        <p className="text-gray-300 font-light text-xs mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* SECTION 6 — CONTACT & BOOKING CTA */}
            <section className="py-24 bg-[#0d0611] relative overflow-hidden">
              {/* Luxury Background Overlay */}
              <div className="absolute inset-0 bg-radial-gradient from-[#321342]/40 via-transparent to-transparent opacity-60 z-0" />
              
              <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="w-12 h-12 bg-[#2a1135] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mx-auto rounded-full">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-wide">
                    Your Antalya Escape Awaits
                  </h2>
                  <p className="text-gray-300 font-light text-base sm:text-lg leading-relaxed text-wrap-balance">
                    Make your stay in Antalya comfortable, elegant and unforgettable at Blue Sea Garden Hotel & Gardens. Booking directly guarantees the best rates and personalized welcome benefits.
                  </p>
                </div>

                {/* Direct info list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto my-12 text-left p-6 sm:p-8 bg-[#180a22]/80 border border-[#d4af37]/20 backdrop-blur-md">
                  <div className="space-y-2">
                    <span className="text-[#d4af37] font-semibold text-xs uppercase tracking-widest block">Direct Phone Contacts</span>
                    <a href="tel:+902422488213" className="text-xl font-bold font-mono text-white hover:text-[#f3e5ab] transition-colors block">
                      +90 242 248 82 13
                    </a>
                    <span className="text-xs text-gray-400 block">Calls, reservations, and information</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[#d4af37] font-semibold text-xs uppercase tracking-widest block">Boutique Address</span>
                    <p className="text-sm text-gray-200 font-light">
                      Kılınçarslan, Hesapçı Sk. No:65,<br />
                      07100 Muratpaşa/Antalya, Türkiye
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => navigateTo("contact")}
                    className="w-full sm:w-auto px-8 py-4 btn-gold text-xs uppercase tracking-widest font-bold"
                  >
                    Book Your Stay
                  </button>
                  <a 
                    href="tel:+902422488213"
                    className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#d4af37] text-[#f3e5ab] hover:bg-[#d4af37]/10 transition-all duration-300 tracking-widest text-xs uppercase font-bold text-center block"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==================== PAGE 2: ROOMS & SUITES ==================== */}
        {currentPage === "rooms" && (
          <div className="animate-fadeIn">
            
            {/* HERO BAR */}
            <section className="relative py-20 bg-gradient-to-b from-[#1c0828] to-[#0d0611] border-b border-[#d4af37]/15">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-bold block">ACCOMMODATIONS</span>
                <h1 className="text-4xl sm:text-5xl font-display font-bold text-white tracking-widest">
                  Rooms & Suites
                </h1>
                <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 font-light font-editorial italic">
                  Comfort, Elegance & Deep Mediterranean Relaxation
                </p>
              </div>
            </section>

            {/* DETAILED ROOM LISTING */}
            <section className="py-20 bg-[#0d0611]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
                
                {ROOMS_DATA.map((room, idx) => (
                  <div 
                    key={room.id}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                      idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    
                    {/* Visual container (5 or 6 cols depending on desktop layout choice) */}
                    <div className={`lg:col-span-6 relative ${idx % 2 === 1 ? "lg:order-last" : ""}`}>
                      <div className="absolute -inset-2 border border-[#d4af37]/25 translate-x-4 translate-y-4 z-0 hidden sm:block" />
                      <div className="relative z-10 glass-panel p-2 shadow-2xl">
                        <ResilientImage 
                          src={room.image} 
                          alt={room.name} 
                          className="w-full aspect-[4/3] lg:aspect-[16/11]"
                        />
                      </div>
                    </div>

                    {/* Information column */}
                    <div className="lg:col-span-6 space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-widest font-bold text-[#d4af37]">{room.view}</span>
                          <span className="text-lg font-mono font-semibold text-[#f3e5ab]">From €{room.price} / night</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
                          {room.name}
                        </h2>
                      </div>

                      {/* Zero-Pill Unboxed Metadata Grid */}
                      <div className="py-3 border-y border-[#d4af37]/15 flex items-center justify-start gap-6 text-xs text-gray-400 font-light tracking-wide uppercase">
                        <span>Capacity: <strong className="text-white font-medium">{room.capacity}</strong></span>
                        <span aria-hidden="true" className="text-[#d4af37]/30">·</span>
                        <span>Bedding: <strong className="text-white font-medium">{room.beds}</strong></span>
                        <span aria-hidden="true" className="text-[#d4af37]/30">·</span>
                        <span>Area: <strong className="text-white font-medium">{room.size}</strong></span>
                      </div>

                      <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed">
                        {room.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Suite Highlights:</span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300 font-light">
                          {room.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Key Amenities icon list */}
                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Included Luxury Amenities:</span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-gray-300">
                          {room.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center gap-2 font-light">
                              <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                              <span className="truncate">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <button 
                          onClick={() => startBookingWithRoom(room.id)}
                          className="px-6 py-3 btn-gold text-xs uppercase tracking-widest font-bold"
                        >
                          Book Stay Now
                        </button>
                        <a 
                          href="tel:+902422488213"
                          className="px-6 py-3 bg-transparent border border-[#d4af37]/30 text-gray-300 hover:text-white hover:border-[#d4af37] text-center text-xs uppercase tracking-widest font-bold transition-colors"
                        >
                          Inquire Room
                        </a>
                      </div>
                    </div>

                  </div>
                ))}

              </div>
            </section>

            {/* DESIGNED AROUND YOUR COMFORT */}
            <section className="py-24 bg-[#110717] border-y border-[#d4af37]/15 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  
                  <div className="space-y-6">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">BOUTIQUE LIVING</span>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wide">
                      Designed Around Your Comfort
                    </h2>
                    <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed">
                      At Blue Sea Garden Hotel, we believe comfort lies in the details. Every piece of linen, every brass faucet, and every window orientation has been configured intentionally to optimize your sleep and Mediterranean revitalization.
                    </p>

                    {/* Amenities Checklist Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      {[
                        { title: "Premium Sateen Linens", desc: "Highest thread count for perfect rest" },
                        { title: "Independent AC Systems", desc: "Quiet cooling adjusted specifically by you" },
                        { title: "Ultra-Fast Wi-Fi Connection", desc: "Complimentary access throughout the estate" },
                        { title: "Luxurious En-Suite Bath", desc: "Local marble tiling & rainfall fixtures" },
                        { title: "In-Room Smart Entertainment", desc: "Full HD TVs with streaming access" },
                        { title: "Cozy Shaded Seating", desc: "Private balconies or courtyard armchairs" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#d4af37]/15 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <div>
                            <span className="font-semibold text-white block text-sm">{item.title}</span>
                            <span className="text-xs text-gray-400 font-light">{item.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <ResilientImage 
                      src="/assets/images/lagado_garden_courtyard_1791357248872.jpg" 
                      alt="Hotel Comfort Details" 
                      className="w-full aspect-video lg:aspect-[4/3] rounded-none border border-[#d4af37]/20 shadow-2xl"
                    />
                  </div>

                </div>
              </div>
            </section>

            {/* END BOOKING CALL-TO-ACTION */}
            <section className="py-20 bg-[#0d0611] text-center">
              <div className="max-w-4xl mx-auto px-4 space-y-6">
                <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white">
                  Ready to Stay With Us?
                </h3>
                <p className="text-gray-400 font-light text-sm sm:text-base max-w-xl mx-auto">
                  Reserve your historical Antalya room today and lock in our exclusive Direct Booking rates along with standard welcome Turkish delights.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => navigateTo("contact")}
                    className="px-8 py-3.5 btn-gold tracking-widest text-xs uppercase font-bold"
                  >
                    Book Your Stay Now
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==================== PAGE 3: GALLERY ==================== */}
        {currentPage === "gallery" && (
          <div className="animate-fadeIn">
            
            {/* HERO BAR */}
            <section className="relative py-20 bg-gradient-to-b from-[#1c0828] to-[#0d0611] border-b border-[#d4af37]/15">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-bold block">PHOTO ALBUMS</span>
                <h1 className="text-4xl sm:text-5xl font-display font-bold text-white tracking-widest">
                  Blue Sea Garden Gallery
                </h1>
                <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 font-light font-editorial italic">
                  Explore Our Hotel Architecture & Antalya Old Town Atmosphere
                </p>
              </div>
            </section>

            {/* MASONRY GALLERY SYSTEM */}
            <section className="py-16 bg-[#0d0611]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Segmented Filter Control (Functional Buttons / Allowed State Segment) */}
                <div className="flex flex-wrap justify-center gap-2 mb-12 p-1.5 bg-[#180a22] border border-[#d4af37]/15 max-w-lg mx-auto rounded-none">
                  {["All", "Rooms", "Hotel", "Interiors", "Antalya"].map((category) => (
                    <button
                      key={category}
                      onClick={() => setGalleryFilter(category)}
                      className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
                        galleryFilter === category
                          ? "bg-[#d4af37] text-[#0d0611] font-bold"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGallery.map((item, index) => {
                    // Find actual index in global GALLERY_DATA for precise Lightbox navigation
                    const globalIdx = GALLERY_DATA.findIndex(g => g.id === item.id);
                    return (
                      <div 
                        key={item.id}
                        onClick={() => setLightboxIndex(globalIdx !== -1 ? globalIdx : index)}
                        className="group relative overflow-hidden border border-[#d4af37]/10 aspect-[4/3] cursor-pointer hover:border-[#d4af37]/45 transition-colors duration-300 shadow-lg"
                      >
                        <ResilientImage 
                          src={item.url} 
                          alt={item.title} 
                          className="w-full h-full"
                        />
                        {/* Overlay Card Details on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-20">
                          <span className="text-xs text-[#d4af37] uppercase tracking-widest font-bold font-mono">
                            {item.category}
                          </span>
                          <h3 className="font-display font-semibold text-white text-lg mt-1 flex items-center justify-between">
                            {item.title}
                            <Maximize2 className="w-4 h-4 text-[#d4af37]" />
                          </h3>
                          <p className="text-gray-300 font-light text-xs mt-1">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </section>

            {/* LIGHTBOX COMPONENT MODAL */}
            {lightboxIndex !== null && (
              <div className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-4 sm:p-6 animate-fadeIn">
                
                {/* Header Row */}
                <div className="flex items-center justify-between text-white py-2 z-10">
                  <div className="space-y-0.5">
                    <span className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider font-mono">
                      {GALLERY_DATA[lightboxIndex].category}
                    </span>
                    <h4 className="font-display font-bold text-sm sm:text-base">
                      {GALLERY_DATA[lightboxIndex].title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400 font-mono">
                      {lightboxIndex + 1} / {GALLERY_DATA.length}
                    </span>
                    <button 
                      onClick={() => setLightboxIndex(null)}
                      className="p-2 hover:text-[#d4af37] text-white transition-colors"
                      aria-label="Close Lightbox"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Media Stage */}
                <div className="flex-grow flex items-center justify-center relative my-4">
                  
                  {/* Left Control */}
                  <button 
                    onClick={() => setLightboxIndex(prev => prev !== null ? (prev - 1 + GALLERY_DATA.length) % GALLERY_DATA.length : null)}
                    className="absolute left-2 sm:left-4 p-3 bg-[#110817]/60 border border-white/10 hover:border-[#d4af37] text-white hover:text-[#d4af37] transition-all z-10 rounded-full"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  {/* Main Image View */}
                  <div className="max-h-[70vh] max-w-[85vw] flex items-center justify-center overflow-hidden">
                    <img 
                      src={GALLERY_DATA[lightboxIndex].url} 
                      alt={GALLERY_DATA[lightboxIndex].title}
                      referrerPolicy="no-referrer"
                      className="max-h-[70vh] max-w-[85vw] object-contain select-none"
                    />
                  </div>

                  {/* Right Control */}
                  <button 
                    onClick={() => setLightboxIndex(prev => prev !== null ? (prev + 1) % GALLERY_DATA.length : null)}
                    className="absolute right-2 sm:right-4 p-3 bg-[#110817]/60 border border-white/10 hover:border-[#d4af37] text-white hover:text-[#d4af37] transition-all z-10 rounded-full"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                </div>

                {/* Footer caption block */}
                <div className="text-center text-gray-300 max-w-xl mx-auto py-2">
                  <p className="text-sm font-light italic">
                    "{GALLERY_DATA[lightboxIndex].desc}"
                  </p>
                  <p className="text-[11px] text-gray-500 font-mono uppercase mt-2 tracking-wider">
                    Location: Muratpaşa / Antalya / Türkiye
                  </p>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ==================== PAGE 4: CONTACT & BOOKING ==================== */}
        {currentPage === "contact" && (
          <div className="animate-fadeIn">
            
            {/* HERO BAR */}
            <section className="relative py-20 bg-gradient-to-b from-[#1c0828] to-[#0d0611] border-b border-[#d4af37]/15">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-bold block">RESERVATIONS & REACH</span>
                <h1 className="text-4xl sm:text-5xl font-display font-bold text-white tracking-widest">
                  Contact & Booking
                </h1>
                <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 font-light font-editorial italic">
                  Plan Your Authentic Stay at Blue Sea Garden Hotel & Gardens
                </p>
              </div>
            </section>

            <section className="py-16 bg-[#0d0611]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Split layout: Info / Form */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  
                  {/* COLUMN 1: CONTACT INFORMATION (5 Cols) */}
                  <div className="lg:col-span-5 space-y-8">
                    
                    <div>
                      <h2 className="text-2xl font-display font-bold text-white tracking-wide mb-2">
                        Get In Touch
                      </h2>
                      <p className="text-gray-400 text-sm font-light leading-relaxed">
                        Have special requests, custom travel groups, or dietary inquiries? Our Antalya boutique coordinators are happy to assist you at any hour.
                      </p>
                    </div>

                    {/* Cards Container */}
                    <div className="space-y-4">
                      
                      {/* Phone Card */}
                      <div className="bg-[#160a1f] p-5 border border-[#d4af37]/15 flex items-start gap-4">
                        <div className="w-10 h-10 bg-[#2a1135] border border-[#d4af37]/35 flex items-center justify-center text-[#d4af37] shrink-0">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37] block">Telephone</span>
                          <a href="tel:+902422488213" className="text-base sm:text-lg font-bold font-mono text-white hover:text-[#f3e5ab] transition-colors block">
                            +90 242 248 82 13
                          </a>
                          <span className="text-xs text-gray-400 font-light block">Direct boutique booking & reception</span>
                        </div>
                      </div>

                      {/* Location Card */}
                      <div className="bg-[#160a1f] p-5 border border-[#d4af37]/15 flex items-start gap-4">
                        <div className="w-10 h-10 bg-[#2a1135] border border-[#d4af37]/35 flex items-center justify-center text-[#d4af37] shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37] block">Address Location</span>
                          <p className="text-sm text-gray-200 font-semibold">
                            Kılınçarslan, Hesapçı Sk. No:65,<br />
                            07100 Muratpaşa/Antalya, Türkiye
                          </p>
                          <span className="text-xs text-gray-400 font-light block">Situated in historic Kaleiçi district</span>
                        </div>
                      </div>

                      {/* Booking Hours Card */}
                      <div className="bg-[#160a1f] p-5 border border-[#d4af37]/15 flex items-start gap-4">
                        <div className="w-10 h-10 bg-[#2a1135] border border-[#d4af37]/35 flex items-center justify-center text-[#d4af37] shrink-0">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37] block">Availability</span>
                          <p className="text-sm text-gray-200 font-semibold">
                            24/7 Front Desk Support
                          </p>
                          <span className="text-xs text-gray-400 font-light block">Express check-in/out and luggage lockroom</span>
                        </div>
                      </div>

                    </div>

                    {/* Neighborhood highlights block */}
                    <div className="p-6 bg-[#160a1f]/60 border border-[#d4af37]/10 space-y-3">
                      <h4 className="text-sm uppercase tracking-widest font-bold text-[#f3e5ab]">Walking Distances:</h4>
                      <ul className="text-xs text-gray-300 font-light space-y-2">
                        <li className="flex justify-between"><span>Hadrian's Gate Historical Arch:</span> <strong className="text-white">3 mins</strong></li>
                        <li className="flex justify-between"><span>Mermerli Beach & Old Harbor:</span> <strong className="text-white">5 mins</strong></li>
                        <li className="flex justify-between"><span>Muratpaşa Historical Mosque:</span> <strong className="text-white">6 mins</strong></li>
                        <li className="flex justify-between"><span>Antalya Tram Station:</span> <strong className="text-white">4 mins</strong></li>
                      </ul>
                    </div>

                  </div>

                  {/* COLUMN 2: THE BOOKING FORM & INTERACTIVE CONFIRMATION (7 Cols) */}
                  <div className="lg:col-span-7">
                    
                    {!bookingConfirmation ? (
                      <div className="bg-[#160a1f] border border-[#d4af37]/25 p-6 sm:p-8 shadow-xl">
                        <div className="mb-6 space-y-1">
                          <h3 className="text-xl font-display font-bold text-white tracking-wide">
                            Direct Stay Inquiry
                          </h3>
                          <p className="text-gray-400 text-xs font-light">
                            Fill in your dates and guest information below. Best rate guaranteed automatically.
                          </p>
                        </div>

                        <form onSubmit={handleBookingSubmit} className="space-y-5">
                          
                          {/* Full Name */}
                          <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block">Full Name</label>
                            <input 
                              type="text" 
                              name="fullName"
                              value={bookingForm.fullName}
                              onChange={handleInputChange}
                              placeholder="e.g. Elena Rostova"
                              className="w-full bg-[#0d0611] border border-[#d4af37]/20 focus:border-[#d4af37] py-2 px-4 text-sm text-white rounded-none outline-none transition-colors"
                            />
                            {formErrors.fullName && <p className="text-red-400 text-xs mt-0.5">{formErrors.fullName}</p>}
                          </div>

                          {/* Email & Phone Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block">Email Address</label>
                              <input 
                                type="email" 
                                name="email"
                                value={bookingForm.email}
                                onChange={handleInputChange}
                                placeholder="elena@example.com"
                                className="w-full bg-[#0d0611] border border-[#d4af37]/20 focus:border-[#d4af37] py-2 px-4 text-sm text-white rounded-none outline-none transition-colors"
                              />
                              {formErrors.email && <p className="text-red-400 text-xs mt-0.5">{formErrors.email}</p>}
                            </div>
                            
                            <div className="space-y-1">
                              <label className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block">Phone Number</label>
                              <input 
                                type="tel" 
                                name="phone"
                                value={bookingForm.phone}
                                onChange={handleInputChange}
                                placeholder="+90 555 123 4567"
                                className="w-full bg-[#0d0611] border border-[#d4af37]/20 focus:border-[#d4af37] py-2 px-4 text-sm text-white rounded-none outline-none transition-colors"
                              />
                              {formErrors.phone && <p className="text-red-400 text-xs mt-0.5">{formErrors.phone}</p>}
                            </div>
                          </div>

                          {/* Check-in & Check-out Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block flex items-center gap-1.5">
                                <CalendarDays className="w-3.5 h-3.5" /> Check-In Date
                              </label>
                              <input 
                                type="date" 
                                name="checkIn"
                                value={bookingForm.checkIn}
                                onChange={handleInputChange}
                                className="w-full bg-[#0d0611] border border-[#d4af37]/20 focus:border-[#d4af37] py-2 px-4 text-sm text-white rounded-none outline-none transition-colors"
                              />
                              {formErrors.checkIn && <p className="text-red-400 text-xs mt-0.5">{formErrors.checkIn}</p>}
                            </div>
                            
                            <div className="space-y-1">
                              <label className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block flex items-center gap-1.5">
                                <CalendarDays className="w-3.5 h-3.5" /> Check-Out Date
                              </label>
                              <input 
                                type="date" 
                                name="checkOut"
                                value={bookingForm.checkOut}
                                onChange={handleInputChange}
                                className="w-full bg-[#0d0611] border border-[#d4af37]/20 focus:border-[#d4af37] py-2 px-4 text-sm text-white rounded-none outline-none transition-colors"
                              />
                              {formErrors.checkOut && <p className="text-red-400 text-xs mt-0.5">{formErrors.checkOut}</p>}
                            </div>
                          </div>

                          {/* Guests & Room Type Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block">Number of Guests</label>
                              <select 
                                name="guests"
                                value={bookingForm.guests}
                                onChange={handleInputChange}
                                className="w-full bg-[#0d0611] border border-[#d4af37]/20 focus:border-[#d4af37] py-2 px-4 text-sm text-white rounded-none outline-none transition-colors"
                              >
                                <option value="1">1 Guest</option>
                                <option value="2">2 Guests</option>
                                <option value="3">3 Guests</option>
                                <option value="4">4 Guests</option>
                                <option value="5">5+ Guests (Custom Request)</option>
                              </select>
                            </div>
                            
                            <div className="space-y-1">
                              <label className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block font-semibold">Selected Suite Option</label>
                              <select 
                                name="roomType"
                                value={bookingForm.roomType}
                                onChange={handleInputChange}
                                className="w-full bg-[#0d0611] border border-[#d4af37]/20 focus:border-[#d4af37] py-2 px-4 text-sm text-white rounded-none outline-none transition-colors"
                              >
                                {ROOMS_DATA.map(r => (
                                  <option key={r.id} value={r.id}>
                                    {r.name} — €{r.price}/night
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Special Requests */}
                          <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block">Special Requests / Notes</label>
                            <textarea 
                              name="requests"
                              value={bookingForm.requests}
                              onChange={handleInputChange}
                              rows={3}
                              placeholder="Airport pickup service, dietary restrictions, early arrival, honeymoon package..."
                              className="w-full bg-[#0d0611] border border-[#d4af37]/20 focus:border-[#d4af37] py-2 px-4 text-sm text-white rounded-none outline-none transition-colors resize-none"
                            />
                          </div>

                          <div className="pt-2">
                            <button 
                              type="submit" 
                              className="w-full py-3.5 btn-gold font-bold uppercase tracking-widest text-xs rounded-none transition-all duration-300"
                            >
                              Reserve My Suite
                            </button>
                            <p className="text-[11px] text-gray-400 text-center mt-3 font-light">
                              🔒 Your data is fully encrypted. No payment card required to secure direct booking proposal.
                            </p>
                          </div>

                        </form>
                      </div>
                    ) : (
                      /* SUCCESSFUL CONFIRMATION INTERFACE (Highly Professional) */
                      <div className="bg-[#170a22] border-2 border-green-500/50 p-6 sm:p-8 text-left space-y-6 shadow-2xl animate-scaleIn">
                        
                        {/* Checkmark header */}
                        <div className="flex items-center gap-3 pb-4 border-b border-[#d4af37]/25">
                          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 shrink-0">
                            <ShieldCheck className="w-7 h-7" />
                          </div>
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-green-400 block font-mono">Stay Reserved Successfully</span>
                            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                              Stay Code: <span className="text-[#f3e5ab]">{bookingConfirmation.confCode}</span>
                            </h3>
                          </div>
                        </div>

                        {/* Summary breakdown */}
                        <div className="space-y-4 text-sm text-gray-300">
                          <p className="text-xs text-gray-400 font-light">
                            Dear <strong className="text-white">{bookingConfirmation.fullName}</strong>, thank you for booking directly with Blue Sea Garden Hotel in Antalya, Türkiye. A detailed summary package has been dispatched to <strong className="text-white">{bookingConfirmation.email}</strong>.
                          </p>

                          <div className="bg-[#0d0611] p-4 border border-[#d4af37]/15 space-y-3">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block">Inquiry Summary:</span>
                            <div className="grid grid-cols-2 gap-y-2 text-xs font-light">
                              <div>Room Class:</div>
                              <div className="text-white font-semibold text-right">{bookingConfirmation.roomName}</div>
                              
                              <div>Daily Base Rate:</div>
                              <div className="text-white font-semibold text-right">€{bookingConfirmation.roomPrice}</div>
                              
                              <div>Stay Duration:</div>
                              <div className="text-white font-semibold text-right">{bookingConfirmation.nights} {bookingConfirmation.nights === 1 ? "Night" : "Nights"}</div>
                              
                              <div>Guest Count:</div>
                              <div className="text-white font-semibold text-right">{bookingConfirmation.guests} {parseInt(bookingConfirmation.guests) === 1 ? "Guest" : "Guests"}</div>
                              
                              <div>Check-in:</div>
                              <div className="text-white font-semibold text-right font-mono">{bookingConfirmation.checkIn}</div>
                              
                              <div>Check-out:</div>
                              <div className="text-white font-semibold text-right font-mono">{bookingConfirmation.checkOut}</div>
                            </div>
                            
                            <div className="pt-2.5 border-t border-[#d4af37]/15 flex items-center justify-between text-sm">
                              <span className="font-semibold text-white">Estimated Total:</span>
                              <span className="text-[#f3e5ab] font-bold font-mono text-base">€{bookingConfirmation.totalPrice}</span>
                            </div>
                          </div>

                          {bookingConfirmation.specialRequests && (
                            <div className="p-3 bg-[#0d0611]/50 border border-white/5 text-xs">
                              <span className="font-bold text-[#d4af37] uppercase tracking-wider block mb-1">Your Special Request:</span>
                              <p className="italic font-light text-gray-300">"{bookingConfirmation.specialRequests}"</p>
                            </div>
                          )}

                          {/* Important Note */}
                          <div className="flex gap-3 items-start p-3 bg-blue-500/5 text-xs text-blue-300 border border-blue-500/20">
                            <Info className="w-4 h-4 shrink-0 mt-0.5" />
                            <p className="font-light leading-relaxed">
                              Our reception desk will contact you via WhatsApp/Phone (<strong className="text-white">{bookingConfirmation.phone}</strong>) within 4 hours to verify arrival details and secure complimentary airport transfers if qualified.
                            </p>
                          </div>
                        </div>

                        {/* Reset button */}
                        <div className="pt-4 flex flex-col sm:flex-row gap-3">
                          <button 
                            onClick={() => {
                              setBookingConfirmation(null);
                              setBookingForm({
                                fullName: "",
                                email: "",
                                phone: "",
                                checkIn: "",
                                checkOut: "",
                                guests: "2",
                                roomType: "standard",
                                requests: ""
                              });
                            }}
                            className="flex-grow py-3 border border-[#d4af37] text-[#f3e5ab] hover:bg-[#d4af37]/10 uppercase tracking-wider text-xs font-bold transition-all text-center block"
                          >
                            Submit Another Reservation
                          </button>
                          <button 
                            onClick={() => navigateTo("gallery")}
                            className="flex-grow py-3 btn-gold uppercase tracking-wider text-xs font-bold text-center block"
                          >
                            Explore Local Surroundings
                          </button>
                        </div>

                      </div>
                    )}

                  </div>

                </div>

                {/* MAP & LOCATION SECTION */}
                <div className="mt-24 pt-16 border-t border-[#d4af37]/15 space-y-8">
                  <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">INTERACTIVE ROADMAP</span>
                    <h3 className="text-3xl font-display font-bold text-white tracking-wide">
                      Our Location in Kaleiçi
                    </h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">
                      Kılınçarslan, Hesapçı Sk. No:65, 07100 Muratpaşa/Antalya, Türkiye
                    </p>
                  </div>

                  {/* High Fidelity Visual Street Map representation */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#160a1f] p-4 sm:p-8 border border-[#d4af37]/20 shadow-xl relative">
                    
                    {/* Visual Interactive Drawing Map container */}
                    <div className="lg:col-span-8 relative bg-[#0d0611] border border-[#d4af37]/15 aspect-video overflow-hidden">
                      {/* Grid overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a0d24_1px,transparent_1px),linear-gradient(to_bottom,#1a0d24_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
                      
                      {/* Stylized custom SVG street layout vector graphic */}
                      <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full text-gray-600 opacity-80" aria-hidden="true">
                        {/* Sea area */}
                        <path d="M 0,0 L 220,0 L 190,450 L 0,450 Z" fill="#0c1d2e" />
                        <text x="50" y="220" fill="#4d88b3" className="font-display text-xs tracking-widest font-semibold uppercase italic" transform="rotate(-75, 50, 220)">Mediterranean Sea</text>

                        {/* Cliffs boundary */}
                        <path d="M 220,0 C 210,150 200,300 190,450" fill="none" stroke="#d4af37" strokeWidth="2.5" strokeDasharray="5,5" />

                        {/* Coastal Road (Hesapçı Street) */}
                        <path d="M 320,0 C 330,180 340,320 380,450" fill="none" stroke="#4a3455" strokeWidth="28" />
                        <path d="M 320,0 C 330,180 340,320 380,450" fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="3,3" />

                        {/* Horizontal Cross Streets */}
                        <path d="M 195,120 L 800,160" fill="none" stroke="#4a3455" strokeWidth="20" />
                        <path d="M 205,310 L 800,280" fill="none" stroke="#4a3455" strokeWidth="20" />

                        {/* Old Harbor cliff landmark label */}
                        <circle cx="210" cy="120" r="14" fill="#1b0826" stroke="#d4af37" strokeWidth="1.5" />
                        <text x="235" y="124" fill="#f3e5ab" className="text-[10px] uppercase font-bold tracking-widest">Mermerli Beach Cliffs</text>

                        {/* Hadrian's Gate Gate intersection and icon */}
                        <rect x="680" y="130" width="40" height="40" fill="#1b0826" stroke="#d4af37" strokeWidth="2" />
                        <text x="700" y="154" fill="#d4af37" className="text-xs text-center font-display font-bold" textAnchor="middle">⛩️</text>
                        <text x="680" y="190" fill="#f3e5ab" className="text-[10px] uppercase font-bold tracking-widest">Hadrian's Gate</text>

                        {/* Marina label */}
                        <circle cx="100" cy="380" r="16" fill="#1b0826" stroke="#d4af37" strokeWidth="1.5" />
                        <text x="80" y="384" fill="white">⛵</text>
                        <text x="130" y="384" fill="#f3e5ab" className="text-[10px] uppercase font-bold tracking-widest">Antalya Marina</text>

                        {/* HOTEL PINPOINT HIGHLIGHT */}
                        <g transform="translate(337, 230)" className="animate-bounce">
                          {/* Pulsing ring */}
                          <circle cx="0" cy="-10" r="25" fill="#d4af37" className="animate-ping opacity-25" />
                          <circle cx="0" cy="-10" r="12" fill="#d4af37" className="opacity-40" />
                          {/* Inner pin */}
                          <path d="M-10,-10 C-10,-25 10,-25 10,-10 C10,0 0,15 0,15 C0,15 -10,0 -10,-10 Z" fill="#d4af37" stroke="#0d0611" strokeWidth="1.5" />
                          <circle cx="0" cy="-10" r="4.5" fill="#0d0611" />
                        </g>
                        
                        {/* Hotel Info Box inside vector map */}
                        <rect x="375" y="210" width="180" height="48" fill="#0d0611" stroke="#d4af37" strokeWidth="1" />
                        <text x="385" y="228" fill="white" className="text-[11px] font-display font-bold">Blue Sea Garden Hotel & Gardens</text>
                        <text x="385" y="244" fill="#d4af37" className="text-[9px] uppercase tracking-wider font-semibold">Your Blue Sea Garden Haven</text>

                      </svg>
                    </div>

                    {/* Neighborhood highlights panel */}
                    <div className="lg:col-span-4 space-y-6">
                      <div className="space-y-2">
                        <span className="text-[#d4af37] font-semibold text-xs uppercase tracking-widest block font-mono">Location Overview</span>
                        <h4 className="text-xl font-display font-bold text-white">In the Heart of History</h4>
                        <p className="text-gray-300 font-light text-xs sm:text-sm leading-relaxed">
                          We are located on the quiet Hesapçı Street, adjacent to historic stone mansions. Our position allows complete seclusion while remaining just a 3-minute stroll from local dining avenues and direct transport transit links.
                        </p>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-[#d4af37]/15">
                        <a 
                          href="https://maps.google.com/?q=Blue+Sea+Garden+Hotel+Muratpasa+Antalya+Turkey" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-3 bg-[#d4af37] text-[#0d0611] font-bold text-center text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#f3e5ab] transition-colors"
                        >
                          Get Directions <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </section>

          </div>
        )}

        {currentPage === "linktool" && (
          <div className="animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
            
            {/* Header section */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="h-[1px] w-8 bg-[#d4af37]" />
                <span className="font-display text-xs tracking-[0.3em] uppercase text-[#f3e5ab] font-bold">Backlink SEO & Vercel Prep</span>
                <span className="h-[1px] w-8 bg-[#d4af37]" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-widest">
                Vercel Link Ready
              </h1>
              <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed text-wrap-balance italic font-editorial">
                "Vercel par deploy karte waqt uppercase characters link ko break kar sakte hain." Convert your page titles, anchors, and keywords to strictly lowercase (small alphabets) with perfect hyphens.
              </p>
            </div>

            {/* Quick alert bar explaining case sensitivity on Vercel */}
            <div className="bg-[#1c0827]/80 border border-[#d4af37]/30 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5 sm:mt-0" />
                <div className="space-y-0.5">
                  <h4 className="text-sm font-semibold text-white">Why Case-Sensitivity Matters on Vercel</h4>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    Vercel hosts on Linux, which is strictly case-sensitive. If you type <code className="text-[#f3e5ab] bg-[#0d0611] px-1 py-0.5 rounded">/About</code> but your Vercel route is <code className="text-[#f3e5ab] bg-[#0d0611] px-1 py-0.5 rounded">/about</code>, the backlink will throw a <strong className="text-red-400">404 Not Found</strong>. Keeping alphabets small ensures links are always ready.
                  </p>
                </div>
              </div>
              <div className="text-xs text-[#d4af37] font-semibold whitespace-nowrap bg-[#0d0611] px-3 py-1.5 border border-[#d4af37]/25">
                Active: Case-Insensitive Bypass
              </div>
            </div>

            {/* Main tab switching container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Navigation Tabs & Settings */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Tab select buttons */}
                <div className="bg-[#160a1f] border border-[#d4af37]/15 p-2 space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block px-3 py-1.5 font-bold">Select Utility</span>
                  
                  <button
                    onClick={() => setActiveSubTab("single")}
                    className={`w-full text-left px-3 py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-colors ${
                      activeSubTab === "single" 
                        ? "bg-[#d4af37] text-[#0d0611]" 
                        : "text-gray-300 hover:bg-[#2a1135] hover:text-[#f3e5ab]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Link className="w-4 h-4" />
                      Single Link Slugger
                    </span>
                    <ChevronRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => setActiveSubTab("batch")}
                    className={`w-full text-left px-3 py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-colors ${
                      activeSubTab === "batch" 
                        ? "bg-[#d4af37] text-[#0d0611]" 
                        : "text-gray-300 hover:bg-[#2a1135] hover:text-[#f3e5ab]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      Batch Slug Generator
                    </span>
                    <ChevronRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => setActiveSubTab("auditor")}
                    className={`w-full text-left px-3 py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-colors ${
                      activeSubTab === "auditor" 
                        ? "bg-[#d4af37] text-[#0d0611]" 
                        : "text-gray-300 hover:bg-[#2a1135] hover:text-[#f3e5ab]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      Vercel Link Auditor
                    </span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Shared Config Panel */}
                <div className="bg-[#160a1f] border border-[#d4af37]/15 p-5 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#d4af37]/15">
                    <Sliders className="w-4 h-4 text-[#d4af37]" />
                    <h3 className="text-xs uppercase tracking-widest font-bold text-white">Slug Configuration</h3>
                  </div>

                  {/* Vercel Custom Target Domain */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300 font-semibold block">Target Vercel Domain</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-2.5 w-4 h-4 text-[#d4af37]/60" />
                      <input 
                        type="text" 
                        value={customDomain}
                        onChange={(e) => setCustomDomain(e.target.value)}
                        placeholder="my-project.vercel.app"
                        className="w-full bg-[#0d0611] text-white border border-[#d4af37]/20 pl-9 pr-3 py-2 text-xs focus:border-[#d4af37] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Custom Separator */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300 font-semibold block">Slug Separator</label>
                    <select 
                      value={slugSeparator}
                      onChange={(e) => setSlugSeparator(e.target.value)}
                      className="w-full bg-[#0d0611] text-white border border-[#d4af37]/20 px-3 py-2 text-xs focus:border-[#d4af37] focus:outline-none"
                    >
                      <option value="-">Hyphen ( - ) [Recommended for SEO]</option>
                      <option value="_">Underscore ( _ )</option>
                      <option value="">None (Concatenated)</option>
                    </select>
                  </div>

                  {/* Options */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={lowerCaseOnly} 
                        onChange={(e) => setLowerCaseOnly(e.target.checked)}
                        className="rounded border-[#d4af37]/35 text-[#d4af37] focus:ring-[#d4af37] bg-[#0d0611] w-4 h-4"
                      />
                      <span className="text-xs text-gray-300 font-light select-none">Strictly Lowercase Small Alphabets</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={removeNumbers} 
                        onChange={(e) => setRemoveNumbers(e.target.checked)}
                        className="rounded border-[#d4af37]/35 text-[#d4af37] focus:ring-[#d4af37] bg-[#0d0611] w-4 h-4"
                      />
                      <span className="text-xs text-gray-300 font-light select-none">Remove Numbers & Symbols</span>
                    </label>
                  </div>
                </div>

              </div>

              {/* Right Column: Active Interactive Utility Work Area */}
              <div className="lg:col-span-8 bg-[#160a1f] border border-[#d4af37]/15 p-6 sm:p-8 space-y-6">
                
                {/* TAB 1: SINGLE CONVERTER */}
                {activeSubTab === "single" && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-lg font-display font-bold text-white uppercase tracking-wider">Single Link Slugger</h2>
                      <p className="text-xs text-gray-400 font-light">Input any word, keyword phrase or page title to generate Vercel-ready lowercase links.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-300 block">Enter Text / Keyword</label>
                      <input 
                        type="text"
                        value={singleText}
                        onChange={(e) => setSingleText(e.target.value)}
                        placeholder="e.g., Luxury Deluxe Suite Antalya"
                        className="w-full bg-[#0d0611] text-white border border-[#d4af37]/25 px-4 py-3 text-sm focus:border-[#d4af37] focus:outline-none"
                      />
                    </div>

                    {/* LIVE BROWSER MOCK PREVIEW (Case-Insensitive Visualization) */}
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-gray-300 block">Live Browser URL Preview</span>
                      <div className="bg-[#0d0611] border border-[#d4af37]/15 p-3 rounded-none">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-800 text-[10px] text-gray-500 font-mono">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-600/60" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-600/60" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-600/60" />
                          <span className="ml-2 overflow-hidden truncate">https://{customDomain || "vercel.app"}/...</span>
                        </div>
                        <div className="pt-2 font-mono text-xs sm:text-sm text-[#f3e5ab] select-all truncate">
                          https://{customDomain || "vercel-app.vercel.app"}/{slugifyText(singleText, { separator: slugSeparator, removeNumbers, lowercase: lowerCaseOnly })}
                        </div>
                      </div>
                    </div>

                    {/* Ready Copy Options Area */}
                    <div className="space-y-4 pt-4 border-t border-[#d4af37]/15">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Ready-to-Use Code Formats</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* Option 1: Pure slug */}
                        <div className="bg-[#0d0611] border border-gray-800/80 p-3 flex flex-col justify-between space-y-2">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">Pure Small Slug</span>
                            <code className="text-xs text-white font-mono block truncate pt-1">
                              {slugifyText(singleText, { separator: slugSeparator, removeNumbers, lowercase: lowerCaseOnly })}
                            </code>
                          </div>
                          <button
                            onClick={() => copyToClipboard(slugifyText(singleText, { separator: slugSeparator, removeNumbers, lowercase: lowerCaseOnly }), "Pure Slug")}
                            className="w-full py-1.5 bg-[#160a1f] hover:bg-[#2a1135] text-[10px] text-[#d4af37] hover:text-white uppercase tracking-wider font-semibold border border-[#d4af37]/20 transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Copy className="w-3 h-3" /> Copy Slug
                          </button>
                        </div>

                        {/* Option 2: Complete Vercel URL */}
                        <div className="bg-[#0d0611] border border-gray-800/80 p-3 flex flex-col justify-between space-y-2">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">Complete Vercel URL</span>
                            <code className="text-xs text-white font-mono block truncate pt-1">
                              https://{customDomain}/{slugifyText(singleText, { separator: slugSeparator, removeNumbers, lowercase: lowerCaseOnly })}
                            </code>
                          </div>
                          <button
                            onClick={() => copyToClipboard(`https://${customDomain}/${slugifyText(singleText, { separator: slugSeparator, removeNumbers, lowercase: lowerCaseOnly })}`, "Complete Vercel URL")}
                            className="w-full py-1.5 bg-[#160a1f] hover:bg-[#2a1135] text-[10px] text-[#d4af37] hover:text-white uppercase tracking-wider font-semibold border border-[#d4af37]/20 transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Copy className="w-3 h-3" /> Copy Full URL
                          </button>
                        </div>

                        {/* Option 3: HTML Backlink Anchor */}
                        <div className="bg-[#0d0611] border border-gray-800/80 p-3 flex flex-col justify-between space-y-2">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">HTML Backlink Anchor</span>
                            <code className="text-[10px] text-white font-mono block truncate pt-1">
                              {`<a href="https://${customDomain}/${slugifyText(singleText, { separator: slugSeparator, removeNumbers, lowercase: lowerCaseOnly })}">${singleText}</a>`}
                            </code>
                          </div>
                          <button
                            onClick={() => copyToClipboard(`<a href="https://${customDomain}/${slugifyText(singleText, { separator: slugSeparator, removeNumbers, lowercase: lowerCaseOnly })}">${singleText}</a>`, "HTML Link")}
                            className="w-full py-1.5 bg-[#160a1f] hover:bg-[#2a1135] text-[10px] text-[#d4af37] hover:text-white uppercase tracking-wider font-semibold border border-[#d4af37]/20 transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Code className="w-3 h-3" /> Copy HTML Backlink
                          </button>
                        </div>

                        {/* Option 4: Markdown Backlink Link */}
                        <div className="bg-[#0d0611] border border-gray-800/80 p-3 flex flex-col justify-between space-y-2">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">Markdown Backlink Link</span>
                            <code className="text-[10px] text-white font-mono block truncate pt-1">
                              {`[${singleText}](https://${customDomain}/${slugifyText(singleText, { separator: slugSeparator, removeNumbers, lowercase: lowerCaseOnly })})`}
                            </code>
                          </div>
                          <button
                            onClick={() => copyToClipboard(`[${singleText}](https://${customDomain}/${slugifyText(singleText, { separator: slugSeparator, removeNumbers, lowercase: lowerCaseOnly })})`, "Markdown Link")}
                            className="w-full py-1.5 bg-[#160a1f] hover:bg-[#2a1135] text-[10px] text-[#d4af37] hover:text-white uppercase tracking-wider font-semibold border border-[#d4af37]/20 transition-colors flex items-center justify-center gap-1.5"
                          >
                            <FileText className="w-3 h-3" /> Copy Markdown Link
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: BATCH SLUGGER */}
                {activeSubTab === "batch" && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-lg font-display font-bold text-white uppercase tracking-wider">Batch Slug Generator</h2>
                      <p className="text-xs text-gray-400 font-light">Paste multiple lines of text, article titles or anchor phrases to convert them all into small, clean URL links in one go.</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-gray-300">Paste Lines (One title per line)</label>
                        <button 
                          onClick={() => setBatchText("")}
                          className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 font-mono"
                        >
                          <Trash2 className="w-3 h-3" /> Clear Textarea
                        </button>
                      </div>
                      <textarea 
                        rows={6}
                        value={batchText}
                        onChange={(e) => setBatchText(e.target.value)}
                        placeholder="Paste text list here..."
                        className="w-full bg-[#0d0611] text-white font-mono border border-[#d4af37]/25 p-4 text-xs focus:border-[#d4af37] focus:outline-none"
                      />
                    </div>

                    {/* Batch converted table display */}
                    <div className="space-y-3 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">Converted Small Ready Links</span>
                        <button
                          onClick={() => {
                            const allSlugs = batchText.split("\n")
                              .filter(line => line.trim())
                              .map(line => `https://${customDomain}/${slugifyText(line, { separator: slugSeparator, removeNumbers, lowercase: lowerCaseOnly })}`)
                              .join("\n");
                            copyToClipboard(allSlugs, "All Batch URLs");
                          }}
                          className="px-3 py-1 bg-[#d4af37] hover:bg-[#f3e5ab] text-[#0d0611] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" /> Copy All URL List
                        </button>
                      </div>

                      <div className="bg-[#0d0611] border border-[#d4af37]/15 overflow-x-auto max-h-[250px] overflow-y-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-[#1a0a23] border-b border-[#d4af37]/20 text-[10px] font-mono uppercase tracking-wider text-[#f3e5ab]">
                              <th className="p-3">Original Phrase</th>
                              <th className="p-3">Vercel Ready Lowercase Link</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-900 font-mono text-[11px]">
                            {batchText.split("\n").filter(line => line.trim()).map((line, index) => {
                              const slug = slugifyText(line, { separator: slugSeparator, removeNumbers, lowercase: lowerCaseOnly });
                              return (
                                <tr key={index} className="hover:bg-[#1a0a23]/30">
                                  <td className="p-3 text-gray-400 truncate max-w-[200px]">{line}</td>
                                  <td className="p-3 text-[#f3e5ab] font-bold">
                                    <span className="text-gray-600 font-normal">/{slugSeparator ? "" : ""}</span>{slug}
                                  </td>
                                </tr>
                              );
                            })}
                            {batchText.split("\n").filter(line => line.trim()).length === 0 && (
                              <tr>
                                <td colSpan={2} className="p-6 text-center text-gray-500 italic">No phrases entered. Type some lines to see them batch convert.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB 3: AUDITOR & CHARACTER CHECKER */}
                {activeSubTab === "auditor" && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-lg font-display font-bold text-white uppercase tracking-wider">Vercel Link Auditor</h2>
                      <p className="text-xs text-gray-400 font-light">Audit your backlinks or internal relative paths for uppercase alphabets, spaces, and dangerous characters that cause broken 404 links on Vercel.</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-gray-300">Enter URLs/Paths (One per line)</label>
                        <button 
                          onClick={() => setAuditText("")}
                          className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 font-mono"
                        >
                          <Trash2 className="w-3 h-3" /> Clear List
                        </button>
                      </div>
                      <textarea 
                        rows={5}
                        value={auditText}
                        onChange={(e) => setAuditText(e.target.value)}
                        placeholder="Paste URLs to check here..."
                        className="w-full bg-[#0d0611] text-white font-mono border border-[#d4af37]/25 p-4 text-xs focus:border-[#d4af37] focus:outline-none"
                      />
                    </div>

                    {/* Audit Analysis Results */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">Audit Results</span>
                        <button
                          onClick={() => {
                            // Automatically lowercase everything in the paths while keeping standard domain structure
                            const fixedList = auditText.split("\n")
                              .map(line => {
                                if (!line.trim()) return "";
                                try {
                                  // If it's a full URL, lowercase the path only
                                  if (line.startsWith("http://") || line.startsWith("https://")) {
                                    const urlObj = new URL(line);
                                    const pathParts = urlObj.pathname.split("/").map(part => slugifyText(part, { separator: slugSeparator, removeNumbers: false, lowercase: true }));
                                    urlObj.pathname = pathParts.join("/");
                                    return urlObj.toString();
                                  } else {
                                    // Relative path
                                    return line.split("/").map(part => slugifyText(part, { separator: slugSeparator, removeNumbers: false, lowercase: true })).join("/");
                                  }
                                } catch (e) {
                                  // Fallback direct lowercase trim
                                  return line.toLowerCase().replace(/\s+/g, "-");
                                }
                              })
                              .filter(line => line)
                              .join("\n");
                            setAuditText(fixedList);
                            copyToClipboard(fixedList, "Auto-Fixed Lowercase URLs");
                          }}
                          className="px-3 py-1.5 bg-[#d4af37] hover:bg-[#f3e5ab] text-[#0d0611] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" /> Auto-Fix All to Small Alphabets & Copy
                        </button>
                      </div>

                      <div className="space-y-3">
                        {auditText.split("\n").filter(line => line.trim()).map((line, index) => {
                          // Simple validation check: check for any uppercase letters after the domain
                          let pathToCheck = line;
                          try {
                            if (line.startsWith("http://") || line.startsWith("https://")) {
                              const urlObj = new URL(line);
                              pathToCheck = urlObj.pathname + urlObj.search + urlObj.hash;
                            }
                          } catch (e) {}

                          const hasUppercase = /[A-Z]/.test(pathToCheck);
                          const hasSpaces = /\s/.test(pathToCheck);
                          const isOK = !hasUppercase && !hasSpaces;

                          return (
                            <div 
                              key={index} 
                              className={`p-3 border font-mono text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                                isOK 
                                  ? "bg-green-950/20 border-green-500/20 text-green-200" 
                                  : "bg-red-950/20 border-red-500/20 text-red-200"
                              }`}
                            >
                              <div className="space-y-1 overflow-hidden">
                                <span className="font-semibold block truncate select-all">{line}</span>
                                <div className="flex items-center gap-3 text-[10px]">
                                  {isOK ? (
                                    <span className="text-green-400 flex items-center gap-1">✔ Perfect Vercel Link (Strictly Lowercase)</span>
                                  ) : (
                                    <div className="flex items-center gap-3 flex-wrap">
                                      {hasUppercase && <span className="text-red-400">✖ Has Capital Letters (Uppercase)</span>}
                                      {hasSpaces && <span className="text-amber-400">✖ Has Unsafe Spaces</span>}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {!isOK && (
                                <button
                                  onClick={() => {
                                    // Fix individual line
                                    let fixedLine = line;
                                    try {
                                      if (line.startsWith("http://") || line.startsWith("https://")) {
                                        const urlObj = new URL(line);
                                        const parts = urlObj.pathname.split("/").map(part => slugifyText(part, { separator: slugSeparator, removeNumbers: false, lowercase: true }));
                                        urlObj.pathname = parts.join("/");
                                        fixedLine = urlObj.toString();
                                      } else {
                                        fixedLine = line.split("/").map(part => slugifyText(part, { separator: slugSeparator, removeNumbers: false, lowercase: true })).join("/");
                                      }
                                    } catch (e) {
                                      fixedLine = line.toLowerCase().replace(/\s+/g, "-");
                                    }
                                    const updatedList = auditText.split("\n");
                                    updatedList[index] = fixedLine;
                                    setAuditText(updatedList.join("\n"));
                                  }}
                                  className="px-2.5 py-1 bg-red-950/40 border border-red-500/30 hover:bg-red-900/40 text-red-200 text-[10px] font-sans font-bold uppercase tracking-wider shrink-0 transition-colors"
                                >
                                  Fix Link
                                </button>
                              )}
                            </div>
                          );
                        })}

                        {auditText.split("\n").filter(line => line.trim()).length === 0 && (
                          <div className="p-6 border border-dashed border-gray-800 text-center text-gray-500 text-xs italic">
                            No links added. Paste some URLs to check them for casing errors.
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                )}

              </div>

            </div>

            {/* Premium success toast notification overlay */}
            {copyNotification && (
              <div className="fixed bottom-6 right-6 z-50 bg-[#d4af37] text-[#0d0611] font-semibold text-xs py-3 px-5 shadow-2xl flex items-center gap-2 border border-white/20 animate-slideIn">
                <Check className="w-4 h-4 shrink-0 stroke-[3]" />
                <span>Copied {copyNotification} Successfully to Clipboard!</span>
              </div>
            )}

            {/* Backlink Provider Best Practices Card */}
            <div className="bg-[#160a1f] border border-[#d4af37]/15 p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-display font-bold text-[#f3e5ab] uppercase tracking-wider">
                Betty's Vercel & Backlink Delivery Guide (SEO Best Practices)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-300 font-light leading-relaxed">
                <div className="space-y-2 p-4 bg-[#0d0611] border border-gray-800/80">
                  <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider text-[#d4af37]">1. Case-Sensitive Servers</h4>
                  <p>Vercel builds use strict Linux rules. If a URL is shared with uppercase letters, but the project files or route files are entirely lowercase, a 404 is thrown, and your valuable backlink investment gets wasted.</p>
                </div>
                <div className="space-y-2 p-4 bg-[#0d0611] border border-gray-800/80">
                  <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider text-[#d4af37]">2. Avoid Duplicate Content</h4>
                  <p>Search engines like Google index <code className="text-[#f3e5ab]">/Rooms</code> and <code className="text-[#f3e5ab]">/rooms</code> as separate pages. Using strict lowercase across your Vercel anchors avoids indexing duplicates and concentrates link equity.</p>
                </div>
                <div className="space-y-2 p-4 bg-[#0d0611] border border-gray-800/80">
                  <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider text-[#d4af37]">3. Standard Clean Anchors</h4>
                  <p>Using standard lowercase hyphens is recommended by Google. Keeping your links and anchor URLs perfectly matched means faster indexing, better user readability, and zero page redirect chain errors.</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* --- REUSABLE PREMIUM FOOTER --- */}
      <footer className="bg-[#110717] border-t border-[#d4af37]/20 pt-16 pb-8 text-sm text-gray-300 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#d4af37]/15">
            
            {/* Column 1: Brand details */}
            <div className="space-y-4">
              <span className="text-lg font-display font-bold tracking-widest text-gold-gradient block">
                BLUE SEA GARDEN HOTEL & GARDENS
              </span>
              <p className="font-editorial italic text-[#f3e5ab] text-sm">
                A Refined Stay in Antalya
              </p>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Experience unparalleled comfort, elegant stone architecture, and unforgettable Turkish hospitality in historic Muratpaşa.
              </p>
            </div>

            {/* Column 2: Quick links */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block">Quick Navigation</span>
              <ul className="space-y-2 text-xs font-light">
                <li>
                  <a href="#/home" onClick={() => navigateTo("home")} className="hover:text-[#d4af37] transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#/rooms" onClick={() => navigateTo("rooms")} className="hover:text-[#d4af37] transition-colors">
                    Rooms & Suites
                  </a>
                </li>
                <li>
                  <a href="#/gallery" onClick={() => navigateTo("gallery")} className="hover:text-[#d4af37] transition-colors">
                    Gallery & Atmosphere
                  </a>
                </li>
                <li>
                  <a href="#/contact" onClick={() => navigateTo("contact")} className="hover:text-[#d4af37] transition-colors">
                    Contact & Booking
                  </a>
                </li>
                <li>
                  <a href="#/linktool" onClick={() => navigateTo("linktool")} className="hover:text-[#d4af37] transition-colors">
                    Vercel Link Ready (SEO)
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contacts */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block">Boutique Contact</span>
              <ul className="space-y-2 text-xs font-light">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <a href="tel:+902422488213" className="hover:text-white transition-colors font-mono">+90 242 248 82 13</a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>
                    Kılınçarslan, Hesapçı Sk. No:65,<br />
                    07100 Muratpaşa/Antalya, Türkiye
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 4: Distinctions */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block">Bespoke Perks</span>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Direct bookings unlock free regional Turkish breakfast, tailored early arrival capabilities, and secure cancellation options.
              </p>
              <div className="flex gap-2.5 pt-2">
                {/* Custom generic social icons using simple visual elements */}
                <span className="w-8 h-8 rounded-none bg-[#1d0a23] border border-[#d4af37]/30 flex items-center justify-center text-xs text-gray-300 hover:text-[#d4af37] hover:border-[#d4af37] cursor-pointer transition-colors" title="Instagram">IG</span>
                <span className="w-8 h-8 rounded-none bg-[#1d0a23] border border-[#d4af37]/30 flex items-center justify-center text-xs text-gray-300 hover:text-[#d4af37] hover:border-[#d4af37] cursor-pointer transition-colors" title="Facebook">FB</span>
                <span className="w-8 h-8 rounded-none bg-[#1d0a23] border border-[#d4af37]/30 flex items-center justify-center text-xs text-gray-300 hover:text-[#d4af37] hover:border-[#d4af37] cursor-pointer transition-colors" title="TripAdvisor">TA</span>
              </div>
            </div>

          </div>

          {/* Bottom Copyright details */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-light gap-4">
            <p>© 2026 Blue Sea Garden Hotel & Gardens. All Rights Reserved.</p>
            <div className="flex items-center gap-4 text-[11px]">
              <a href="#/home" onClick={() => navigateTo("home")} className="hover:text-white transition-colors">Privacy Policy</a>
              <span aria-hidden="true" className="text-gray-600">·</span>
              <a href="#/home" onClick={() => navigateTo("home")} className="hover:text-white transition-colors">Terms of Stay</a>
              <span aria-hidden="true" className="text-gray-600">·</span>
              <span className="text-[#d4af37]">Antalya, Türkiye</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
