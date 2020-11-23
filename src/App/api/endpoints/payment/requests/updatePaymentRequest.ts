export interface updatePaymentRequest {
    id: number;
    title: string;
    description: string;
    amount: number;
    dueDate: Date;
    isPaid: boolean;
    recipientAccountNumber: string;
}