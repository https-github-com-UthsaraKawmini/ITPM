import React from 'react'
import TopBanner from './TopBanner';
import EquipmentContainer from './equipments/available-equipments';

const Home = () => {
    return (
        <React.Fragment>
            <TopBanner />
            <EquipmentContainer />
        </React.Fragment>
    );
}

export default Home;