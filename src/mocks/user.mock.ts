import { User } from '../models';

// MOCK: Realistic pre-configured user directory for development and testing
export const MOCK_USERS: User[] = [
    {
        id: 'USR-001',
        phone: '+919999999999',
        name: 'Aarav Sharma (Admin)',
        email: 'admin@platform.com',
        role: 'admin',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z'
    },
    {
        id: 'USR-002',
        phone: '+919876543210',
        name: 'Rajesh Kumar (Merchant - Gourmet Bistro)',
        email: 'rajesh@gourmetbistro.com',
        role: 'business_owner',
        businessId: 'BUS-101', // FK -> Business.id
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        createdAt: '2025-01-10T08:30:00.000Z',
        updatedAt: '2025-01-10T08:30:00.000Z'
    },
    {
        id: 'USR-003',
        phone: '+919812345678',
        name: 'Anita Verma (Merchant - Fresh Organics)',
        email: 'anita@freshorganics.com',
        role: 'business_owner',
        businessId: 'BUS-102', // FK -> Business.id
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        createdAt: '2025-01-15T10:15:00.000Z',
        updatedAt: '2025-01-15T10:15:00.000Z'
    },
    {
        id: 'USR-004',
        phone: '+919123456789',
        name: 'Priya Mehta (Customer)',
        email: 'priya.mehta@gmail.com',
        role: 'customer',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
        createdAt: '2025-02-01T14:20:00.000Z',
        updatedAt: '2025-02-01T14:20:00.000Z'
    },
    {
        id: 'USR-005',
        phone: '+919555443322',
        name: 'Vikram Patel (Customer)',
        email: 'vikram.patel@yahoo.com',
        role: 'customer',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        createdAt: '2025-02-05T11:45:00.000Z',
        updatedAt: '2025-02-05T11:45:00.000Z'
    }
];
