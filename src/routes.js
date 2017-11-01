import React from 'react'
import {Route} from 'react-router-dom'

import Welcome from './Components/Welcome'
import Dashboard from './Components/Dashboard'
import SignUp from './Components/Authorization/SignUp'
import Verification from './Components/Authorization/Verification'

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
		path: '/verify',
		exact: true,
        component: Verification
    }
]

export default (
	<div>
		{site_routes.map((route, i) =>(
			<Route exact={route.exact} path={route.path} render={(props) => (
				<route.component key={i} {...props} />
			)}/>
		))}
	</div>

)
