import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../Screens/Employee/Home';
import History from '../Screens/Common/History';
import MapScreen from '../Screens/Common/MapScreen';
import { Icon } from 'native-base';
import Settings from '../Screens/Employee/Settings';


export default createAppContainer(createDrawerNavigator({

    Settings: {
        screen: Settings,
        navigationOptions: {
            drawerLabel: 'Settings',
            drawerIcon: () => <Icon fontSize={17} name="settings" type='MaterialCommunityIcons' />
        }
    },
    EmployeeHome: {

        screen: Home,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: () => <Icon name="home" type='MaterialCommunityIcons' />
        }
    },
    History: {
        screen: createStackNavigator({
            History: {
                screen: props => <History {...props} type="emp" />
            },
            MapScreen
        },
            {
                defaultNavigationOptions: {
                    header: null
                }
            }),

        navigationOptions: {
            drawerLabel: 'History',
            drawerIcon: () => <Icon fontSize={17} name="history" type='MaterialCommunityIcons' />
        }
    },
}));