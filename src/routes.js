import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import AppDispatcher from './Dispatcher/AppDispatcher'
import AppStore from './Stores/AppStore'

import Welcome from './Components/Welcome'
import Dashboard from './Components/Dashboard'

const site_routes = [
	{
        path: '/',
		exact: true,
        component: Welcome
    },
	{
        path: '/callback',
        component: Dashboard
    },
	{
        path: '/dashboard/:id',
        component: Dashboard
    }
]

export default (
	<div>
		{site_routes.map((route, i) =>(
			<Route exact path={route.path} render={(props) => (
				<route.component key={i} data={AppStore.data} {...props} />
			)}/>
		))}
	</div>

)
