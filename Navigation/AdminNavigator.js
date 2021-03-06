import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Track from '../Screens/Admin/Track';
import AdminHome from '../Screens/Admin/Home';
import History from '../Screens/Common/History';
import MapScreen from '../Screens/Common/MapScreen';

export default createAppContainer(createStackNavigator({
    AdminHome,
    History,
    Track,
    MapScreen,
}, {
    defaultNavigationOptions: {
        header: null
    },
}));