import React from 'react'
import {Route} from 'react-router-dom'
import Welcome from './Components/Welcome'
import Dashboard from './Components/Dashboard'
import SignUp from './Components/Authorization/SignUp'
import Verification from './Components/Authorization/Verification'
import AppStore from './AppStore/AppStore'

const site_routes = [
	{
        path: '/',
		exact: true,
        component: Welcome
	},
	{
        path: '/users/dashboard/:user_id',
        component: Dashboard
	},
	{
		path: '/signup',
		exact: true,
        component: SignUp
	},
	{
		path: '/await-verification',
		exact: true,
        component: Welcome
	},
	{
		path: '/verify/:token/users/dashboard/:user_id',
		exact: true,
        component: Dashboard
	}
]
const data = AppStore.data
export default (
	<div>
		{site_routes.map((route, i) =>(
			<Route exact={route.exact} path={route.path} render={(props) => (
				<route.component key={i} data={data} {...props} />
			)}/>
		))}
	</div>

)
