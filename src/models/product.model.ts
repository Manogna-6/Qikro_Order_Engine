export interface Product {
    id: string; // Primary Key
    businessId: string; // FK -> Business.id
    name: string;
    description: string;
    price: number; // Currency amount
    sku: string;
    stock: number;
    category: string;
    imageUrl?: string;
    createdAt: string; // ISO 8601 string date
}
