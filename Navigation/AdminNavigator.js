import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Track from '../Screens/Admin/Track';
import AdminHome from '../Screens/Admin/Home';
import History from '../Screens/Admin/History';

export default createAppContainer(createStackNavigator({
    AdminHome,
    History,
    Track: Track,
}, {
    defaultNavigationOptions: {
        header: null
    },
}));