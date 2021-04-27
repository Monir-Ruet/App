import React from 'react';
import PropTypes from 'prop-types';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {withOnyx} from 'react-native-onyx';

import withWindowDimensions, {windowDimensionsPropTypes} from '../../../components/withWindowDimensions';
import styles, {
    getNavigationDrawerType,
    getNavigationDrawerStyle,
} from '../../../styles/styles';
import ONYXKEYS from '../../../ONYXKEYS';
import compose from '../../compose';

// Screens
import SidebarScreen from '../../../pages/home/sidebar/SidebarScreen';
import ReportScreen from '../../../pages/home/ReportScreen';

const propTypes = {
    // Initial report to be used if nothing else is specified by routing
    initialReportID: PropTypes.string,

    ...windowDimensionsPropTypes,
};

const defaultProps = {
    initialReportID: '',
};

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = props => (
    <Drawer.Navigator
        openByDefault
        drawerType={getNavigationDrawerType(props.isSmallScreenWidth)}
        drawerStyle={getNavigationDrawerStyle(
            props.windowWidth,
            props.isSmallScreenWidth,
        )}
        sceneContainerStyle={styles.navigationSceneContainer}
        edgeWidth={500}
        drawerContent={() => <SidebarScreen />}
    >
        <Drawer.Screen
            name="Report"
            component={ReportScreen}
            initialParams={{reportID: props.initialReportID}}
            options={{
                cardStyle: styles.navigationScreenCardStyle,
                headerShown: false,
            }}
        />
    </Drawer.Navigator>
);

MainDrawerNavigator.propTypes = propTypes;
MainDrawerNavigator.defaultProps = defaultProps;
MainDrawerNavigator.displayName = 'MainDrawerNavigator';
export default compose(
    withWindowDimensions,
    withOnyx({
        initialReportID: {
            key: ONYXKEYS.CURRENTLY_VIEWED_REPORTID,
        },
    }),
)(MainDrawerNavigator);
