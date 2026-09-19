import { Payment } from '../../models';

export interface IPaymentService {
    getPaymentByOrderId(orderId: string): Promise<Payment>;
    getAllPayments(): Promise<Payment[]>;
}
