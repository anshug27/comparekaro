export interface Laptop {
  id: string;
  name: string;
  brand: string;
  type: 'Laptop' | 'Tablet';
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
  {
    id: 'macbook-air-m3', name: 'MacBook Air M3', brand: 'Apple', type: 'Laptop', price: 114900,
    display: 'Liquid Retina, 500 nits', displaySize: '13.6"', processor: 'Apple M3 (8-core)',
    ram: '8 GB', storage: '256 GB SSD', gpu: 'Apple M3 10-core GPU', battery: '18 hours',
    weight: '1.24 kg', os: 'macOS Sequoia', ports: '2x USB-C, MagSafe, 3.5mm', rating: 4.7,
  },
  {
    id: 'macbook-pro-m3-pro', name: 'MacBook Pro 14" M3 Pro', brand: 'Apple', type: 'Laptop', price: 199900,
    display: 'Liquid Retina XDR, 1000 nits, ProMotion 120Hz', displaySize: '14.2"', processor: 'Apple M3 Pro (12-core)',
    ram: '18 GB', storage: '512 GB SSD', gpu: 'Apple M3 Pro 18-core GPU', battery: '17 hours',
    weight: '1.55 kg', os: 'macOS Sequoia', ports: '3x USB-C, HDMI, SD, MagSafe, 3.5mm', rating: 4.8,
  },
  {
    id: 'dell-xps-14', name: 'Dell XPS 14', brand: 'Dell', type: 'Laptop', price: 169990,
    display: 'OLED, 3200x2000, 400 nits', displaySize: '14.5"', processor: 'Intel Core Ultra 7 155H',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'Intel Arc Graphics', battery: '12 hours',
    weight: '1.69 kg', os: 'Windows 11', ports: '2x USB-C, 1x USB-C/TB4', rating: 4.4,
  },
  {
    id: 'hp-pavilion-15', name: 'HP Pavilion 15', brand: 'HP', type: 'Laptop', price: 72990,
    display: 'IPS FHD, 300 nits', displaySize: '15.6"', processor: 'Intel Core i5-1335U',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'Intel Iris Xe', battery: '8.5 hours',
    weight: '1.75 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, 3.5mm', rating: 4.2,
  },
  {
    id: 'lenovo-ideapad-slim-5', name: 'Lenovo IdeaPad Slim 5', brand: 'Lenovo', type: 'Laptop', price: 64990,
    display: 'IPS FHD, 300 nits', displaySize: '14"', processor: 'AMD Ryzen 7 7730U',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'AMD Radeon Graphics', battery: '10 hours',
    weight: '1.46 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, 3.5mm, SD', rating: 4.3,
  },
  {
    id: 'asus-vivobook-15', name: 'ASUS Vivobook 15', brand: 'ASUS', type: 'Laptop', price: 52990,
    display: 'IPS FHD', displaySize: '15.6"', processor: 'Intel Core i5-1235U',
    ram: '8 GB', storage: '512 GB SSD', gpu: 'Intel Iris Xe', battery: '8 hours',
    weight: '1.7 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, 3.5mm', rating: 4.1,
  },
  {
    id: 'acer-nitro-v-15', name: 'Acer Nitro V 15', brand: 'Acer', type: 'Laptop', price: 84990,
    display: 'IPS FHD, 144Hz', displaySize: '15.6"', processor: 'Intel Core i5-13420H',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'NVIDIA RTX 4050 6GB', battery: '6 hours',
    weight: '2.1 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, 3.5mm, RJ45', rating: 4.3,
  },
  {
    id: 'hp-victus-16', name: 'HP Victus 16', brand: 'HP', type: 'Laptop', price: 79990,
    display: 'IPS FHD, 144Hz', displaySize: '16.1"', processor: 'AMD Ryzen 5 7535HS',
    ram: '16 GB', storage: '512 GB SSD', gpu: 'NVIDIA RTX 4050 6GB', battery: '6.5 hours',
    weight: '2.3 kg', os: 'Windows 11', ports: 'USB-A, USB-C, HDMI, 3.5mm, RJ45', rating: 4.2,
  },
  // Tablets
  {
    id: 'ipad-air-m2', name: 'iPad Air M2', brand: 'Apple', type: 'Tablet', price: 74900,
    display: 'Liquid Retina, P3 wide color', displaySize: '11"', processor: 'Apple M2',
    ram: '8 GB', storage: '128 GB', gpu: 'Apple M2 10-core GPU', battery: '10 hours',
    weight: '0.462 kg', os: 'iPadOS 18', ports: 'USB-C', rating: 4.6,
  },
  {
    id: 'ipad-10th-gen', name: 'iPad 10th Gen', brand: 'Apple', type: 'Tablet', price: 37900,
    display: 'Liquid Retina, True Tone', displaySize: '10.9"', processor: 'Apple A14 Bionic',
    ram: '4 GB', storage: '64 GB', gpu: 'Apple A14 4-core GPU', battery: '10 hours',
    weight: '0.477 kg', os: 'iPadOS 18', ports: 'USB-C', rating: 4.4,
  },
  {
    id: 'samsung-tab-s9-fe', name: 'Samsung Galaxy Tab S9 FE', brand: 'Samsung', type: 'Tablet', price: 44999,
    display: 'TFT LCD, 90Hz', displaySize: '10.9"', processor: 'Samsung Exynos 1380',
    ram: '6 GB', storage: '128 GB', gpu: 'Mali-G68', battery: '8000 mAh',
    weight: '0.523 kg', os: 'Android 14, One UI 6', ports: 'USB-C, S Pen included', rating: 4.3,
  },
  {
    id: 'oneplus-pad-2', name: 'OnePlus Pad 2', brand: 'OnePlus', type: 'Tablet', price: 39999,
    display: 'LCD, 144Hz, 900 nits', displaySize: '12.1"', processor: 'Snapdragon 8 Gen 3',
    ram: '8 GB', storage: '256 GB', gpu: 'Adreno 750', battery: '9510 mAh',
    weight: '0.584 kg', os: 'Android 14, OxygenOS', ports: 'USB-C', rating: 4.4,
  },
];

export const laptopBrands = [...new Set(laptops.map(l => l.brand))];
