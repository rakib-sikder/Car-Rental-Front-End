import React, { useContext } from 'react';
import { AuthContext } from '../ContextApi/Context';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

const PrivateRoute = ({children}) => {
    const {currentUser,loading} = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return (
            <Loading></Loading>
        );
      }
        if (!currentUser) {
            return (
            <Navigate state={location.pathname} to="/login"></Navigate>
            );
        }
    return (
        <>
            {children}
        </>
    );
};

export default PrivateRoute;