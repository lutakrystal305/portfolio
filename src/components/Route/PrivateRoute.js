import React, { useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux'

function PrivateRoute({ children, ...rest }) {
    const key = sessionStorage.getItem('key');
    console.log(key);
    const checkLogged = useSelector(state => state.checkLogged);
    const isAuthen = checkLogged.isAuthed || key;
    
    return (
        <Route
        {...rest}
        render={({ location }) =>
            isAuthen ? (
            children
            ) : (
            <Redirect
                to={{
                pathname: "/",
                state: { from: location }
                }}
            />
            )
        }
        />
    );
}
export default PrivateRoute;
