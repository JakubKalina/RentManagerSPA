import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import ProtectedRoute from './common/components/ProtectedRoute';
import { default as NotFoundPage } from './pages/NotFoundPage/NotFoundPageContainer';
import { default as HomePage } from './pages/HomePage/HomePageContainer';
import { default as LoginPage } from './pages/LoginPage/LoginPageContainer';
import { default as RegisterPage } from './pages/RegisterPage/RegiserPageContainer';
import { default as AuthPage } from './pages/AuthPage/AuthPageContainer';
import { default as AdminPage } from './pages/AdminPage/AdminPageContainer';
import { default as LandlordPage } from './pages/LandlordPage/LandlordPageContainer';
import { default as LandlordPageFlats } from './pages/LandlordPage/flats/LandlordPageFlatsContainer';
import { default as TenantPage } from './pages/TenantPage/TenantPageContainer';
import { default as ResetPasswordPage } from './pages/ResetPasswordPage/ResetPasswordPageContainer';
import { default as SearchPage } from './pages/SearchPage/SearchPageContainer';
import { default as ProfilePage } from './pages/ProfilePage/ProfilePageContainer';
import { default as ReportsPage } from './pages/ReportPage/ReportPageContainer';
import { default as TenantPageFlats } from './pages/TenantPage/flats/TenantPageFlatsContainer';
import { default as AdminPageFlats } from './pages/AdminPage/flats/AdminPageFlatsContainer';
import { default as AdminPageTenants } from './pages/AdminPage/tenants/AdminPageTenantsContainer';
import { default as AdminPageLandlords } from './pages/AdminPage/landlords/AdminPageLandlordsContainer';
import { default as ProfilePageUpdate } from './pages/ProfilePage/containers/ProfilePageUpdateProfileContainer';
import { default as ProfilePageChangePassword } from './pages/ProfilePage/containers/ProfilePageChangePasswordContainer';
import { default as LandlordPageUpdateFlat } from './pages/LandlordPage/flats/containers/LandlordPageUpdateFlatContainer';
import { default as LandlordPageGetFlat } from './pages/LandlordPage/flats/containers/LandlordPageGetFlatContainer';
import { default as LandlordPageAddTenancy } from './pages/LandlordPage/flats/containers/LandlordPageAddTenancyContainer';
import { default as LandlordPageUpdateTenancy } from './pages/LandlordPage/flats/containers/LandlordPageUpdateTenancyContainer';
import { default as ReviewsPage } from './pages/ReviewsPage/ReviewsPageContainer';



import { default as MessagePage } from './pages/MessagePage/MessagePageContainer';
import Role from './types/role';

const Routes: React.FC = () => {
	return (
		<Switch>
			<Route exact path='/' component={HomePage} />
			<Route exact path='/signin' component={LoginPage} />
			<Route exact path='/signup' component={RegisterPage} />
			<Route exact path='/reset-password' component={ResetPasswordPage} />



			<ProtectedRoute
				path='/auth'
				exact
				component={AuthPage}
				acceptedRoles={[Role.TENANT, Role.LANDLORD, Role.ADMIN]}
			/>


			<ProtectedRoute
				path='/user'
				exact
				component={AuthPage}
				acceptedRoles={[Role.ADMIN, Role.LANDLORD, Role.TENANT]}
			/>

			<ProtectedRoute
				path='/reviews/:userId'
				exact
				component={ReviewsPage}
				acceptedRoles={[Role.ADMIN, Role.LANDLORD, Role.TENANT]}
			/>
			
			<ProtectedRoute 
				acceptedRoles={[Role.TENANT, Role.LANDLORD, Role.ADMIN]}
				exact path='/profile'
				component={ProfilePage} />

			<ProtectedRoute 
				acceptedRoles={[Role.TENANT, Role.LANDLORD, Role.ADMIN]}
				exact path='/profile/update'
				component={ProfilePageUpdate} />

			<ProtectedRoute
			 	acceptedRoles={[Role.TENANT, Role.LANDLORD, Role.ADMIN]}
				exact path='/profile/change-password' 
				component={ProfilePageChangePassword} />




			{/* Landlord routes */}
			<ProtectedRoute acceptedRoles={[Role.LANDLORD]} exact path='/landlord/flats' component={LandlordPageFlats} />

			<ProtectedRoute acceptedRoles={[Role.LANDLORD]} exact path='/landlord/flats/:flatId/update' component={LandlordPageUpdateFlat} />

			<ProtectedRoute acceptedRoles={[Role.LANDLORD]} exact path='/landlord/flats/:flatId' component={LandlordPageGetFlat} />

			<ProtectedRoute acceptedRoles={[Role.LANDLORD]} exact path='/landlord/messages' component={MessagePage} />

			<ProtectedRoute acceptedRoles={[Role.LANDLORD]} exact path='/landlord/search' component={SearchPage} />
			
			<ProtectedRoute acceptedRoles={[Role.LANDLORD]} exact path='/landlord/profile' component={ProfilePage} />
			
			<ProtectedRoute acceptedRoles={[Role.LANDLORD]} exact path='/landlord/reports' component={ReportsPage} />

			<ProtectedRoute acceptedRoles={[Role.LANDLORD]} exact path='/landlord/tenants/add/:userId' component={LandlordPageAddTenancy} />

			<ProtectedRoute acceptedRoles={[Role.LANDLORD]} exact path='/landlord/tenancy/:tenancyId/update' component={LandlordPageUpdateTenancy} />

			
			{/* Dokończyć poniższe */}
			{/* <ProtectedRoute acceptedRoles={[Role.LANDLORD]} exact path='/landlord/flats/:flatId' component={LandlordPageRooms} /> */}



			{/* Tenant routes*/}
			<ProtectedRoute acceptedRoles={[Role.TENANT]} exact path='/tenant' component={LandlordPage} />

			<ProtectedRoute acceptedRoles={[Role.TENANT]} exact path='/tenant/messages' component={MessagePage} />

			<ProtectedRoute acceptedRoles={[Role.TENANT]} exact path='/tenant/search' component={SearchPage} />

			<ProtectedRoute acceptedRoles={[Role.TENANT]} exact path='/tenant/profile' component={ProfilePage} />

			{/* <ProtectedRoute acceptedRoles={[Role.TENANT]} exact path='/tenant/profile/update' component={ProfilePageUpdate} />

			<ProtectedRoute acceptedRoles={[Role.TENANT]} exact path='/tenant/profile/change-password' component={ProfilePageChangePassword} /> */}
			
			<ProtectedRoute acceptedRoles={[Role.TENANT]} exact path='/tenant/reports' component={ReportsPage} />

			<ProtectedRoute acceptedRoles={[Role.TENANT]} exact path='/tenant/flats' component={TenantPageFlats} />


			{/* Admin routes */}
			<ProtectedRoute acceptedRoles={[Role.ADMIN]} exact path='/admin' component={LandlordPage} />

			<ProtectedRoute acceptedRoles={[Role.ADMIN]} exact path='/admin/messages' component={MessagePage} />

			<ProtectedRoute acceptedRoles={[Role.ADMIN]} exact path='/admin/search' component={SearchPage} />

			<ProtectedRoute acceptedRoles={[Role.ADMIN]} exact path='/admin/profile' component={ProfilePage} />

			{/* <ProtectedRoute acceptedRoles={[Role.ADMIN]} exact path='/admin/profile/update' component={ProfilePageUpdate} />

			<ProtectedRoute acceptedRoles={[Role.ADMIN]} exact path='/admin/profile/change-password' component={ProfilePageChangePassword} /> */}

			<ProtectedRoute acceptedRoles={[Role.ADMIN]} exact path='/admin/flats' component={AdminPageFlats} />

			<ProtectedRoute acceptedRoles={[Role.ADMIN]} exact path='/admin/tenants' component={AdminPageTenants} />

			<ProtectedRoute acceptedRoles={[Role.ADMIN]} exact path='/admin/landlords' component={AdminPageLandlords} />




			<Route path='/404' component={NotFoundPage} />
			<Redirect to='/404' />
		</Switch>
	);
};

export default Routes;
