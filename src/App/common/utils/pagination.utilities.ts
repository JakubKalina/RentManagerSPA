import { IPageQueryParams } from 'App/types/pagination/pagination';

export const defaultPageQueryParams: IPageQueryParams = {
	orderBy: null,
	pageNumber: 1,
	pageSize: 10,
	query: ''
};


export const onPaginationChange = (
	previousPageQueryParams: IPageQueryParams,
	dispatchCallback: (newPageQueryParams: IPageQueryParams) => void
) => {
	let newPageQueryParams = { ...previousPageQueryParams };
	return (page: number, pageSize: number) => {
		newPageQueryParams.pageNumber = page;
		newPageQueryParams.pageSize = pageSize;
		dispatchCallback(newPageQueryParams);
	};
};
