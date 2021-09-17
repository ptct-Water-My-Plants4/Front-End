import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const PrivateRoute = props => {
    if(localStorage.getItem('token')) {
        return (
            <Route {...props} />
        )
    }
        else {
        return (
            <Redirect to = '/login' /*login page*/ />
        )
    }
}

export default PrivateRoute;