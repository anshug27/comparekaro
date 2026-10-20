export interface Car {
  id: string;
  name: string;
  brand: string;
  segment: 'hatchback' | 'sedan' | 'suv' | 'compact-suv' | 'mpv' | 'ev';
  priceMin: number; // ex-showroom in lakhs * 100000
  priceMax: number;
  image: string;
  engine: string;
  power: string;
  mileage: string;
  transmission: string;
  fuelType: string;
  seating: number;
  safetyRating: string;
  bootSpace: string;
  groundClearance: string;
  rating: number;
}

export const cars: Car[] = [
  // ── Maruti Suzuki ──
  { id: 'maruti-swift', name: 'Maruti Swift', brand: 'Maruti Suzuki', segment: 'hatchback', priceMin: 649000, priceMax: 999000, image: '',
    engine: '1.2L Petrol / CNG', power: '82 HP', mileage: '24.80 km/l', transmission: 'MT / AMT', fuelType: 'Petrol / CNG',
    seating: 5, safetyRating: '3 Star (GNCAP)', bootSpace: '265 L', groundClearance: '163 mm', rating: 4.2 },
  { id: 'maruti-baleno', name: 'Maruti Baleno', brand: 'Maruti Suzuki', segment: 'hatchback', priceMin: 672000, priceMax: 1002000, image: '',
    engine: '1.2L DualJet Petrol', power: '90 HP', mileage: '22.35 km/l', transmission: 'MT / AMT', fuelType: 'Petrol',
    seating: 5, safetyRating: '3 Star', bootSpace: '318 L', groundClearance: '170 mm', rating: 4.1 },
  { id: 'maruti-brezza', name: 'Maruti Brezza', brand: 'Maruti Suzuki', segment: 'compact-suv', priceMin: 849000, priceMax: 1415000, image: '',
    engine: '1.5L Petrol', power: '103 HP', mileage: '20.15 km/l', transmission: 'MT / AT', fuelType: 'Petrol / CNG',
    seating: 5, safetyRating: '4 Star', bootSpace: '328 L', groundClearance: '198 mm', rating: 4.3 },
  { id: 'maruti-grand-vitara', name: 'Maruti Grand Vitara', brand: 'Maruti Suzuki', segment: 'suv', priceMin: 1088000, priceMax: 1995000, image: '',
    engine: '1.5L Petrol / Hybrid', power: '103-116 HP', mileage: '21.11-27.97 km/l', transmission: 'MT / AT', fuelType: 'Petrol / Hybrid',
    seating: 5, safetyRating: '5 Star', bootSpace: '373 L', groundClearance: '210 mm', rating: 4.4 },

  // ── Hyundai ──
  { id: 'hyundai-creta', name: 'Hyundai Creta', brand: 'Hyundai', segment: 'compact-suv', priceMin: 1100000, priceMax: 2000000, image: '',
    engine: '1.5L Petrol/Diesel / 1.5L Turbo', power: '115-160 HP', mileage: '17.0-21.8 km/l', transmission: 'MT / CVT / DCT',
    fuelType: 'Petrol / Diesel / Turbo', seating: 5, safetyRating: '5 Star', bootSpace: '433 L', groundClearance: '190 mm', rating: 4.5 },
  { id: 'hyundai-venue', name: 'Hyundai Venue', brand: 'Hyundai', segment: 'compact-suv', priceMin: 799000, priceMax: 1397000, image: '',
    engine: '1.2L/1.0T Petrol / 1.5L Diesel', power: '83-120 HP', mileage: '18.0-23.7 km/l', transmission: 'MT / IMT / DCT',
    fuelType: 'Petrol / Diesel', seating: 5, safetyRating: '4 Star', bootSpace: '350 L', groundClearance: '195 mm', rating: 4.2 },
  { id: 'hyundai-i20', name: 'Hyundai i20', brand: 'Hyundai', segment: 'hatchback', priceMin: 720000, priceMax: 1175000, image: '',
    engine: '1.2L Petrol / 1.0T', power: '83-120 HP', mileage: '20.35 km/l', transmission: 'MT / IVT / DCT', fuelType: 'Petrol',
    seating: 5, safetyRating: '3 Star', bootSpace: '311 L', groundClearance: '170 mm', rating: 4.3 },
  { id: 'hyundai-tucson', name: 'Hyundai Tucson', brand: 'Hyundai', segment: 'suv', priceMin: 2799000, priceMax: 3499000, image: '',
    engine: '2.0L Petrol / Diesel', power: '156 HP', mileage: '18.4-20.2 km/l', transmission: 'AT', fuelType: 'Petrol / Diesel',
    seating: 5, safetyRating: '5 Star', bootSpace: '539 L', groundClearance: '192 mm', rating: 4.4 },

  // ── Tata ──
  { id: 'tata-nexon', name: 'Tata Nexon', brand: 'Tata', segment: 'compact-suv', priceMin: 800000, priceMax: 1530000, image: '',
    engine: '1.2T Petrol / 1.5L Diesel', power: '120 HP', mileage: '17.4-23.2 km/l', transmission: 'MT / AMT / DCT',
    fuelType: 'Petrol / Diesel', seating: 5, safetyRating: '5 Star', bootSpace: '382 L', groundClearance: '209 mm', rating: 4.4 },
  { id: 'tata-punch', name: 'Tata Punch', brand: 'Tata', segment: 'compact-suv', priceMin: 600000, priceMax: 1020000, image: '',
    engine: '1.2L Petrol / CNG', power: '86 HP', mileage: '18.97-20.09 km/l', transmission: 'MT / AMT', fuelType: 'Petrol / CNG',
    seating: 5, safetyRating: '5 Star', bootSpace: '366 L', groundClearance: '187 mm', rating: 4.3 },
  { id: 'tata-harrier', name: 'Tata Harrier', brand: 'Tata', segment: 'suv', priceMin: 1499000, priceMax: 2699000, image: '',
    engine: '2.0L Diesel', power: '170 HP', mileage: '14.6-16.0 km/l', transmission: 'MT / AT', fuelType: 'Diesel',
    seating: 5, safetyRating: '5 Star', bootSpace: '425 L', groundClearance: '205 mm', rating: 4.3 },
  { id: 'tata-nexon-ev', name: 'Tata Nexon EV', brand: 'Tata', segment: 'ev', priceMin: 1449000, priceMax: 1999000, image: '',
    engine: '40.5 kWh Battery', power: '143 HP', mileage: '325 km range', transmission: 'Single-Speed', fuelType: 'Electric',
    seating: 5, safetyRating: '5 Star', bootSpace: '350 L', groundClearance: '209 mm', rating: 4.3 },

  // ── Mahindra ──
  { id: 'mahindra-xuv700', name: 'Mahindra XUV700', brand: 'Mahindra', segment: 'suv', priceMin: 1399000, priceMax: 2715000, image: '',
    engine: '2.0T Petrol / 2.2L Diesel', power: '200/185 HP', mileage: '13.0-16.0 km/l', transmission: 'MT / AT',
    fuelType: 'Petrol / Diesel', seating: 7, safetyRating: '5 Star', bootSpace: '451 L', groundClearance: '200 mm', rating: 4.5 },
  { id: 'mahindra-thar', name: 'Mahindra Thar', brand: 'Mahindra', segment: 'suv', priceMin: 1100000, priceMax: 1785000, image: '',
    engine: '1.5L Diesel / 2.0T Petrol', power: '150/152 HP', mileage: '15.2 km/l', transmission: 'MT / AT',
    fuelType: 'Diesel / Petrol', seating: 4, safetyRating: '4 Star', bootSpace: '—', groundClearance: '226 mm', rating: 4.4 },
  { id: 'mahindra-xuv3xo', name: 'Mahindra XUV 3XO', brand: 'Mahindra', segment: 'compact-suv', priceMin: 799000, priceMax: 1559000, image: '',
    engine: '1.2T Petrol / 1.5L Diesel', power: '130/117 HP', mileage: '18.0-20.0 km/l', transmission: 'MT / AMT / AT',
    fuelType: 'Petrol / Diesel', seating: 5, safetyRating: '5 Star', bootSpace: '364 L', groundClearance: '195 mm', rating: 4.2 },
  { id: 'mahindra-scorpio-n', name: 'Mahindra Scorpio N', brand: 'Mahindra', segment: 'suv', priceMin: 1399000, priceMax: 2499000, image: '',
    engine: '2.0T Petrol / 2.2L Diesel', power: '203/175 HP', mileage: '12.0-16.0 km/l', transmission: 'MT / AT',
    fuelType: 'Petrol / Diesel', seating: 7, safetyRating: '5 Star', bootSpace: '460 L', groundClearance: '203 mm', rating: 4.3 },

  // ── Kia ──
  { id: 'kia-seltos', name: 'Kia Seltos', brand: 'Kia', segment: 'compact-suv', priceMin: 1099000, priceMax: 2009000, image: '',
    engine: '1.5L Petrol/Diesel / 1.5T', power: '115-160 HP', mileage: '17.0-21.0 km/l', transmission: 'MT / CVT / DCT',
    fuelType: 'Petrol / Diesel / Turbo', seating: 5, safetyRating: '5 Star', bootSpace: '433 L', groundClearance: '190 mm', rating: 4.4 },
  { id: 'kia-sonet', name: 'Kia Sonet', brand: 'Kia', segment: 'compact-suv', priceMin: 799000, priceMax: 1599000, image: '',
    engine: '1.2L/1.0T Petrol / 1.5L Diesel', power: '83-120 HP', mileage: '18.0-24.1 km/l', transmission: 'MT / IMT / DCT / AT',
    fuelType: 'Petrol / Diesel', seating: 5, safetyRating: '3 Star', bootSpace: '392 L', groundClearance: '205 mm', rating: 4.2 },
  { id: 'kia-carens', name: 'Kia Carens', brand: 'Kia', segment: 'mpv', priceMin: 1100000, priceMax: 1999000, image: '',
    engine: '1.5L Petrol/Diesel / 1.5T', power: '115-160 HP', mileage: '16.0-21.0 km/l', transmission: 'MT / DCT',
    fuelType: 'Petrol / Diesel', seating: 7, safetyRating: '3 Star', bootSpace: '216 L', groundClearance: '195 mm', rating: 4.1 },

  // ── Toyota ──
  { id: 'toyota-innova-hycross', name: 'Toyota Innova Hycross', brand: 'Toyota', segment: 'mpv', priceMin: 1994000, priceMax: 3053000, image: '',
    engine: '2.0L Petrol / Hybrid', power: '152-186 HP', mileage: '21.1-23.2 km/l', transmission: 'CVT', fuelType: 'Petrol / Hybrid',
    seating: 7, safetyRating: '5 Star', bootSpace: '240 L', groundClearance: '185 mm', rating: 4.5 },
  { id: 'toyota-fortuner', name: 'Toyota Fortuner', brand: 'Toyota', segment: 'suv', priceMin: 3330000, priceMax: 5192000, image: '',
    engine: '2.7L Petrol / 2.8L Diesel', power: '166-204 HP', mileage: '10.0-14.2 km/l', transmission: 'MT / AT',
    fuelType: 'Petrol / Diesel', seating: 7, safetyRating: '5 Star', bootSpace: '296 L', groundClearance: '221 mm', rating: 4.6 },
  { id: 'toyota-urban-cruiser-hyryder', name: 'Toyota Urban Cruiser Hyryder', brand: 'Toyota', segment: 'compact-suv', priceMin: 1093000, priceMax: 1963000, image: '',
    engine: '1.5L Petrol / Hybrid', power: '103-116 HP', mileage: '21.1-27.97 km/l', transmission: 'MT / AT', fuelType: 'Petrol / Hybrid',
    seating: 5, safetyRating: '5 Star', bootSpace: '373 L', groundClearance: '210 mm', rating: 4.3 },

  // ── Honda ──
  { id: 'honda-city', name: 'Honda City', brand: 'Honda', segment: 'sedan', priceMin: 1199000, priceMax: 1570000, image: '',
    engine: '1.5L Petrol', power: '121 HP', mileage: '18.4 km/l', transmission: 'MT / CVT', fuelType: 'Petrol',
    seating: 5, safetyRating: '4 Star', bootSpace: '506 L', groundClearance: '165 mm', rating: 4.3 },
  { id: 'honda-elevate', name: 'Honda Elevate', brand: 'Honda', segment: 'compact-suv', priceMin: 1145000, priceMax: 1650000, image: '',
    engine: '1.5L Petrol', power: '121 HP', mileage: '15.31-16.92 km/l', transmission: 'MT / CVT', fuelType: 'Petrol',
    seating: 5, safetyRating: '5 Star', bootSpace: '458 L', groundClearance: '220 mm', rating: 4.2 },

  // ── MG ──
  { id: 'mg-hector', name: 'MG Hector', brand: 'MG', segment: 'suv', priceMin: 1399000, priceMax: 2299000, image: '',
    engine: '1.5T Petrol / 2.0L Diesel', power: '143-170 HP', mileage: '14.0-17.0 km/l', transmission: 'MT / CVT',
    fuelType: 'Petrol / Diesel / Hybrid', seating: 5, safetyRating: '5 Star', bootSpace: '587 L', groundClearance: '192 mm', rating: 4.2 },
  { id: 'mg-zs-ev', name: 'MG ZS EV', brand: 'MG', segment: 'ev', priceMin: 1899000, priceMax: 2595000, image: '',
    engine: '50.3 kWh Battery', power: '176 HP', mileage: '461 km range', transmission: 'Single-Speed', fuelType: 'Electric',
    seating: 5, safetyRating: '5 Star', bootSpace: '448 L', groundClearance: '177 mm', rating: 4.1 },
];

export const carBrands = [...new Set(cars.map(c => c.brand))];
export const segments = [...new Set(cars.map(c => c.segment))];
