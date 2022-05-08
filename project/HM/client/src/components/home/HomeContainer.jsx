import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";

import HomeNavigator from '../shared/HomeNavigator';
import Home from './Home';
import Footer from "./Footer"
import Profile from '../customer/profile/Profile';

function HomeContainer() {
    return (
        <div>
            <HomeNavigator />
            <Switch>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
            <Footer />
        </div>
    );
}

export default HomeContainer;
