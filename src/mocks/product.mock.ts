import { Product } from '../models';

// MOCK: Products dataset per business
export const MOCK_PRODUCTS: Product[] = [
    // BUS-101 Products
    {
        id: 'PRD-101',
        businessId: 'BUS-101', // FK -> Business.id
        name: 'Artisan Woodfired Truffle Pizza',
        description: 'Fresh mozzarella, wild mushrooms, white truffle oil, and fresh basil on sourdough crust.',
        price: 650.00,
        sku: 'GK-TRF-001',
        stock: 45,
        category: 'Italian & Pizza',
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
        createdAt: '2025-01-11T09:00:00.000Z'
    },
    {
        id: 'PRD-102',
        businessId: 'BUS-101', // FK -> Business.id
        name: 'Smoked Salmon Risotto',
        description: 'Arborio rice cooked in seafood bisque topped with Norwegian smoked salmon and dill.',
        price: 820.00,
        sku: 'GK-RST-002',
        stock: 20,
        category: 'Gourmet Mains',
        imageUrl: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=400&q=80',
        createdAt: '2025-01-11T09:15:00.000Z'
    },
    {
        id: 'PRD-103',
        businessId: 'BUS-101', // FK -> Business.id
        name: 'Sparkling Hibiscus Kombucha (500ml)',
        description: 'Raw probiotic fermented tea brewed with organic hibiscus flowers and ginger.',
        price: 180.00,
        sku: 'GK-KMB-003',
        stock: 120,
        category: 'Beverages',
        imageUrl: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=400&q=80',
        createdAt: '2025-01-12T10:00:00.000Z'
    },

    // BUS-102 Products
    {
        id: 'PRD-201',
        businessId: 'BUS-102', // FK -> Business.id
        name: 'Hass Avocados Organic Pack (1kg)',
        description: 'Ready-to-eat organic Hass avocados imported directly from certified organic orchards.',
        price: 490.00,
        sku: 'FH-AVO-101',
        stock: 60,
        category: 'Fresh Produce',
        imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=400&q=80',
        createdAt: '2025-01-16T11:00:00.000Z'
    },
    {
        id: 'PRD-202',
        businessId: 'BUS-102', // FK -> Business.id
        name: 'Raw Cold-Pressed Almond Milk (1L)',
        description: '100% pure unsweetened almond milk made daily without preservatives or fillers.',
        price: 320.00,
        sku: 'FH-ALK-102',
        stock: 35,
        category: 'Dairy Alternatives',
        imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',
        createdAt: '2025-01-16T11:30:00.000Z'
    },
    {
        id: 'PRD-203',
        businessId: 'BUS-102', // FK -> Business.id
        name: 'Organic Hydroponic Strawberries (250g)',
        description: 'Pesticide-free sweet hydroponic strawberries packed in eco-friendly biodegradable punnets.',
        price: 250.00,
        sku: 'FH-STR-103',
        stock: 40,
        category: 'Fresh Produce',
        imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=400&q=80',
        createdAt: '2025-01-17T09:45:00.000Z'
    }
];
