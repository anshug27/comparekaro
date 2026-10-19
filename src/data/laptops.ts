export interface Laptop {
  id: string;
  name: string;
  brand: string;
  type: 'Laptop' | 'Tablet';
  category: 'budget' | 'midrange' | 'premium' | 'gaming' | 'ultrabook' | 'tablet';
  price: number;
  display: string;
  displaySize: string;
  processor: string;
  ram: string;
  storage: string;
  gpu: string;
  battery: string;
  weight: string;
  os: string;
  ports: string;
  rating: number;
}

export const laptops: Laptop[] = [
  // ── Apple ──────────────────────────────────────────
  { id: 'macbook-air-m3', name: 'MacBook Air M3', brand: 'Apple', type: 'Laptop', category: 'ultrabook', price: 114900,
    display: 'Liquid Retina, 500 nits', displaySize: '13.6"', processor: 'Apple M3 (8-core)',
    ram: '8 GB', storage: '256 GB SSD', gpu: 'Apple M3 10-core GPU', battery: '18 hours',
    weight: '1.24 kg', os: 'macOS Sequoia', ports: '2x USB-C, MagSafe, 3.5mm', rating: 4.7 },
  { id: 'macbook-air-m3-15', name: 'MacBook Air 15" M3', brand: 'Apple', type: 'Laptop', category: 'ultrabook', price: 134900,
    display: 'Liquid Retina, 500 nits', displaySize: '15.3"', processor: 'Apple M3 (8-core)',
    ram: '8 GB', storage: '256 GB SSD', gpu: 'Apple M3 10-core GPU', battery: '18 hours',
    weight: '1.51 kg', os: 'macOS Sequoia', ports: '2x USB-C, MagSafe, 3.5mm', rating: 4.7 },
  { id: 'macbook-pro-m3-pro', name: 'MacBook Pro 14" M3 Pro', brand: 'Apple', type: 'Laptop', category: 'premium', price: 199900,
    display: 'Liquid Retina XDR, 1000 nits, ProMotion 120Hz', displaySize: '14.2"', processor: 'Apple M3 Pro (12-core)',
    ram: '18 GB', storage: '512 GB SSD', gpu: 'Apple M3 Pro 18-core GPU', battery: '17 hours',
    weight: '1.55 kg', os: 'macOS Sequoia', ports: '3x USB-C, HDMI, SD, MagSafe, 3.5mm', rating: 4.8 },
  { id: 'macbook-pro-m3-max', name: 'MacBook Pro 16" M3 Max', brand: 'Apple', type: 'Laptop', category: 'premium', price: 399900,
    display: 'Liquid Retina XDR, ProMotion 120Hz', displaySize: '16.2"', processor: 'Apple M3 Max (16-core)',
    ram: '36 GB', storage: '1 TB SSD', gpu: 'Apple M3 Max 40-core GPU', battery: '22 hours',
    weight: '2.14 kg', os: 'macOS Sequoia', ports: '3x USB-C, HDMI, SD, MagSafe, 3.5mm', rating: 4.9 },

  // ── Dell ───────────────────────────────────────────
  { id: 'dell-xps-14', name: 'Dell XPS 14', brand: 'Dell', type: 'Laptop', category: 'premium', price: 169990,
    display: 'OLED, 3200x2000, 400 nits', displaySize: '14.5"', processor: 'Intel Core Ultra 7 155H',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'Intel Arc Graphics', battery: '12 hours',
    weight: '1.69 kg', os: 'Windows 11', ports: '2x USB-C, 1x USB-C/TB4', rating: 4.4 },
  { id: 'dell-inspiron-15', name: 'Dell Inspiron 15', brand: 'Dell', type: 'Laptop', category: 'midrange', price: 65990,
    display: 'IPS FHD, 250 nits', displaySize: '15.6"', processor: 'Intel Core i5-1335U',
    ram: '8 GB', storage: '512 GB SSD', gpu: 'Intel Iris Xe', battery: '8 hours',
    weight: '1.65 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, 3.5mm, SD', rating: 4.1 },
  { id: 'dell-inspiron-14-ryzen', name: 'Dell Inspiron 14 Ryzen', brand: 'Dell', type: 'Laptop', category: 'midrange', price: 58990,
    display: 'IPS FHD, 250 nits', displaySize: '14"', processor: 'AMD Ryzen 5 7530U',
    ram: '8 GB', storage: '512 GB SSD', gpu: 'AMD Radeon Graphics', battery: '9 hours',
    weight: '1.54 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, 3.5mm', rating: 4.0 },
  { id: 'dell-g15-gaming', name: 'Dell G15 Gaming', brand: 'Dell', type: 'Laptop', category: 'gaming', price: 94990,
    display: 'IPS FHD, 165Hz', displaySize: '15.6"', processor: 'Intel Core i7-13650HX',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'NVIDIA RTX 4060 8GB', battery: '6 hours',
    weight: '2.65 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, RJ45, 3.5mm', rating: 4.3 },

  // ── HP ─────────────────────────────────────────────
  { id: 'hp-pavilion-15', name: 'HP Pavilion 15', brand: 'HP', type: 'Laptop', category: 'midrange', price: 72990,
    display: 'IPS FHD, 300 nits', displaySize: '15.6"', processor: 'Intel Core i5-1335U',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'Intel Iris Xe', battery: '8.5 hours',
    weight: '1.75 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, 3.5mm', rating: 4.2 },
  { id: 'hp-15s-budget', name: 'HP 15s', brand: 'HP', type: 'Laptop', category: 'budget', price: 42990,
    display: 'IPS FHD', displaySize: '15.6"', processor: 'Intel Core i3-1215U',
    ram: '8 GB', storage: '512 GB SSD', gpu: 'Intel UHD Graphics', battery: '7.5 hours',
    weight: '1.69 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, 3.5mm', rating: 4.0 },
  { id: 'hp-victus-16', name: 'HP Victus 16', brand: 'HP', type: 'Laptop', category: 'gaming', price: 79990,
    display: 'IPS FHD, 144Hz', displaySize: '16.1"', processor: 'AMD Ryzen 5 7535HS',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'NVIDIA RTX 4050 6GB', battery: '6.5 hours',
    weight: '2.3 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, 3.5mm, RJ45', rating: 4.2 },
  { id: 'hp-omen-16', name: 'HP OMEN 16', brand: 'HP', type: 'Laptop', category: 'gaming', price: 139990,
    display: 'IPS QHD, 165Hz', displaySize: '16.1"', processor: 'Intel Core i7-13700HX',
    ram: '16 GB', storage: '1 TB SSD', gpu: 'NVIDIA RTX 4070 8GB', battery: '5.5 hours',
    weight: '2.37 kg', os: 'Windows 11', ports: 'USB-A, USB-C/TB4, HDMI, RJ45, SD', rating: 4.5 },
  { id: 'hp-envy-x360-14', name: 'HP Envy x360 14', brand: 'HP', type: 'Laptop', category: 'ultrabook', price: 89990,
    display: 'OLED 2.8K, 400 nits, Touch', displaySize: '14"', processor: 'Intel Core Ultra 5 125H',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'Intel Arc Graphics', battery: '10 hours',
    weight: '1.39 kg', os: 'Windows 11', ports: 'USB-A, 2x USB-C/TB4, 3.5mm', rating: 4.4 },

  // ── Lenovo ─────────────────────────────────────────
  { id: 'lenovo-ideapad-slim-5', name: 'Lenovo IdeaPad Slim 5', brand: 'Lenovo', type: 'Laptop', category: 'midrange', price: 64990,
    display: 'IPS FHD, 300 nits', displaySize: '14"', processor: 'AMD Ryzen 7 7730U',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'AMD Radeon Graphics', battery: '10 hours',
    weight: '1.46 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, 3.5mm, SD', rating: 4.3 },
  { id: 'lenovo-ideapad-3-budget', name: 'Lenovo IdeaPad 3', brand: 'Lenovo', type: 'Laptop', category: 'budget', price: 37990,
    display: 'IPS FHD', displaySize: '15.6"', processor: 'AMD Ryzen 3 7320U',
    ram: '8 GB', storage: '256 GB SSD', gpu: 'AMD Radeon Graphics', battery: '8 hours',
    weight: '1.63 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, 3.5mm', rating: 3.9 },
  { id: 'lenovo-thinkpad-e14', name: 'Lenovo ThinkPad E14', brand: 'Lenovo', type: 'Laptop', category: 'midrange', price: 72990,
    display: 'IPS FHD, 300 nits', displaySize: '14"', processor: 'Intel Core i5-1340P',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'Intel Iris Xe', battery: '10 hours',
    weight: '1.59 kg', os: 'Windows 11 Pro', ports: 'USB-A, USB-C/TB4, HDMI, RJ45, 3.5mm', rating: 4.3 },
  { id: 'lenovo-legion-5', name: 'Lenovo Legion 5', brand: 'Lenovo', type: 'Laptop', category: 'gaming', price: 109990,
    display: 'IPS WQHD, 165Hz', displaySize: '15.6"', processor: 'AMD Ryzen 7 7735HS',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'NVIDIA RTX 4060 8GB', battery: '5 hours',
    weight: '2.4 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, RJ45, 3.5mm', rating: 4.5 },
  { id: 'lenovo-yoga-slim-7', name: 'Lenovo Yoga Slim 7', brand: 'Lenovo', type: 'Laptop', category: 'ultrabook', price: 94990,
    display: 'OLED 2.8K, 400 nits', displaySize: '14"', processor: 'Intel Core Ultra 7 155H',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'Intel Arc Graphics', battery: '11 hours',
    weight: '1.39 kg', os: 'Windows 11', ports: 'USB-A, 2x USB-C/TB4, HDMI, 3.5mm', rating: 4.5 },

  // ── ASUS ───────────────────────────────────────────
  { id: 'asus-vivobook-15', name: 'ASUS Vivobook 15', brand: 'ASUS', type: 'Laptop', category: 'budget', price: 52990,
    display: 'IPS FHD', displaySize: '15.6"', processor: 'Intel Core i5-1235U',
    ram: '8 GB', storage: '512 GB SSD', gpu: 'Intel Iris Xe', battery: '8 hours',
    weight: '1.7 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, 3.5mm', rating: 4.1 },
  { id: 'asus-vivobook-s14', name: 'ASUS Vivobook S 14', brand: 'ASUS', type: 'Laptop', category: 'ultrabook', price: 99990,
    display: 'OLED 2.8K, 120Hz', displaySize: '14"', processor: 'Snapdragon X Plus',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'Qualcomm Adreno GPU', battery: '18 hours',
    weight: '1.39 kg', os: 'Windows 11', ports: 'USB-A, 2x USB-C, HDMI, 3.5mm, microSD', rating: 4.4 },
  { id: 'asus-tuf-gaming-a15', name: 'ASUS TUF Gaming A15', brand: 'ASUS', type: 'Laptop', category: 'gaming', price: 89990,
    display: 'IPS FHD, 144Hz', displaySize: '15.6"', processor: 'AMD Ryzen 7 7735HS',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'NVIDIA RTX 4050 6GB', battery: '6 hours',
    weight: '2.2 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, RJ45, 3.5mm', rating: 4.3 },
  { id: 'asus-rog-strix-g16', name: 'ASUS ROG Strix G16', brand: 'ASUS', type: 'Laptop', category: 'gaming', price: 159990,
    display: 'IPS QHD+, 240Hz', displaySize: '16"', processor: 'Intel Core i9-13980HX',
    ram: '16 GB', storage: '1 TB SSD', gpu: 'NVIDIA RTX 4070 8GB', battery: '4 hours',
    weight: '2.5 kg', os: 'Windows 11', ports: 'USB-A, USB-C/TB4, HDMI, RJ45', rating: 4.6 },
  { id: 'asus-zenbook-14', name: 'ASUS Zenbook 14', brand: 'ASUS', type: 'Laptop', category: 'ultrabook', price: 84990,
    display: 'OLED 2.8K, 120Hz', displaySize: '14"', processor: 'Intel Core Ultra 5 125H',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'Intel Arc Graphics', battery: '13 hours',
    weight: '1.28 kg', os: 'Windows 11', ports: 'USB-A, 2x USB-C/TB4, HDMI, 3.5mm', rating: 4.5 },

  // ── Acer ───────────────────────────────────────────
  { id: 'acer-nitro-v-15', name: 'Acer Nitro V 15', brand: 'Acer', type: 'Laptop', category: 'gaming', price: 84990,
    display: 'IPS FHD, 144Hz', displaySize: '15.6"', processor: 'Intel Core i5-13420H',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'NVIDIA RTX 4050 6GB', battery: '6 hours',
    weight: '2.1 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, 3.5mm, RJ45', rating: 4.3 },
  { id: 'acer-aspire-go-15', name: 'Acer Aspire Go 15', brand: 'Acer', type: 'Laptop', category: 'budget', price: 34990,
    display: 'IPS FHD', displaySize: '15.6"', processor: 'Intel Core i3-N305',
    ram: '8 GB', storage: '256 GB SSD', gpu: 'Intel UHD Graphics', battery: '9 hours',
    weight: '1.78 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, 3.5mm', rating: 3.8 },
  { id: 'acer-aspire-5', name: 'Acer Aspire 5', brand: 'Acer', type: 'Laptop', category: 'midrange', price: 59990,
    display: 'IPS FHD, 300 nits', displaySize: '15.6"', processor: 'AMD Ryzen 5 7530U',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'AMD Radeon Graphics', battery: '9.5 hours',
    weight: '1.76 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, 3.5mm', rating: 4.1 },
  { id: 'acer-swift-go-14', name: 'Acer Swift Go 14', brand: 'Acer', type: 'Laptop', category: 'ultrabook', price: 79990,
    display: 'OLED 2.8K, 90Hz', displaySize: '14"', processor: 'Intel Core Ultra 5 125H',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'Intel Arc Graphics', battery: '11 hours',
    weight: '1.25 kg', os: 'Windows 11', ports: 'USB-A, 2x USB-C/TB4, HDMI, 3.5mm', rating: 4.3 },

  // ── MSI ────────────────────────────────────────────
  { id: 'msi-modern-14', name: 'MSI Modern 14', brand: 'MSI', type: 'Laptop', category: 'midrange', price: 56990,
    display: 'IPS FHD', displaySize: '14"', processor: 'Intel Core i5-1335U',
    ram: '8 GB', storage: '512 GB SSD', gpu: 'Intel Iris Xe', battery: '10 hours',
    weight: '1.4 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, 3.5mm', rating: 4.0 },
  { id: 'msi-katana-15', name: 'MSI Katana 15', brand: 'MSI', type: 'Laptop', category: 'gaming', price: 89990,
    display: 'IPS FHD, 144Hz', displaySize: '15.6"', processor: 'Intel Core i5-12450H',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'NVIDIA RTX 4050 6GB', battery: '5 hours',
    weight: '2.25 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, RJ45, 3.5mm', rating: 4.2 },

  // ── Tablets ────────────────────────────────────────
  { id: 'ipad-air-m2', name: 'iPad Air M2', brand: 'Apple', type: 'Tablet', category: 'tablet', price: 74900,
    display: 'Liquid Retina, P3 wide color', displaySize: '11"', processor: 'Apple M2',
    ram: '8 GB', storage: '128 GB', gpu: 'Apple M2 10-core GPU', battery: '10 hours',
    weight: '0.462 kg', os: 'iPadOS 18', ports: 'USB-C', rating: 4.6 },
  { id: 'ipad-pro-m4', name: 'iPad Pro M4', brand: 'Apple', type: 'Tablet', category: 'tablet', price: 119900,
    display: 'Ultra Retina XDR OLED, ProMotion', displaySize: '11"', processor: 'Apple M4',
    ram: '8 GB', storage: '256 GB', gpu: 'Apple M4 10-core GPU', battery: '10 hours',
    weight: '0.444 kg', os: 'iPadOS 18', ports: 'USB-C/TB4', rating: 4.8 },
  { id: 'ipad-10th-gen', name: 'iPad 10th Gen', brand: 'Apple', type: 'Tablet', category: 'tablet', price: 37900,
    display: 'Liquid Retina, True Tone', displaySize: '10.9"', processor: 'Apple A14 Bionic',
    ram: '4 GB', storage: '64 GB', gpu: 'Apple A14 4-core GPU', battery: '10 hours',
    weight: '0.477 kg', os: 'iPadOS 18', ports: 'USB-C', rating: 4.4 },
  { id: 'samsung-tab-s9-fe', name: 'Samsung Galaxy Tab S9 FE', brand: 'Samsung', type: 'Tablet', category: 'tablet', price: 44999,
    display: 'TFT LCD, 90Hz', displaySize: '10.9"', processor: 'Samsung Exynos 1380',
    ram: '6 GB', storage: '128 GB', gpu: 'Mali-G68', battery: '8000 mAh',
    weight: '0.523 kg', os: 'Android 14, One UI 6', ports: 'USB-C, S Pen included', rating: 4.3 },
  { id: 'samsung-tab-s10-plus', name: 'Samsung Galaxy Tab S10+', brand: 'Samsung', type: 'Tablet', category: 'tablet', price: 109999,
    display: 'Dynamic AMOLED, 120Hz', displaySize: '12.4"', processor: 'MediaTek Dimensity 9300+',
    ram: '12 GB', storage: '256 GB', gpu: 'Immortalis-G720', battery: '10090 mAh',
    weight: '0.571 kg', os: 'Android 14, One UI 6', ports: 'USB-C, S Pen included', rating: 4.6 },
  { id: 'oneplus-pad-2', name: 'OnePlus Pad 2', brand: 'OnePlus', type: 'Tablet', category: 'tablet', price: 39999,
    display: 'LCD, 144Hz, 900 nits', displaySize: '12.1"', processor: 'Snapdragon 8 Gen 3',
    ram: '8 GB', storage: '256 GB', gpu: 'Adreno 750', battery: '9510 mAh',
    weight: '0.584 kg', os: 'Android 14, OxygenOS', ports: 'USB-C', rating: 4.4 },
  { id: 'xiaomi-pad-7', name: 'Xiaomi Pad 7', brand: 'Xiaomi', type: 'Tablet', category: 'tablet', price: 27999,
    display: 'IPS LCD, 144Hz', displaySize: '11.2"', processor: 'Snapdragon 7+ Gen 3',
    ram: '8 GB', storage: '128 GB', gpu: 'Adreno 732', battery: '8850 mAh',
    weight: '0.500 kg', os: 'Android 14, HyperOS', ports: 'USB-C', rating: 4.3 },
];

export const laptopBrands = [...new Set(laptops.map(l => l.brand))];
export const categories = [...new Set(laptops.map(l => l.category))];
