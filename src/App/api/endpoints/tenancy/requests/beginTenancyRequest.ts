export interface BeginTenancyRequest {
    flatId: number;
    startDate: Date;
    endDate: Date;
    deposit: number;
    roomId: number | null;
    userId: number;

}