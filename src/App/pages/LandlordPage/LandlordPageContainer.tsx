import React from "react";
import Card from "antd/lib/card";
import { Row, Button } from "antd";
import { Link } from "react-router-dom";
import './LandlordPageContainer.less';

const LandlordPageContainer: React.FC<{}> = () => {

    return (
		<div className='home--container'>

				<Row align='middle' justify='center'>
				<Card title="System zarządzania najmem" className='home--container--card'>
					<Card.Grid hoverable={false} style={{width: '100%', textAlign: "center"}}>
						<p>
                            Panel zarządcy
						</p>
					</Card.Grid>
					<Card.Grid style={{width: '50%', textAlign: "center"}}>  
						<Link to='/landlord/flats'>
							<Button type="primary">Mieszkania</Button>
						</Link>
					</Card.Grid>
					<Card.Grid style={{width: '50%', textAlign: "center"}}>
						<Link to='/landlord/messages'>
					    	<Button type="primary">Wiadomości</Button>
						</Link>
					</Card.Grid>
				</Card>

				</Row>
		</div>
    );
};

export default LandlordPageContainer;