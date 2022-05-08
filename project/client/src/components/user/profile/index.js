import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ProfileDetails from './ProfileDetails'
import PurchaseHistory from "./purchase-history"

export default function DisabledTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getContent = () => {
    if (value === 0) {
      return <ProfileDetails />
    } else if (value === 1) {
      return <PurchaseHistory/> 
    }
  }

  return (
    <>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
        variant="fullWidth"
      >
        <Tab label="My Account" />
        <Tab label="Purchase History" />
      </Tabs>
      {getContent()}
    </>
  );
}
