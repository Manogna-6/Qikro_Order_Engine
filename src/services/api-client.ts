/**
 * API Contract Layer & Client Barrel Export
 * 
 * ARCHITECTURE NOTE:
 * This single barrel export (`api`) is the ONLY import path UI code (components & screens) uses to consume services.
 * When migrating to a production backend, only the service bindings in this file are swapped for real HTTP implementations.
 * Zero UI components or screen files will need to be touched.
 */
import { IAuthService, IOrderService, IPaymentService, IDeliveryService, IInventoryService } from './interfaces';
import { mockAuthService, mockOrderService, mockPaymentService, mockDeliveryService, mockInventoryService } from './mock-impl';

export interface ApiClient {
    auth: IAuthService;
    orders: IOrderService;
    payments: IPaymentService;
    deliveries: IDeliveryService;
    inventory: IInventoryService;
}

export const api: ApiClient = {
    auth: mockAuthService,
    orders: mockOrderService,
    payments: mockPaymentService,
    deliveries: mockDeliveryService,
    inventory: mockInventoryService
};
