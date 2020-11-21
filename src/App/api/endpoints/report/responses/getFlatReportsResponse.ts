import { ICollectionResponse } from 'App/types/pagination/pagination';
export interface GetFlatReportsResponse extends ICollectionResponse<ReportForGetFlatReportsResponse> {
    flatId: number;
}

export interface ReportForGetFlatReportsResponse {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    type: string;
    //flatId: number;
    senderId: string;
    senderFirstName: string;
    senderLastName: string;
}