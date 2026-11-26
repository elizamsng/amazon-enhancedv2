export interface GalleryItem {
  id: string;
  label: string;
  alt: string;
  src: string;
  isVideoSpotlight?: boolean;
  caption?: string;
}

export interface ProductSpecBlock {
  id: string;
  label: string;
  value: string;
  detail: string;
  iconKey: 'weight' | 'polling' | 'sensor' | 'switches' | 'battery' | 'platform';
}

export interface ProductReview {
  id: string;
  author: string;
  initial: string;
  rating: number;
  title: string;
  date: string;
  location: string;
  verified: boolean;
  body: string;
  helpfulCount: number;
}

export interface ColorOption {
  id: 'black' | 'white';
  name: string;
  swatchHex: string;
  ringHex: string;
  gallery: GalleryItem[];
}

export interface SpecOption {
  id: 'standard-1k' | 'pro-8k' | 'esports-glass';
  name: string;
  badge?: string;
  summary: string;
  price: number;
  typicalPrice: number;
  weightValue: string;
  weightDetail: string;
  pollingValue: string;
  pollingDetail: string;
  skatesDetail: string;
}

export interface CatalogItem {
  id: string;
  brand: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  category: string;
  price: number;
  typicalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  inStock: boolean;
  deliveryDate: string;
  specs?: ProductSpecBlock[];
}

export const BLACK_PRODUCT_GALLERY: GalleryItem[] = [
  {
    id: 'black-main',
    label: 'Main',
    alt: 'Razer Viper V4 Pro Matte Black Wireless Gaming Mouse with 8K Dongle',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMWhondMfoYw9kYV3wIGyR67X-p2fH9LmoZYKGDU2SY5qsiPTtlHLY1-V066BaYpfaQIL53-a_WM2AKF7IEnJ50rDE_sbHMYMwjsCxH5ncNiCuxr0RMx7XlfMqDu98-X-eThRXA0kU7oiCsfqwhDWi_giH0aCD5-rZi7FzuXawFEAKHqZlfnweJ3rVdAbmdxHIUP8epyNsvmS5pYeTh6MeWJUq5jKMea-aBSu4JgU',
    caption: 'Matte Black · Viper V4 Pro & Wireless Dongle',
  },
  {
    id: 'black-angle',
    label: 'Angle',
    alt: 'Razer Viper V4 Pro Matte Black ergonomic three-quarter angle view',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcxOisDUmg-nTCgdB2wGRcm_eYcho6IZIqmqq8tAqO0CjP3fMfPxCCdyBqP7_DAt5h97dS3zpZBGTZwGmqNNP6Y55NEfb_uDiniV9i0-YfrRxKVQkHPncWc6NCkDUmGV_ueQvUOYXLsQ7CCd-Q7KWfikgcFOG_qChy9wTR3YNmkVwN714KeVt8pfzPaLmgkNDCR8qJSvlO1krPpzAvWMfqTqPdxWhnBgAEmo-whQ4',
    caption: 'Symmetrical ultralight shell sculpted for claw & fingertip grips',
  },
  {
    id: 'black-top',
    label: 'Top',
    alt: 'Razer Viper V4 Pro Matte Black top-down silhouette view',
    src: '/src/assets/images/viper_top_view_1795665656911.jpg',
    caption: 'Top profile with tactile optical scroll wheel',
  },
  {
    id: 'black-sensor',
    label: 'Sensor',
    alt: 'Focus Pro 50K optical sensor and PTFE skates underside',
    src: '/src/assets/images/viper_sensor_view_1795665658186.jpg',
    caption: 'Focus Pro 50K Optical Sensor & 100% PTFE skates',
  },
  {
    id: 'black-dongle',
    label: 'Dongle',
    alt: 'HyperPolling wireless receiver and braided USB-C cable',
    src: '/src/assets/images/viper_dongle_setup_1795665658558.jpg',
    isVideoSpotlight: true,
    caption: 'Low-latency wireless transmitter & Speedflex cable',
  },
];

export const WHITE_PRODUCT_GALLERY: GalleryItem[] = [
  {
    id: 'white-main',
    label: 'Main',
    alt: 'Razer Viper V4 Pro Mercury White Wireless Gaming Mouse with White 8K Dongle',
    src: '/src/assets/images/viper_white_main_1795681230340.jpg',
    caption: 'Mercury White · Viper V4 Pro & Wireless Dongle',
  },
  {
    id: 'white-angle',
    label: 'Angle',
    alt: 'Razer Viper V4 Pro Mercury White three-quarter side angle view',
    src: '/src/assets/images/viper_white_angle_1795681231366.jpg',
    caption: 'Mercury White finish with contrast thumb buttons',
  },
  {
    id: 'white-top',
    label: 'Top',
    alt: 'Razer Viper V4 Pro Mercury White top-down symmetrical view',
    src: '/src/assets/images/viper_white_top_1795681230655.jpg',
    caption: 'Solid ultralight shell — zero honeycomb cutouts',
  },
  {
    id: 'white-sensor',
    label: 'Sensor',
    alt: 'Focus Pro 50K optical sensor and PTFE skates underside',
    src: '/src/assets/images/viper_sensor_view_1795665658186.jpg',
    caption: 'Focus Pro 50K Optical Sensor & 100% PTFE skates',
  },
  {
    id: 'white-dongle',
    label: 'Dongle',
    alt: 'HyperPolling wireless receiver and braided USB-C cable',
    src: '/src/assets/images/viper_dongle_setup_1795665658558.jpg',
    isVideoSpotlight: true,
    caption: 'Low-latency wireless transmitter & Speedflex cable',
  },
];

export const MAIN_PRODUCT_GALLERY = BLACK_PRODUCT_GALLERY;

export const VIPER_COLOR_OPTIONS: ColorOption[] = [
  {
    id: 'black',
    name: 'Matte Black',
    swatchHex: '#18181B',
    ringHex: '#18181B',
    gallery: BLACK_PRODUCT_GALLERY,
  },
  {
    id: 'white',
    name: 'Mercury White',
    swatchHex: '#F4F4F5',
    ringHex: '#94A3B8',
    gallery: WHITE_PRODUCT_GALLERY,
  },
];

export const VIPER_SPEC_OPTIONS: SpecOption[] = [
  {
    id: 'standard-1k',
    name: 'Standard 1K',
    summary: '49g · 1,000 Hz Wireless',
    price: 119.0,
    typicalPrice: 169.0,
    weightValue: '49g',
    weightDetail: 'Ultralight solid shell',
    pollingValue: '1,000 Hz',
    pollingDetail: 'HyperSpeed Wireless',
    skatesDetail: '100% Virgin PTFE feet',
  },
  {
    id: 'pro-8k',
    name: 'Pro 8K Bundle',
    badge: 'Popular',
    summary: '49g · 8,000 Hz Dongle',
    price: 135.24,
    typicalPrice: 198.07,
    weightValue: '49g',
    weightDetail: 'Ultralight solid shell',
    pollingValue: '8,000 Hz',
    pollingDetail: 'HyperPolling 8K dongle',
    skatesDetail: '100% Virgin PTFE feet',
  },
  {
    id: 'esports-glass',
    name: 'Esports Pro + Skates',
    summary: '47g · 8,000 Hz + Glass Skates',
    price: 149.9,
    typicalPrice: 219.0,
    weightValue: '47g',
    weightDetail: 'Lightened pro chassis',
    pollingValue: '8,000 Hz',
    pollingDetail: 'HyperPolling 8K dongle',
    skatesDetail: 'Tempered glass + PTFE kit',
  },
];

export function buildViperSpecBlocks(spec: SpecOption): ProductSpecBlock[] {
  return [
    {
      id: 'weight',
      label: 'Weight',
      value: spec.weightValue,
      detail: spec.weightDetail,
      iconKey: 'weight',
    },
    {
      id: 'polling',
      label: 'Polling Rate',
      value: spec.pollingValue,
      detail: spec.pollingDetail,
      iconKey: 'polling',
    },
    {
      id: 'sensor',
      label: 'Optical Sensor',
      value: '50K DPI',
      detail: 'Focus Pro · tracks on glass',
      iconKey: 'sensor',
    },
    {
      id: 'switches',
      label: 'Switches',
      value: '0.2 ms',
      detail: 'Gen-3 Optical · 90M clicks',
      iconKey: 'switches',
    },
    {
      id: 'battery',
      label: 'Battery Life',
      value: '95 hrs',
      detail: 'USB-C fast charge · ' + spec.skatesDetail,
      iconKey: 'battery',
    },
    {
      id: 'platform',
      label: 'Compatibility',
      value: 'PC / Mac',
      detail: 'Windows, macOS & Linux',
      iconKey: 'platform',
    },
  ];
}

export const ABOUT_BULLETS = [
  {
    lead: 'Ultralight Ergonomic Precision',
    body: 'Co-engineered with esports pros for fast micro-adjustments and sustained comfort without honeycomb cutouts.',
  },
  {
    lead: 'True Wireless Responsiveness',
    body: 'HyperSpeed Gen-2 wireless transmission cuts input delay down to tournament-grade consistency.',
  },
  {
    lead: 'Focus Pro 50K Optical Sensor',
    body: 'Pixel-accurate tracking across cloth, hybrid, and tempered glass mouse pads with smart lift-off control.',
  },
  {
    lead: 'Gen-3 Optical Switches',
    body: 'Zero double-clicking issues with 0.2ms actuation and a 90-million click durability rating.',
  },
  {
    lead: 'All-Week Battery Runtime',
    body: 'Up to 95 hours of continuous wireless play with rapid USB-C top-up.',
  },
];

export const RATING_DISTRIBUTION = [
  { stars: 5, percent: 84 },
  { stars: 4, percent: 11 },
  { stars: 3, percent: 3 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

export const INITIAL_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    author: 'Marcus T.',
    initial: 'M',
    rating: 5,
    title: 'Unbelievably light, 8k polling is crisp',
    date: '22 November 2024',
    location: 'Singapore',
    verified: true,
    body: 'Upgraded from my Viper V2 Pro. The coating feels noticeably grippier, and the sensor latency on 8K wireless with the included hyper-polling dongle is insane. 10/10 esports mouse.',
    helpfulCount: 38,
  },
  {
    id: 'rev-2',
    author: 'Rachel Lim',
    initial: 'R',
    rating: 5,
    title: 'Zero flex at 49g and optical scroll feels snappy',
    date: '19 November 2024',
    location: 'Singapore',
    verified: true,
    body: 'Delivered next afternoon to Tanjong Pagar. Coming from a 63g mouse, the weight reduction makes micro-adjustments in Valorant effortless without feeling hollow or creaky.',
    helpfulCount: 19,
  },
  {
    id: 'rev-3',
    author: 'Daniel Tan',
    initial: 'D',
    rating: 4,
    title: 'Top-tier sensor, 8K drains battery faster as expected',
    date: '14 November 2024',
    location: 'Singapore',
    verified: true,
    body: 'At 1000Hz it lasts well over a week of daily ranked sessions. Running full 8000Hz cuts runtime noticeably, which is physics, though charging over USB-C is fast. Coating is a massive upgrade.',
    helpfulCount: 12,
  },
  {
    id: 'rev-4',
    author: 'Wei Jie Koh',
    initial: 'W',
    rating: 5,
    title: 'Glass pad tracking works out of the box',
    date: '09 November 2024',
    location: 'Singapore',
    verified: true,
    body: 'Tracks cleanly on my tempered glass pad without spin-outs. The Black Friday price on Amazon SG with GST included made this an instant buy.',
    helpfulCount: 9,
  },
  {
    id: 'rev-5',
    author: 'Adrian Ng',
    initial: 'A',
    rating: 3,
    title: 'Great hardware, slightly narrow for large palm grip',
    date: '02 November 2024',
    location: 'Singapore',
    verified: true,
    body: 'Clicks and sensor are faultless, but if you have 20cm+ hands and prefer full palm contact, the symmetrical hump sits low. Best suited for claw or fingertip grip.',
    helpfulCount: 6,
  },
];

export const RELATED_CATALOG: CatalogItem[] = [
  {
    id: 'viper-v4-pro',
    brand: 'Razer',
    title: 'Razer Viper V4 Pro Wireless Mouse',
    shortTitle: 'Razer Viper V4 Pro',
    subtitle: 'Ultralight Wireless Esports Gaming Mouse',
    category: 'Mice',
    price: 135.24,
    typicalPrice: 198.07,
    rating: 4.8,
    reviewCount: 242,
    image: BLACK_PRODUCT_GALLERY[0].src,
    inStock: true,
    deliveryDate: 'Friday, December 6',
  },
  {
    id: 'gigantus-v2',
    brand: 'Razer',
    title: 'Razer Gigantus V2 Gaming Mouse Mat',
    shortTitle: 'Razer Gigantus V2 (Large)',
    subtitle: 'Textured Micro-Weave Cloth Surface',
    category: 'Gaming Accessories',
    price: 24.9,
    typicalPrice: 29.9,
    rating: 4.7,
    reviewCount: 1840,
    image: '/src/assets/images/viper_dongle_setup_1795665658558.jpg',
    inStock: true,
    deliveryDate: 'Friday, December 6',
    specs: [
      { id: 'surface', label: 'Surface', value: 'Micro-Weave', detail: 'Balanced speed & control', iconKey: 'sensor' },
      { id: 'size', label: 'Dimensions', value: '450 × 400mm', detail: 'Large desktop footprint', iconKey: 'platform' },
      { id: 'base', label: 'Thickness', value: '3 mm', detail: 'High-density anti-slip foam', iconKey: 'weight' },
      { id: 'edge', label: 'Stitching', value: 'Flat Edge', detail: 'Zero wrist irritation', iconKey: 'switches' },
    ],
  },
  {
    id: 'hyperpolling-dock',
    brand: 'Razer',
    title: 'Razer 8K HyperPolling Dongle Kit',
    shortTitle: 'Razer 8K HyperPolling Dongle',
    subtitle: 'True 8,000 Hz Wireless Receiver & USB-C Cable',
    category: 'Computer Accessories',
    price: 42.5,
    typicalPrice: 49.9,
    rating: 4.6,
    reviewCount: 315,
    image: '/src/assets/images/viper_top_view_1795665656911.jpg',
    inStock: true,
    deliveryDate: 'Saturday, December 7',
    specs: [
      { id: 'polling', label: 'Polling Rate', value: '8,000 Hz', detail: '0.125 ms interval', iconKey: 'polling' },
      { id: 'cable', label: 'Cable', value: 'Speedflex', detail: 'Braided USB-C included', iconKey: 'battery' },
      { id: 'compat', label: 'Support', value: 'Viper / DeathAdder', detail: 'HyperSpeed Gen-2 mice', iconKey: 'platform' },
      { id: 'status', label: 'Indicator', value: 'LED Sync', detail: 'Battery & polling status', iconKey: 'sensor' },
    ],
  },
  {
    id: 'ptfe-skates',
    brand: 'Razer',
    title: 'Razer PTFE Replacement Mouse Skates',
    shortTitle: 'Razer PTFE Mouse Skates',
    subtitle: '100% Virgin-Grade Low-Friction Feet',
    category: 'Computer Accessories',
    price: 16.9,
    typicalPrice: 19.9,
    rating: 4.8,
    reviewCount: 412,
    image: '/src/assets/images/viper_sensor_view_1795665658186.jpg',
    inStock: true,
    deliveryDate: 'Friday, December 6',
    specs: [
      { id: 'material', label: 'Material', value: '100% PTFE', detail: 'Virgin-grade low friction', iconKey: 'weight' },
      { id: 'edges', label: 'Profile', value: 'Rounded', detail: 'Smooth glide on cloth & glass', iconKey: 'sensor' },
      { id: 'sets', label: 'In Pack', value: '2 Full Sets', detail: 'With alcohol prep wipes', iconKey: 'battery' },
      { id: 'fit', label: 'Fit', value: 'Viper Series', detail: 'Precision die-cut adhesive', iconKey: 'platform' },
    ],
  },
];

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  seller: string;
  inStock: boolean;
}

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'gigantus-v2',
    title: 'Razer Gigantus V2 Gaming Mouse Mat (Large)',
    price: 24.9,
    quantity: 1,
    image: '/src/assets/images/viper_dongle_setup_1795665658558.jpg',
    seller: 'Razer Official Flagship',
    inStock: true,
  },
  {
    id: 'ptfe-skates',
    title: 'Razer PTFE Replacement Mouse Skates',
    price: 16.9,
    quantity: 1,
    image: '/src/assets/images/viper_sensor_view_1795665658186.jpg',
    seller: 'Amazon SG',
    inStock: true,
  },
];

export const SINGAPORE_LOCATIONS = [
  { postal: '049145', district: 'Raffles Place / Marina Bay' },
  { postal: '238801', district: 'Orchard Road' },
  { postal: '529510', district: 'Tampines Central' },
  { postal: '608526', district: 'Jurong East' },
  { postal: '118429', district: 'Clementi / Kent Ridge' },
];
