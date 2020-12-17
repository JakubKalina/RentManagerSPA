import React from "react";
import { Row, Card, Button } from "antd";
import { Link } from "react-router-dom";
import './TenantPageContainer.less';


const TenantPageContainer: React.FC<{}> = () => {
    return(
		<div className='home--container'>

				<Row align='middle' justify='center'>
				<Card title="System zarządzania najmem" className='home--container--card'>
					<Card.Grid hoverable={false} style={{width: '100%', textAlign: "center"}}>
						<p>
                            Panel najemcy
						</p>
					</Card.Grid>
					<Card.Grid style={{width: '50%', textAlign: "center"}}>  
						<Link to='/tenant/flats'>
							<Button type="primary">Mieszkania</Button>
						</Link>
					</Card.Grid>
					<Card.Grid style={{width: '50%', textAlign: "center"}}>
						<Link to='/tenant/messages'>
					    	<Button type="primary">Wiadomości</Button>
						</Link>
					</Card.Grid>
				</Card>

				</Row>
		</div>
    )
};

export default TenantPageContainer;