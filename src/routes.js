import React from 'react'
import {Route} from 'react-router-dom'

import Welcome from './Components/Welcome'
import Dashboard from './Components/Dashboard'
import SignUp from './Components/SignUp'

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
        path: '/users/dashboard',
        component: Dashboard
    },
	{
		path: '/signup',
		exact: true,
        component: SignUp
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
