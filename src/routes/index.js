import React, { useContext } from 'react';

import AuthRoutes from './auth.routes';
import AppStack from './app.routes';
import {AuthContext} from '../contexts/auth';

function Routes(){
    const { signed } = useContext(AuthContext);

    return(
        signed ? <AppStack/> : <AuthRoutes/>
    );
}

export default Routes;