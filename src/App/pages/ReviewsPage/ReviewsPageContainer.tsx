import React from "react";
import { RouteComponentProps } from "react-router";

interface RouteParams {
	userId: string;
}

interface ReviewsPageContainerProps extends RouteComponentProps<RouteParams> {}


const ReviewsPageContainer: React.FC<ReviewsPageContainerProps> = ({ match}: ReviewsPageContainerProps) => {

    const userId = match.params.userId;

    return (
        <div>
            <h1>Strona z opiniami o użytrkownku {userId}</h1>
            
        </div>
    );
};

export default ReviewsPageContainer;