export interface createPaymentRequest {
    title: string;
    description: string;
    amount: number;
    dueDate: Date;
    isPaid: boolean;
    recipientAccountNumber: string;
    flatId: number;
    roomId: number | null;
    userId: string;
}