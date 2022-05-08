import React from "react";
import { Switch, Route } from "react-router-dom";

import HomeNavigator from "../shared/HomeNavigator";
import Home from "./Home";
import Profile from "../user/profile";
import EquipmentViewMore from "./equipments/equipment-view-more";
import Cart from "../cart";
import UpdateUser from "../user/profile/update-user";

function HomeContainer() {
  return (
    <div>
      <HomeNavigator />
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/update-user">
          <UpdateUser />
        </Route>
        <Route
          path="/view-more-equipment/:equipmentId"
          component={(props) => (
            <EquipmentViewMore {...props} key={window.location.pathname} />
          )}
        />
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default HomeContainer;
