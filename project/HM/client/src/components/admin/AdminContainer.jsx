import React from 'react'
import {
    Switch,
    Route,
} from "react-router-dom";

import AllCustomers from '../customer/all-customers/AllCustomers';
import AdminNaviagator from "../shared/AdminNavigator"

const AdminContainer = () => {
    return (
        <React.Fragment>
            <AdminNaviagator />
            <Switch>
                <Route path="/">
                    <AllCustomers />
                </Route>
            </Switch>
        </React.Fragment>
    );
}

export default AdminContainer;