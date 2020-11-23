export interface getFlatPaymentsResponse {
    id: number;
    title: string;
    description: string;
    amount: number;
    createdAt: Date;
    dueDate: Date;
    isPaid: boolean;
    recipientAccountNumber: string;
    user: userForGetFlatPaymentsResponse;
}

export interface userForGetFlatPaymentsResponse {
    id: string;
    firstName: string;
    lastName: string;
    searchId: string;
}
