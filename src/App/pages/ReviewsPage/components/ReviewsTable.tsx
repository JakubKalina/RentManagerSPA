

import { ReviewForGetUserReviewsResponse } from 'App/api/endpoints/review/responses/getUserReviewsResponse';
import { Rate } from 'antd';
import React from 'react';

export const renderReviewsTableColumns = (reviews: ReviewForGetUserReviewsResponse[]) => [
	//{ title: 'Ocena', dataIndex: 'rate' },
	{
		title: 'Ocena',
		render: (record: ReviewForGetUserReviewsResponse) => (
			<div>
							<Rate disabled defaultValue={record.rate} />
			</div>
		)

	},
	{ title: 'Opis', dataIndex: 'description' },
];
