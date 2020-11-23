export interface getTenantPaymentsResponse {
    id: number;
    title: string;
    description: string;
    amount: number;
    createdAt: Date;
    dueDate: Date;
    isPaid: boolean;
    recipientAccountNumber: string;
    flat: flatForGetTenantPaymentsResponse;
    user: userForGetTenantPaymentsResponse;
}

export interface flatForGetTenantPaymentsResponse {
    id: number;
    description: string;
}

export interface userForGetTenantPaymentsResponse {
    id: string;
    firstName: string;
    lastName: string;
    searchId: string;
}