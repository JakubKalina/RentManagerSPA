import { IPageQueryParams } from 'App/types/pagination/pagination';
export interface GetFlatReportsRequest extends IPageQueryParams {
    flatId: number;
}