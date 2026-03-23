import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { Login } from '../page/auth/nonadmin-login'
import { AdminLogin } from '../page/auth/admin-login'

// Note: this file is .js, so avoid JSX and use React.createElement instead.
const DefaultRoutes = () => {
    return React.createElement(
        React.Fragment,
        null,
        // Public / auth routes
        React.createElement(Route, {
            path: '/admin-login',
            element: React.createElement(AdminLogin, null),
            key: 'admin-login-route',
        }),
        React.createElement(Route, {
            path: '/login',
            element: React.createElement(Login, null),
            key: 'login-route',
        }),
        // Default route: send to login
        React.createElement(Route, {
            path: '*',
            element: React.createElement(Navigate, { to: '/admin-login', replace: true }),
            key: 'default-route',
        })
    )
}

export default DefaultRoutes
