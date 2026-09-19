import { Business } from '../models';

// MOCK: Businesses dataset with active commission structures
export const MOCK_BUSINESSES: Business[] = [
    {
        id: 'BUS-101',
        name: 'Gourmet Kitchen & Bistro',
        ownerId: 'USR-002', // FK -> User.id
        commissionRate: 0.15, // 15% platform commission cut
        address: {
            street: '45 Park Avenue, Block C',
            city: 'Mumbai',
            state: 'Maharashtra',
            postalCode: '400051',
            country: 'India'
        },
        phone: '+919876543210',
        status: 'active',
        settledBalance: 14500.00,
        pendingBalance: 3250.00,
        createdAt: '2025-01-10T08:30:00.000Z',
        updatedAt: '2025-02-28T12:00:00.000Z'
    },
    {
        id: 'BUS-102',
        name: 'Fresh Harvest Organics',
        ownerId: 'USR-003', // FK -> User.id
        commissionRate: 0.10, // 10% platform commission cut
        address: {
            street: '12 Farmhouse Lane, Indiranagar',
            city: 'Bengaluru',
            state: 'Karnataka',
            postalCode: '560038',
            country: 'India'
        },
        phone: '+919812345678',
        status: 'active',
        settledBalance: 8900.00,
        pendingBalance: 1850.00,
        createdAt: '2025-01-15T10:15:00.000Z',
        updatedAt: '2025-02-28T14:30:00.000Z'
    }
];
