import { updatePaymentRequest } from './requests/updatePaymentRequest';
import { createPaymentRequest } from './requests/createPaymentRequest';
import { getFlatPaymentsResponse } from './responses/getFlatPaymentsResponse';
import { requests } from 'App/api/agent/agent';
import { getTenantPaymentsResponse } from './responses/getTenantPaymentsResponse';
import { HttpStatusCodeResponse } from 'App/types/httpResponse';
export const PaymentApi = {
    getFlatPayments: (flatId: number): Promise<getFlatPaymentsResponse[]> =>
        requests.get(`/payment/${flatId}`),

    getTenantPayments: (): Promise<getTenantPaymentsResponse[]> =>
        requests.get(`/payment`),

    createPayment: (body: createPaymentRequest): Promise<HttpStatusCodeResponse> =>
        requests.post(`/payment`, body),

    updatePayment: (body: updatePaymentRequest): Promise<HttpStatusCodeResponse> =>
        requests.put(`/payment`, body),

    deletePayment: (paymentId: number): Promise<HttpStatusCodeResponse> => 
        requests.delete(`/payment/${paymentId}`)

}