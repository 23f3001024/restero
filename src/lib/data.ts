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
  phone: "+91 99879 30956",
  phone2: "+91 79790 72778",
  address: "Shop C-07, Dynamic Grandeur, Wadachiwadi, Undri, Pune 411060",
  fssai: "21525079004488",
  mapUrl: "https://maps.app.goo.gl/gAkPULuxYDL8issx5",
  upiId: "houseofchili@idfcbank",
  upiName: "The House of Chilli N Curry",
  hours: [{ day: "Monday – Sunday", time: "12:00 PM onwards" }],
  socials: {
    instagram: "https://www.instagram.com/thehouseofchilincurry",
    whatsapp: "https://wa.me/919987930956",
  },
};

export type Dish = {
  name: string;
  desc: string;
  price: string;
  image: string;
  tag?: string;
  /** Exact menu item name for the /order?add= link, when it differs from the display name. */
  menuName?: string;
};

export const signatureDishes: Dish[] = [
  {
    name: "Chilly Paneer",
    desc: "Golden paneer wok-tossed in fiery chilli-soy magic — vibrant, glossy and delicious.",
    price: "₹249",
    image: img("1631452180519-c014fe946bc7"),
    tag: "Veg",
  },
  {
    name: "Chicken 65",
    desc: "Spicy, crispy and legendary — bite-sized chicken fried to a fiery South-Indian crunch.",
    price: "₹249",
    image: img("1562967914-608f82629710"),
    tag: "Non-Veg",
  },
  {
    name: "Paneer 65",
    desc: "A legendary South Indian spice burst — crisp cottage cheese in a punchy red glaze.",
    price: "₹199",
    image: img("1606491956689-2ea866880c84"),
    tag: "Veg",
  },
  {
    name: "Kung Pao Chicken",
    desc: "Nutty, spicy and irresistible — wok-charred chicken with cashews and dried chillies.",
    price: "₹349",
    image: img("1603894584373-5ac82b2ae398"),
    tag: "Non-Veg",
    menuName: "Kung Pao (Chicken)",
  },
  {
    name: "Honey Chilly Potato",
    desc: "Crisp golden bites glazed with sweet-spice — the crunchiest way to start.",
    price: "₹249",
    image: img("1630384060421-cb20d0e0649d"),
    tag: "Veg",
  },
  {
    name: "Schezwan Noodles",
    desc: "Spicy, smoky and full of punch — hand-tossed noodles in a bold schezwan wok toss.",
    price: "₹249",
    image: img("1569718212165-3a8278d5f624"),
    tag: "Veg",
  },
  {
    name: "Thai Basil Chicken",
    desc: "Aromatic Thai flavours, rich and balanced — chicken simmered with holy basil.",
    price: "₹349",
    image: img("1614777986387-015c2a89b696"),
    tag: "Non-Veg",
    menuName: "Thai Basil Chicken / Fish / Prawn",
  },
  {
    name: "Padd Thai Noodles",
    desc: "Savoury, wok-tossed noodles with sweet-sour depth and a nutty finish.",
    price: "₹299",
    image: img("1573080496219-bb080dd4f877"),
    tag: "Veg",
  },
];

export type MenuItem = {
  name: string;
  desc: string;
  price: string;
  image: string;
  category: MenuCategory;
  veg: boolean;
};

export type MenuCategory =
  | "Starters"
  | "Mains"
  | "Rice & Noodles"
  | "Combos"
  | "Quick Bites"
  | "Beverages"
  | "Desserts";

export const menuCategories: MenuCategory[] = [
  "Starters",
  "Mains",
  "Rice & Noodles",
  "Combos",
  "Quick Bites",
  "Beverages",
  "Desserts",
];

export const menu: MenuItem[] = [
  // ---- Starters ----
  { category: "Starters", veg: true, name: "Sweet Corn Soup", desc: "Gentle warmth, creamy and comforting.", price: "₹119", image: img("1547592166-23ac45744acd", 900) },
  { category: "Starters", veg: true, name: "Hot & Sour Soup", desc: "Tangy spice with a lively kick.", price: "₹119", image: img("1547592166-23ac45744acd", 900) },
  { category: "Starters", veg: true, name: "Cottage Cheese in Hot Basil Sauce", desc: "Silken paneer kissed with basil heat.", price: "₹199", image: img("1631452180519-c014fe946bc7", 900) },
  { category: "Starters", veg: true, name: "Stir Fried Vegetable", desc: "Garden freshness, wok-tossed to perfection.", price: "₹149", image: img("1625944230945-1b7dd3b949ab", 900) },
  { category: "Starters", veg: true, name: "Veg Manchurian", desc: "Saucy Indo-Chinese indulgence.", price: "₹149", image: img("1596797038530-2c107229654b", 900) },
  { category: "Starters", veg: true, name: "Paneer 65", desc: "Legendary South Indian spice burst.", price: "₹199", image: img("1631452180519-c014fe946bc7", 900) },
  { category: "Starters", veg: true, name: "Honey Chilly Potato", desc: "Crisp golden bites glazed with sweet spice.", price: "₹249", image: img("1630384060421-cb20d0e0649d", 900) },
  { category: "Starters", veg: true, name: "Crispy Veg", desc: "Golden crunch, delicately seasoned.", price: "₹249", image: img("1606491956689-2ea866880c84", 900) },
  { category: "Starters", veg: false, name: "Chicken Clear Soup", desc: "Light broth, delicate and nourishing.", price: "₹149", image: img("1547592166-23ac45744acd", 900) },
  { category: "Starters", veg: false, name: "Hot & Sour Soup (Chicken)", desc: "Tangy spice with a hearty chicken twist.", price: "₹149", image: img("1547592166-23ac45744acd", 900) },
  { category: "Starters", veg: false, name: "Crispy Chicken", desc: "Crunch outside, tender inside.", price: "₹249", image: img("1562967914-608f82629710", 900) },
  { category: "Starters", veg: false, name: "Chicken Manchurian", desc: "Classic Indo-Chinese comfort.", price: "₹249", image: img("1603894584373-5ac82b2ae398", 900) },
  { category: "Starters", veg: false, name: "Chicken 65", desc: "Spicy, crispy, legendary.", price: "₹249", image: img("1562967914-608f82629710", 900) },

  // ---- Mains ----
  { category: "Mains", veg: true, name: "Black Pepper Mushroom / Paneer", desc: "Bold pepper warmth with tender texture.", price: "₹249", image: img("1596797038530-2c107229654b", 900) },
  { category: "Mains", veg: true, name: "Chilly Paneer", desc: "Fiery wok magic, vibrant and delicious.", price: "₹249", image: img("1631452180519-c014fe946bc7", 900) },
  { category: "Mains", veg: true, name: "Garlic Basil Special", desc: "Fragrant herbs with a garlicky punch!", price: "₹249", image: img("1625944230945-1b7dd3b949ab", 900) },
  { category: "Mains", veg: false, name: "Black Pepper Chicken", desc: "Juicy bites with a peppery punch.", price: "₹249", image: img("1544025162-d76694265947", 900) },
  { category: "Mains", veg: false, name: "Chilly Chicken / Fish / Prawn", desc: "Fiery wok magic, bursting with flavor.", price: "₹299 / 349 / 399", image: img("1603894584373-5ac82b2ae398", 900) },
  { category: "Mains", veg: false, name: "Garlic Basil Special (Chicken)", desc: "Fragrant herbs with a garlicky punch.", price: "₹349", image: img("1603894584373-5ac82b2ae398", 900) },
  { category: "Mains", veg: false, name: "Kung Pao (Chicken)", desc: "Nutty, spicy, and irresistible.", price: "₹349", image: img("1603894584373-5ac82b2ae398", 900) },
  { category: "Mains", veg: false, name: "Lemon Grass Chicken / Prawn", desc: "Zesty lemongrass with smoky paprika.", price: "₹349 / 449", image: img("1559737558-2f5a35f4523b", 900) },
  { category: "Mains", veg: false, name: "Thai Basil Chicken / Fish / Prawn", desc: "Aromatic Thai flavors, rich and balanced.", price: "₹349 / 399 / 449", image: img("1614777986387-015c2a89b696", 900) },
  { category: "Mains", veg: false, name: "Ginger Soya Chicken", desc: "Earthy soy with a ginger zing.", price: "₹299", image: img("1544025162-d76694265947", 900) },
  { category: "Mains", veg: false, name: "Chicken in Teriyaki Sauce", desc: "Sweet-savory Japanese glaze.", price: "₹349", image: img("1544025162-d76694265947", 900) },

  // ---- Rice & Noodles ----
  { category: "Rice & Noodles", veg: true, name: "Schezwan Rice", desc: "Fiery rice with a wok-tossed twist.", price: "₹249", image: img("1596560548464-f010549b84d7", 900) },
  { category: "Rice & Noodles", veg: true, name: "Chilly Garlic Fried Rice", desc: "Garlic heat meets fluffy grains.", price: "₹249", image: img("1603133872878-684f208fb84b", 900) },
  { category: "Rice & Noodles", veg: true, name: "Hakka Noodles", desc: "Street-style stir-fried perfection.", price: "₹249", image: img("1569718212165-3a8278d5f624", 900) },
  { category: "Rice & Noodles", veg: true, name: "Chilly Garlic Noodles", desc: "Fiery garlic kick in every strand!", price: "₹249", image: img("1626509653291-18d9a934b9db", 900) },
  { category: "Rice & Noodles", veg: true, name: "Schezwan Noodles", desc: "Spicy, smoky, full of punch.", price: "₹249", image: img("1573080496219-bb080dd4f877", 900) },
  { category: "Rice & Noodles", veg: true, name: "Padd Thai Noodles", desc: "Savory, wok-tossed noodles.", price: "₹299", image: img("1573080496219-bb080dd4f877", 900) },
  { category: "Rice & Noodles", veg: false, name: "Schezwan Rice (Chicken)", desc: "Fiery rice with a wok-tossed twist.", price: "₹349", image: img("1557872943-16a5ac26437e", 900) },
  { category: "Rice & Noodles", veg: false, name: "Chilli Garlic Fried Rice (Chicken / Fish / Prawn)", desc: "Spicy garlicky fried rice with a bold kick.", price: "₹399 / 449 / 499", image: img("1603133872878-684f208fb84b", 900) },
  { category: "Rice & Noodles", veg: false, name: "Hakka Noodles (Chicken)", desc: "Street-style stir-fried perfection.", price: "₹349", image: img("1569718212165-3a8278d5f624", 900) },
  { category: "Rice & Noodles", veg: false, name: "Schezwan Noodles (Chicken)", desc: "Spicy, smoky, full of punch.", price: "₹349", image: img("1626509653291-18d9a934b9db", 900) },
  { category: "Rice & Noodles", veg: false, name: "Pad Thai Noodles (Chicken / Prawns)", desc: "Savory, wok-tossed noodles with choice of protein.", price: "₹399 / 499", image: img("1573080496219-bb080dd4f877", 900) },

  // ---- Combos ----
  { category: "Combos", veg: true, name: "Paneer Chilly with Garlic Fried Rice", desc: "Spicy paneer paired with garlicky comfort.", price: "₹349", image: img("1596560548464-f010549b84d7", 900) },
  { category: "Combos", veg: true, name: "Veg Khow Suey with Noodles", desc: "Aromatic curry with noodle harmony.", price: "₹349", image: img("1614777986387-015c2a89b696", 900) },
  { category: "Combos", veg: true, name: "Choice of Red / Green Curry with Rice", desc: "Thai curry bliss, tailored to your taste.", price: "₹349", image: img("1614777986387-015c2a89b696", 900) },
  { category: "Combos", veg: false, name: "Chilli with Garlic Fried Rice (Chicken / Fish / Prawn)", desc: "Spicy, garlicky fried rice with a bold twist.", price: "₹399 / 449 / 499", image: img("1603133872878-684f208fb84b", 900) },
  { category: "Combos", veg: false, name: "Choice of Red / Green Curry Rice (Chicken / Fish / Prawn)", desc: "Aromatic Thai curry with steamed rice.", price: "₹399 / 449 / 499", image: img("1614777986387-015c2a89b696", 900) },

  // ---- Quick Bites ----
  { category: "Quick Bites", veg: true, name: "Fries", desc: "Golden crisp, perfectly seasoned.", price: "₹149", image: img("1518013431117-eb1465fa5752", 900) },
  { category: "Quick Bites", veg: true, name: "Spring Roll", desc: "Delicate wrap with savory filling.", price: "₹149", image: img("1461023058943-07fcbe16d735", 900) },
  { category: "Quick Bites", veg: true, name: "Maggi", desc: "Comfort noodles, homely and nostalgic.", price: "₹99", image: img("1612929633738-8fe44f7ec841", 900) },
  { category: "Quick Bites", veg: true, name: "Momos", desc: "Steamed pockets of flavor.", price: "₹149", image: img("1496116218417-1a781b1c416c", 900) },
  { category: "Quick Bites", veg: true, name: "Grilled Cheese Sandwich", desc: "Warm layers, smoky and satisfying.", price: "₹199", image: img("1528735602780-2552fd46c7af", 900) },
  { category: "Quick Bites", veg: false, name: "Chicken Momos", desc: "Steamed pockets of flavor.", price: "₹199", image: img("1534422298391-e4f8c172dddb", 900) },
  { category: "Quick Bites", veg: false, name: "Chicken Nuggets", desc: "Tender bites, crisp and golden.", price: "₹199", image: img("1606491956689-2ea866880c84", 900) },
  { category: "Quick Bites", veg: false, name: "Grilled Sandwich (Chicken)", desc: "Warm layers, smoky and satisfying.", price: "₹249", image: img("1528735602780-2552fd46c7af", 900) },

  // ---- Beverages ----
  { category: "Beverages", veg: true, name: "Tea", desc: "Classic comfort in a cup.", price: "₹30", image: img("1544787219-7f47ccb76574", 900) },
  { category: "Beverages", veg: true, name: "Coffee (Espresso / Cappuccino / Latte)", desc: "Bold brew, pure energy.", price: "₹99 / 149 / 199", image: img("1509042239860-f550ce710b93", 900) },
  { category: "Beverages", veg: true, name: "Cold Coffee", desc: "Refreshing and chilled.", price: "₹149", image: img("1517701550927-30cf4ba1dba5", 900) },
  { category: "Beverages", veg: true, name: "Milk Shake", desc: "Creamy chill, sweet indulgence.", price: "₹149", image: img("1541658016709-82535e94bc69", 900) },
  { category: "Beverages", veg: true, name: "Fresh Lime Soda with a Twist", desc: "Pure hydration, anytime.", price: "₹99", image: img("1621263764928-df1444c5e859", 900) },
  { category: "Beverages", veg: true, name: "Fruit Juice", desc: "Refreshing fruit, ready to sip.", price: "₹99", image: img("1600271886742-f049cd451bba", 900) },
  { category: "Beverages", veg: true, name: "Packaged Water", desc: "Pure hydration, anytime.", price: "₹20", image: img("1548839140-29a749e1cf4d", 900) },

  // ---- Desserts ----
  { category: "Desserts", veg: true, name: "Walnut Brownie with Vanilla Ice Cream", desc: "Warm brownie meets cool vanilla indulgence.", price: "₹199", image: img("1606313564200-e75d5e30476c", 900) },
  { category: "Desserts", veg: true, name: "Hot Gulab Jamun with Ice Cream", desc: "Warm classic meets creamy chill.", price: "₹149", image: img("1563805042-7684c019e1cb", 900) },
  { category: "Desserts", veg: true, name: "Pancake with Chocolate Syrup & Vanilla Ice Cream", desc: "Sweet stacks with a chocolate drizzle.", price: "₹149", image: img("1567620905732-2d1ec7ab7445", 900) },
];

export const experienceStats = [
  { value: 100, suffix: "%", label: "Fresh Ingredients", sub: "Sourced daily at dawn" },
  { value: 48, suffix: "+", label: "Authentic Recipes", sub: "Passed through generations" },
  { value: 15, suffix: "yrs", label: "Master Chefs", sub: "Wok & flame mastery" },
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
    name: "Karan Kumar",
    role: "Foodie · Pune",
    quote:
      "Absolutely bang on! The Schezwan noodles hit different — smoky, spicy and dangerously addictive. Already planning my next visit.",
    avatar: img("1633332755192-727a05c4013d", 200),
  },
  {
    name: "Nisha Singh",
    role: "Regular Guest",
    quote:
      "Best momos in Undri, hands down! Soft, juicy, and that fiery chutney is chef's kiss. Five stars just aren't enough.",
    avatar: img("1494790108377-be9c29b29330", 200),
  },
  {
    name: "Surbhi",
    role: "Verified Diner",
    quote:
      "Came for the Chilli Paneer, stayed for everything else. Bold flavours, quick service and vibes on point. 10 on 10!",
    avatar: img("1438761681033-6461ffad8d80", 200),
  },
  {
    name: "Siddhant",
    role: "Google Review",
    quote:
      "The Kung Pao chicken is unreal — that perfect punch of nutty and spicy. Portions are generous and every bite slaps.",
    avatar: img("1507003211169-0a1dd7228f2d", 200),
  },
  {
    name: "Lipika",
    role: "Food Blogger",
    quote:
      "From the Pad Thai to the desserts, not a single miss. Cosy spot, warm staff and food that tastes like pure happiness.",
    avatar: img("1544005313-94ddf0286df2", 200),
  },
];

export const gallery = [
  { src: img("1585937421612-70a008356fbe", 1000), span: "row-span-2", alt: "Chilly chicken in a wok" },
  { src: img("1633945274405-b6c8069047b0", 800), span: "", alt: "Schezwan fried rice" },
  { src: img("1517248135467-4c7edcad34c4", 800), span: "", alt: "Restaurant interior" },
  { src: img("1599487488170-d11ec9c172f0", 1000), span: "row-span-2", alt: "Chicken tikka on skewers" },
  { src: img("1414235077428-338989a2e8c0", 800), span: "", alt: "Dining ambience" },
  { src: img("1596797038530-2c107229654b", 800), span: "", alt: "Chilli paneer" },
  { src: img("1509722747041-616f39b57569", 1000), span: "row-span-2", alt: "Steamed momos" },
  { src: img("1551024601-bec78aea704b", 800), span: "", alt: "Dessert plating" },
  { src: img("1544145945-f90425340c7e", 800), span: "", alt: "Signature beverage" },
];
