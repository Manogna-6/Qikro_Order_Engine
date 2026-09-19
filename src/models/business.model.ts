export interface Business {
    id: string; // Primary Key
    name: string;
    ownerId: string; // FK -> User.id
    commissionRate: number; // e.g. 0.15 (15% platform commission cut)
    address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    phone: string;
    status: 'active' | 'suspended';
    settledBalance: number; // Total payout already settled to business
    pendingBalance: number; // Total net payout pending settlement
    createdAt: string; // ISO 8601 string date
    updatedAt: string; // ISO 8601 string date
}
