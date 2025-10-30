import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Experience from '../models/Experience';
import PromoCode from '../models/PromoCode';
import connectDB from '../config/database';

dotenv.config();

const experiences = [
  {
    title: 'Sunset Sailing in Goa',
    description: 'Experience the magic of a Goan sunset aboard a luxury yacht. Cruise along the pristine coastline, enjoy refreshments, and witness the sky painted in hues of orange and pink. Perfect for couples and photography enthusiasts.',
    location: 'Goa, India',
    category: 'Water Sports',
    duration: '3 hours',
    rating: 4.8,
    reviewCount: 234,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800'
    ],
    highlights: [
      'Professional skipper and crew',
      'Stunning sunset views',
      'Complimentary refreshments',
      'Photo opportunities'
    ],
    included: [
      'Yacht rental',
      'Safety equipment',
      'Refreshments and snacks',
      'Professional guide'
    ],
    notIncluded: [
      'Hotel pickup and drop',
      'Alcoholic beverages',
      'Gratuities'
    ],
    basePrice: 2500,
    slots: [
      {
        date: new Date('2024-12-15'),
        startTime: '17:00',
        endTime: '20:00',
        availableSpots: 8,
        totalSpots: 12,
        price: 2500
      },
      {
        date: new Date('2024-12-16'),
        startTime: '17:00',
        endTime: '20:00',
        availableSpots: 12,
        totalSpots: 12,
        price: 2500
      },
      {
        date: new Date('2024-12-17'),
        startTime: '17:00',
        endTime: '20:00',
        availableSpots: 10,
        totalSpots: 12,
        price: 2500
      },
      {
        date: new Date('2024-12-18'),
        startTime: '17:00',
        endTime: '20:00',
        availableSpots: 12,
        totalSpots: 12,
        price: 2800
      }
    ]
  },
  {
    title: 'Himalayan Trekking Adventure',
    description: 'Embark on an unforgettable journey through the majestic Himalayas. Trek through scenic trails, witness breathtaking mountain views, and experience local culture. Suitable for intermediate trekkers.',
    location: 'Manali, Himachal Pradesh',
    category: 'Adventure',
    duration: '2 days',
    rating: 4.9,
    reviewCount: 187,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800'
    ],
    highlights: [
      'Experienced trek leader',
      'Mountain camping',
      'Local cuisine',
      'Scenic photography spots'
    ],
    included: [
      'Trekking guide',
      'Camping equipment',
      'All meals during trek',
      'First aid kit'
    ],
    notIncluded: [
      'Travel to base camp',
      'Personal trekking gear',
      'Travel insurance'
    ],
    basePrice: 4500,
    slots: [
      {
        date: new Date('2024-12-20'),
        startTime: '06:00',
        endTime: '18:00',
        availableSpots: 6,
        totalSpots: 10,
        price: 4500
      },
      {
        date: new Date('2024-12-22'),
        startTime: '06:00',
        endTime: '18:00',
        availableSpots: 10,
        totalSpots: 10,
        price: 4500
      },
      {
        date: new Date('2024-12-25'),
        startTime: '06:00',
        endTime: '18:00',
        availableSpots: 8,
        totalSpots: 10,
        price: 5000
      }
    ]
  },
  {
    title: 'Jaipur Heritage Walking Tour',
    description: 'Discover the rich history and vibrant culture of the Pink City. Walk through ancient streets, visit magnificent palaces, and taste authentic Rajasthani cuisine. Perfect for history buffs and culture enthusiasts.',
    location: 'Jaipur, Rajasthan',
    category: 'Cultural',
    duration: '4 hours',
    rating: 4.7,
    reviewCount: 312,
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800'
    ],
    highlights: [
      'Expert local guide',
      'Visit 5+ heritage sites',
      'Traditional food tasting',
      'Small group experience'
    ],
    included: [
      'Professional guide',
      'Entry fees to monuments',
      'Food tasting',
      'Bottled water'
    ],
    notIncluded: [
      'Hotel transfers',
      'Additional food and drinks',
      'Shopping expenses'
    ],
    basePrice: 1200,
    slots: [
      {
        date: new Date('2024-12-14'),
        startTime: '09:00',
        endTime: '13:00',
        availableSpots: 15,
        totalSpots: 20,
        price: 1200
      },
      {
        date: new Date('2024-12-14'),
        startTime: '14:00',
        endTime: '18:00',
        availableSpots: 18,
        totalSpots: 20,
        price: 1200
      },
      {
        date: new Date('2024-12-15'),
        startTime: '09:00',
        endTime: '13:00',
        availableSpots: 12,
        totalSpots: 20,
        price: 1200
      },
      {
        date: new Date('2024-12-16'),
        startTime: '09:00',
        endTime: '13:00',
        availableSpots: 20,
        totalSpots: 20,
        price: 1200
      }
    ]
  },
  {
    title: 'Kerala Backwater Houseboat Cruise',
    description: 'Glide through the serene backwaters of Kerala on a traditional houseboat. Enjoy authentic Kerala cuisine, witness village life, and relax in the lap of nature. An experience of a lifetime.',
    location: 'Alleppey, Kerala',
    category: 'Nature',
    duration: '1 day',
    rating: 4.9,
    reviewCount: 456,
    images: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    highlights: [
      'Traditional Kerala houseboat',
      'Authentic Kerala meals',
      'Village sightseeing',
      'Peaceful backwater views'
    ],
    included: [
      'Houseboat rental',
      'All meals (breakfast, lunch, dinner)',
      'Crew services',
      'Sightseeing'
    ],
    notIncluded: [
      'Transportation to Alleppey',
      'Beverages',
      'Personal expenses'
    ],
    basePrice: 6000,
    slots: [
      {
        date: new Date('2024-12-19'),
        startTime: '12:00',
        endTime: '09:00',
        availableSpots: 4,
        totalSpots: 6,
        price: 6000
      },
      {
        date: new Date('2024-12-21'),
        startTime: '12:00',
        endTime: '09:00',
        availableSpots: 6,
        totalSpots: 6,
        price: 6000
      },
      {
        date: new Date('2024-12-23'),
        startTime: '12:00',
        endTime: '09:00',
        availableSpots: 5,
        totalSpots: 6,
        price: 6500
      }
    ]
  },
  {
    title: 'Mumbai Street Food Tour',
    description: 'Taste the flavors of Mumbai with our guided street food tour. Sample iconic dishes like vada pav, pav bhaji, and bhel puri while exploring the bustling streets of the city that never sleeps.',
    location: 'Mumbai, Maharashtra',
    category: 'Food & Drink',
    duration: '3 hours',
    rating: 4.6,
    reviewCount: 523,
    images: [
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800'
    ],
    highlights: [
      'Visit 8+ food stalls',
      'Expert food guide',
      'Taste 12+ dishes',
      'Learn food history'
    ],
    included: [
      'Food guide',
      'All food tastings',
      'Bottled water',
      'Food safety assured'
    ],
    notIncluded: [
      'Hotel pickup',
      'Additional food purchases',
      'Tips'
    ],
    basePrice: 800,
    slots: [
      {
        date: new Date('2024-12-14'),
        startTime: '18:00',
        endTime: '21:00',
        availableSpots: 10,
        totalSpots: 15,
        price: 800
      },
      {
        date: new Date('2024-12-15'),
        startTime: '18:00',
        endTime: '21:00',
        availableSpots: 15,
        totalSpots: 15,
        price: 800
      },
      {
        date: new Date('2024-12-16'),
        startTime: '18:00',
        endTime: '21:00',
        availableSpots: 12,
        totalSpots: 15,
        price: 800
      },
      {
        date: new Date('2024-12-17'),
        startTime: '18:00',
        endTime: '21:00',
        availableSpots: 15,
        totalSpots: 15,
        price: 800
      }
    ]
  },
  {
    title: 'Rishikesh River Rafting',
    description: 'Experience the thrill of white water rafting in the holy city of Rishikesh. Navigate through rapids, enjoy cliff jumping, and take in the stunning Himalayan scenery. Perfect for adventure seekers.',
    location: 'Rishikesh, Uttarakhand',
    category: 'Adventure',
    duration: '5 hours',
    rating: 4.8,
    reviewCount: 389,
    images: [
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800',
      'https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?w=800'
    ],
    highlights: [
      'Grade 2-3 rapids',
      'Professional instructors',
      'Safety equipment provided',
      'Cliff jumping optional'
    ],
    included: [
      'Rafting equipment',
      'Life jackets and helmets',
      'Professional guide',
      'Safety briefing'
    ],
    notIncluded: [
      'Transportation',
      'Meals',
      'Video/photos',
      'Insurance'
    ],
    basePrice: 1500,
    slots: [
      {
        date: new Date('2024-12-18'),
        startTime: '09:00',
        endTime: '14:00',
        availableSpots: 20,
        totalSpots: 24,
        price: 1500
      },
      {
        date: new Date('2024-12-19'),
        startTime: '09:00',
        endTime: '14:00',
        availableSpots: 24,
        totalSpots: 24,
        price: 1500
      },
      {
        date: new Date('2024-12-20'),
        startTime: '09:00',
        endTime: '14:00',
        availableSpots: 18,
        totalSpots: 24,
        price: 1500
      }
    ]
  }
];

const promoCodes = [
  {
    code: 'SAVE10',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 1000,
    maxDiscount: 500,
    isActive: true
  },
  {
    code: 'FLAT100',
    discountType: 'fixed',
    discountValue: 100,
    minPurchase: 500,
    isActive: true
  },
  {
    code: 'FIRST20',
    discountType: 'percentage',
    discountValue: 20,
    minPurchase: 2000,
    maxDiscount: 1000,
    isActive: true
  },
  {
    code: 'WELCOME',
    discountType: 'fixed',
    discountValue: 200,
    minPurchase: 1500,
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Experience.deleteMany({});
    await PromoCode.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Insert experiences
    await Experience.insertMany(experiences);
    console.log('✅ Experiences seeded successfully');

    // Insert promo codes
    await PromoCode.insertMany(promoCodes);
    console.log('✅ Promo codes seeded successfully');

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
