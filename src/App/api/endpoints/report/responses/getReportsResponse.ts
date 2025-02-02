import { ICollectionResponse } from 'App/types/pagination/pagination';
export interface GetReportsResponse extends ICollectionResponse<ReportForGetReportsResponse> {}

export interface ReportForGetReportsResponse {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    type: string;
    flatDescription: string;
    senderFirstName: string;
    senderLastName: string;
}