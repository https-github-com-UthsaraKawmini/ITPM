import React from 'react'
import {
    Switch,
    Route,
} from "react-router-dom";

import AllEquipment from './equipment/all-equipment';
import CreateEquipments from './equipment/create-equipment';
import AllUsers from './all-users';
import AdminNaviagator from '../shared/AdminNavigator';
import AllEmployees from '../employee/all-employees/AllEmployees';
const AdminContainer = () => {
    return (
        <React.Fragment>
            <AdminNaviagator />
            <Switch>
                <Route exact path="/admin/all-equipments">
                    <AllEquipment />
                </Route>
                <Route path="/admin/create-equipment">
                   <CreateEquipments/>
                </Route>
                <Route path="/admin/AllEmployees">
                    <AllEmployees />
                </Route>
                <Route path="/">
                   <AllUsers/>
                </Route>
            </Switch>
        </React.Fragment>
    );
}

export default AdminContainer;