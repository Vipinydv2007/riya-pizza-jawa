/**
 * Riya Pizza Jawa - Data & Configuration File
 * Location: Riya Pizza Jawa, F588+G87, Jawa Rd, Java, Haryana 127310
 * Owner: Nikku
 */

const SHOP_CONFIG = {
  name: "Riya Pizza Jawa",
  ownerName: "Nikku",
  ownerTitle: "Owner: Nikku",
  tagline: "Pizza • Burgers • Fast Food",
  location: "F588+G87, Jawa Rd, Java, Haryana 127310",
  shortLocation: "Jawa Rd, Java, Haryana",
  pincode: "127310",
  
  // Service Availability Flag (Set to false to display Service Paused / Temporarily Closed)
  isServiceAvailable: false,
  serviceUnavailableMessage: "Service is currently paused. We are temporarily not accepting online or phone orders at this time.",
  
  // Phone & WhatsApp details (Phone number hidden / service paused)
  phone: "Service Paused",           // Display phone status
  phoneRaw: "",                       // Raw phone number for tel: links
  whatsappNumber: "",                 // WhatsApp number
  hidePhone: true,                    // Hide phone number across site
  
  // UPI Payment Details
  upiId: "Service Paused",            // Easily editable UPI ID
  upiName: "Riya Pizza Jawa",
  
  // Timing & Delivery details
  openingHours: "Mon - Sun: 11:00 AM - 10:30 PM",
  deliveryAreas: "Java (Jawa), Charkhi Dadri & nearby areas",
  minDeliveryOrder: 250,               // In ₹
  deliveryFee: 20,                     // In ₹
  freeDeliveryThreshold: 400,          // Free delivery on orders above ₹400
  
  // Social Media & Location Links
  socials: {
    instagram: "https://instagram.com/riyapizzajawa",
    facebook: "https://facebook.com/riyapizzajawa",
    whatsapp: "#",
    maps: "https://www.google.com/maps/search/?api=1&query=Riya+Pizza+Jawa+F588%2BG87+Jawa+Rd+Java+Haryana+127310"
  },
  
  // Embedded Google Map coordinates / Plus code search URL
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14034.423984534135!2d76.2624194!3d28.5815617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d40e11fb62725%3A0xb3cf516104e4c278!2sCharkhi%20Dadri%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
};

const MENU_CATEGORIES = [
  { id: "all", label: "All Items", icon: "✨" },
  { id: "pizza", label: "Pizza (Starting ₹250)", icon: "🍕" },
  { id: "burger", label: "Burgers (Starting ₹60)", icon: "🍔" },
  { id: "sides", label: "Sides & Fries", icon: "🍟" },
  { id: "beverages", label: "Cold Drinks & Mojito", icon: "🥤" }
];

const MENU_ITEMS = [
  // 🍕 PIZZAS (Starting at ₹250 and above)
  {
    id: "p1",
    name: "Margherita Pizza",
    category: "pizza",
    price: 250,
    priceLabel: "₹250",
    description: "Classic blend of rich tomato sauce, melted 100% mozzarella cheese & fresh basil herbs.",
    badge: "Starting Range",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p2",
    name: "Cheese Pizza (Double Cheese)",
    category: "pizza",
    price: 270,
    priceLabel: "₹270",
    description: "Double loaded liquid mozzarella cheese pool on a crispy hand-tossed fresh crust.",
    badge: "Extra Cheesy",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p3",
    name: "Corn & Cheese Pizza",
    category: "pizza",
    price: 280,
    priceLabel: "₹280",
    description: "Golden sweet corn smothered under thick layers of melted cream mozzarella cheese.",
    badge: "Popular",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p4",
    name: "Veggie Delight Pizza",
    category: "pizza",
    price: 290,
    priceLabel: "₹290",
    description: "Crispy capsicum, juicy tomatoes, sweet corn, and sliced onions with herb seasoning.",
    badge: "Bestseller",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p5",
    name: "Farmhouse Pizza",
    category: "pizza",
    price: 320,
    priceLabel: "₹320",
    description: "Delightful combination of mushroom, capsicum, tomato, onion and rich mozzarella.",
    badge: "Must Try",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p6",
    name: "Paneer Tikka Pizza",
    category: "pizza",
    price: 350,
    priceLabel: "₹350",
    description: "Soft marinated paneer cubes, spicy red paprika, onions, green pepper & extra cheese.",
    badge: "Chef Special",
    isVeg: true,
    image: "assets/images/special_pizza.jpg"
  },
  {
    id: "p7",
    name: "Special Riya Pizza",
    category: "pizza",
    price: 390,
    priceLabel: "₹390",
    description: "Our signature pizza loaded with paneer tikka, sweet corn, black olives, jalapeños & extra cheese.",
    badge: "Signature",
    isVeg: true,
    image: "assets/images/special_pizza.jpg"
  },

  // 🍔 BURGERS (Starting at ₹60)
  {
    id: "b1",
    name: "Veg Crisp Burger",
    category: "burger",
    price: 60,
    priceLabel: "₹60",
    description: "Golden crispy vegetable patty with fresh lettuce, cucumber, tomato & mayo in soft toasted buns.",
    badge: "Starting @ ₹60",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "b2",
    name: "Cheese Burger",
    category: "burger",
    price: 80,
    priceLabel: "₹80",
    description: "Crunchy veg patty topped with a slice of melted Cheddar cheese & tangy house sauce.",
    badge: "Bestseller",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "b3",
    name: "Paneer Burger",
    category: "burger",
    price: 100,
    priceLabel: "₹100",
    description: "Spicy crisp paneer patty, creamy tandoori sauce, onions & crisp veggies.",
    badge: "Popular",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "b4",
    name: "Double Cheese Burger",
    category: "burger",
    price: 130,
    priceLabel: "₹130",
    description: "Double crispy patties, double cheese slices, caramelized onions & secret special burger mayo.",
    badge: "Heavy Bite",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80"
  },

  // 🍟 SIDES & FRIES
  {
    id: "s1",
    name: "Classic French Fries",
    category: "sides",
    price: 80,
    priceLabel: "₹80",
    description: "Crispy golden salty potato fries cooked to perfection, served with ketchup dip.",
    badge: null,
    isVeg: true,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "s2",
    name: "Peri Peri Fries",
    category: "sides",
    price: 100,
    priceLabel: "₹100",
    description: "Golden fries tossed in spicy African Peri Peri seasoning. Hot, crispy & delicious!",
    badge: "Hot & Spicy",
    isVeg: true,
    image: "assets/images/peri_peri_fries.jpg"
  },
  {
    id: "s3",
    name: "Veg Grilled Sandwich",
    category: "sides",
    price: 80,
    priceLabel: "₹80",
    description: "Grilled jumbo bread stuffed with potato masala, onions, cucumber & spicy mint chutney.",
    badge: null,
    isVeg: true,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
  },

  // 🥤 BEVERAGES (AT MRP)
  {
    id: "v1",
    name: "Cold Drink (500ml)",
    category: "beverages",
    price: 40,
    priceLabel: "At MRP (₹40)",
    description: "Chilled Coca Cola, Thums Up, Sprite, or Fanta bottle strictly at official MRP rate.",
    badge: "At MRP",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "v2",
    name: "Virgin Mojito Cooler",
    category: "beverages",
    price: 80,
    priceLabel: "₹80",
    description: "Refreshing cooler with crushed mint, fresh lime juice, ice, and sparkling fizzy soda.",
    badge: "Refreshing",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "v3",
    name: "Fresh Lime Soda",
    category: "beverages",
    price: 60,
    priceLabel: "₹60",
    description: "Sweet or salted fresh squeezed lime juice infused with chilled fizzy soda.",
    badge: null,
    isVeg: true,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "v4",
    name: "Mineral Water Bottle (1L)",
    category: "beverages",
    price: 20,
    priceLabel: "At MRP (₹20)",
    description: "Chilled pure packaged mineral water bottle strictly at official MRP rate.",
    badge: "At MRP",
    isVeg: true,
    image: "assets/images/mineral_water.jpg"
  }
];

const SPECIAL_OFFERS = [
  {
    id: "o1",
    title: "Pizza + Cold Drink Combo",
    tag: "SAVE ₹30",
    description: "1 Medium Veggie Delight Pizza + 1 Chilled Cold Drink (At MRP)",
    originalPrice: 330,
    offerPrice: 299,
    items: ["Veggie Delight Pizza", "Cold Drink"],
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "o2",
    title: "Burger + Peri Peri Fries Combo",
    tag: "POPULAR",
    description: "1 Cheese Burger + 1 Crispy Peri Peri Fries + Dip",
    originalPrice: 180,
    offerPrice: 159,
    items: ["Cheese Burger", "Peri Peri Fries"],
    image: "assets/images/peri_peri_fries.jpg"
  },
  {
    id: "o3",
    title: "Family Pizza Feast Combo",
    tag: "BEST VALUE",
    description: "2 Medium Pizzas (Farmhouse & Paneer Tikka) + 2 Cold Drinks (At MRP)",
    originalPrice: 750,
    offerPrice: 649,
    items: ["Farmhouse Pizza", "Paneer Tikka Pizza", "2x Cold Drink"],
    image: "assets/images/combo.jpg"
  },
  {
    id: "o4",
    title: "Special Weekend Deal",
    tag: "SPECIAL DEAL",
    description: "1 Special Riya Pizza + 1 Double Cheese Burger + Peri Peri Fries",
    originalPrice: 620,
    offerPrice: 529,
    items: ["Special Riya Pizza", "Double Cheese Burger", "Peri Peri Fries"],
    image: "assets/images/hero.jpg"
  }
];

const REVIEWS = [
  {
    id: "r1",
    name: "Vikram Sheoran",
    role: "Local Resident, Java (Jawa)",
    rating: 5,
    comment: "Riya Pizza Jawa is the best food spot on Jawa Road! The Special Riya Pizza starting at ₹250+ is loaded with cheese and paneer.",
    date: "2 days ago"
  },
  {
    id: "r2",
    name: "Pooja Sangwan",
    role: "Student, Java, Haryana",
    rating: 5,
    comment: "Regularly order Cheese Burger (₹80) and Peri Peri Fries from Nikku at Riya Pizza Jawa. Fast service and clean food!",
    date: "1 week ago"
  },
  {
    id: "r3",
    name: "Amit Kumar",
    role: "Family Customer",
    rating: 5,
    comment: "Ordered Family Combo for weekend party. Soft crust, heavy cheese, and great taste!",
    date: "2 weeks ago"
  },
  {
    id: "r4",
    name: "Rahul Verma",
    role: "Youth Customer, Java",
    rating: 5,
    comment: "Riya Pizza Jawa at F588+G87 Jawa Rd is our favorite hangout spot. Paneer Tikka Pizza and Virgin Mojito are 10/10!",
    date: "3 weeks ago"
  }
];
