/**
 * Central content model for The House of Chilli N Curry.
 *
 * IMAGES: these are high-resolution stand-ins served from Unsplash so the site
 * runs with zero binary assets. Replace the `img(...)` IDs (or point them at
 * /public) with the restaurant's real food photography before launch.
 */

export const img = (id: string, w = 1400, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const BRAND = {
  name: "The House of Chilli N Curry",
  short: "Chilli N Curry",
  tagline: "Where Every Bite is an Experience.",
  phone: "+91 98765 43210",
  email: "reservations@houseofchillincurry.com",
  address: "42 Saffron Boulevard, Connaught Place, New Delhi 110001",
  hours: [
    { day: "Monday – Thursday", time: "12:00 PM – 11:00 PM" },
    { day: "Friday – Saturday", time: "12:00 PM – 12:30 AM" },
    { day: "Sunday", time: "11:00 AM – 11:00 PM" },
  ],
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    whatsapp: "https://wa.me/919876543210",
  },
};

export type Dish = {
  name: string;
  desc: string;
  price: string;
  image: string;
  tag?: string;
};

export const signatureDishes: Dish[] = [
  {
    name: "Butter Chicken",
    desc: "Tandoor-charred chicken folded into a velvet tomato-fenugreek gravy finished with cultured butter.",
    price: "₹620",
    image: img("1585937421612-70a008356fbe"),
    tag: "House Classic",
  },
  {
    name: "Chicken Biryani",
    desc: "Aged basmati sealed with saffron, slow-dum cooked over coal with hand-pounded garam masala.",
    price: "₹580",
    image: img("1633945274405-b6c8069047b0"),
    tag: "Slow Dum",
  },
  {
    name: "Paneer Lababdar",
    desc: "Cottage cheese in a silken cashew-tomato reduction, kissed with kasuri methi and cream.",
    price: "₹540",
    image: img("1631452180519-c014fe946bc7"),
    tag: "Vegetarian",
  },
  {
    name: "Dragon Chicken",
    desc: "Crisp chilli-glazed chicken tossed with roasted cashews, scallion and Szechuan heat.",
    price: "₹560",
    image: img("1603894584373-5ac82b2ae398"),
    tag: "Indo-Chinese",
  },
  {
    name: "Chicken Tikka",
    desc: "Hung-curd marinated morsels lacquered in the tandoor until smoke-kissed and blushing.",
    price: "₹520",
    image: img("1599487488170-d11ec9c172f0"),
    tag: "From the Tandoor",
  },
  {
    name: "Dal Makhani",
    desc: "Black urad simmered overnight on slow coals, mounted with butter and finished with cream.",
    price: "₹480",
    image: img("1546833999-b9f581a1996d"),
    tag: "Overnight",
  },
  {
    name: "Garlic Naan",
    desc: "Blistered clay-oven flatbread brushed with roasted garlic, coriander and clarified butter.",
    price: "₹120",
    image: img("1601050690597-df0568f70950"),
    tag: "Clay Oven",
  },
  {
    name: "Chilli Paneer",
    desc: "Golden paneer wok-tossed in a glossy chilli-soy glaze with peppers and toasted sesame.",
    price: "₹500",
    image: img("1596797038530-2c107229654b"),
    tag: "Indo-Chinese",
  },
];

export type MenuItem = {
  name: string;
  desc: string;
  price: string;
  image: string;
  category: MenuCategory;
};

export type MenuCategory =
  | "Indian"
  | "Chinese"
  | "Tandoor"
  | "Biryani"
  | "Desserts"
  | "Mocktails";

export const menuCategories: MenuCategory[] = [
  "Indian",
  "Chinese",
  "Tandoor",
  "Biryani",
  "Desserts",
  "Mocktails",
];

export const menu: MenuItem[] = [
  { category: "Indian", name: "Rogan Josh", desc: "Kashmiri lamb, ratan jot, fennel.", price: "₹690", image: img("1585937421612-70a008356fbe", 900) },
  { category: "Indian", name: "Paneer Lababdar", desc: "Cashew-tomato, kasuri methi.", price: "₹540", image: img("1631452180519-c014fe946bc7", 900) },
  { category: "Indian", name: "Dal Makhani", desc: "Overnight black urad, butter.", price: "₹480", image: img("1546833999-b9f581a1996d", 900) },
  { category: "Chinese", name: "Dragon Chicken", desc: "Chilli glaze, cashew, scallion.", price: "₹560", image: img("1603894584373-5ac82b2ae398", 900) },
  { category: "Chinese", name: "Chilli Paneer", desc: "Chilli-soy glaze, sesame.", price: "₹500", image: img("1596797038530-2c107229654b", 900) },
  { category: "Chinese", name: "Hakka Noodles", desc: "Wok-tossed, garden greens.", price: "₹420", image: img("1585032226651-759b368d7246", 900) },
  { category: "Tandoor", name: "Chicken Tikka", desc: "Hung curd, smoke-kissed.", price: "₹520", image: img("1599487488170-d11ec9c172f0", 900) },
  { category: "Tandoor", name: "Seekh Kebab", desc: "Minced lamb, coal-grilled.", price: "₹580", image: img("1509722747041-616f39b57569", 900) },
  { category: "Tandoor", name: "Tandoori Prawns", desc: "Ajwain, saffron, lime.", price: "₹740", image: img("1625944230945-1b7dd3b949ab", 900) },
  { category: "Biryani", name: "Chicken Biryani", desc: "Saffron, coal-dum basmati.", price: "₹580", image: img("1633945274405-b6c8069047b0", 900) },
  { category: "Biryani", name: "Lamb Biryani", desc: "Slow lamb shank, aged rice.", price: "₹680", image: img("1563379091339-03b21ab4a4f8", 900) },
  { category: "Biryani", name: "Subz Biryani", desc: "Garden vegetables, mint.", price: "₹460", image: img("1596797038530-2c107229654b", 900) },
  { category: "Desserts", name: "Shahi Tukda", desc: "Saffron rabri, gold leaf.", price: "₹280", image: img("1551024601-bec78aea704b", 900) },
  { category: "Desserts", name: "Gulab Jamun", desc: "Warm, rose, cardamom.", price: "₹240", image: img("1606313564200-e75d5e30476c", 900) },
  { category: "Desserts", name: "Kulfi Falooda", desc: "Pistachio, vermicelli, rose.", price: "₹260", image: img("1488900128323-21503983a07e", 900) },
  { category: "Mocktails", name: "Saffron Sunset", desc: "Saffron, orange, soda.", price: "₹320", image: img("1544145945-f90425340c7e", 900) },
  { category: "Mocktails", name: "Rose Kisses", desc: "Rose, lychee, lime.", price: "₹300", image: img("1536935338788-846bb9981813", 900) },
  { category: "Mocktails", name: "Mint Monsoon", desc: "Mint, cucumber, tonic.", price: "₹300", image: img("1513558161293-cdaf765ed2fd", 900) },
];

export const experienceStats = [
  { value: 100, suffix: "%", label: "Fresh Ingredients", sub: "Sourced daily at dawn" },
  { value: 48, suffix: "+", label: "Authentic Recipes", sub: "Passed through generations" },
  { value: 15, suffix: "yrs", label: "Master Chefs", sub: "Tandoor & wok mastery" },
  { value: 250, suffix: "k+", label: "Guests Served", sub: "And returning for more" },
];

export const experiencePillars = [
  "Fresh Ingredients",
  "Authentic Recipes",
  "Premium Dining",
  "Master Chefs",
  "Fast Service",
  "Luxury Ambience",
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Aarav Mehta",
    role: "Food Critic, The Plate",
    quote:
      "The biryani arrived under a wax seal of smoke. One spoon and the room went quiet. This is fine dining that still tastes like home.",
    avatar: img("1633332755192-727a05c4013d", 200),
  },
  {
    name: "Sofia Ricci",
    role: "Travel Journalist",
    quote:
      "I have eaten across three continents this year. The butter chicken here is the single dish I keep dreaming about.",
    avatar: img("1494790108377-be9c29b29330", 200),
  },
  {
    name: "Rohan Kapoor",
    role: "Regular Guest",
    quote:
      "Every visit feels like a celebration. The service is telepathic, the ambience is cinematic, and the chilli paneer is unreal.",
    avatar: img("1507003211169-0a1dd7228f2d", 200),
  },
  {
    name: "Ananya Sharma",
    role: "Chef & Restaurateur",
    quote:
      "Impeccable balance of heat, smoke and cream. As a chef, I rarely applaud a plate. Here I applauded twice.",
    avatar: img("1438761681033-6461ffad8d80", 200),
  },
];

export const gallery = [
  { src: img("1585937421612-70a008356fbe", 1000), span: "row-span-2", alt: "Butter chicken in copper" },
  { src: img("1633945274405-b6c8069047b0", 800), span: "", alt: "Saffron biryani" },
  { src: img("1517248135467-4c7edcad34c4", 800), span: "", alt: "Restaurant interior" },
  { src: img("1599487488170-d11ec9c172f0", 1000), span: "row-span-2", alt: "Chicken tikka on skewers" },
  { src: img("1414235077428-338989a2e8c0", 800), span: "", alt: "Dining ambience" },
  { src: img("1596797038530-2c107229654b", 800), span: "", alt: "Chilli paneer" },
  { src: img("1509722747041-616f39b57569", 1000), span: "row-span-2", alt: "Seekh kebab" },
  { src: img("1551024601-bec78aea704b", 800), span: "", alt: "Dessert plating" },
  { src: img("1544145945-f90425340c7e", 800), span: "", alt: "Signature mocktail" },
];
