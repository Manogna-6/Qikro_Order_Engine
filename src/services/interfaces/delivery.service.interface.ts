import { Delivery } from '../../models';

export interface IDeliveryService {
    getDeliveryByOrderId(orderId: string): Promise<Delivery>;
}
