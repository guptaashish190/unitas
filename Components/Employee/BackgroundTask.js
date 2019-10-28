
import * as TaskManager from 'expo-task-manager';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import Utils from '../../utils';
import { TASK_NAME } from '../../constants/BackgroundTasksConstants';

TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
    if (error) {
        console.log(error);
        return;
    }
    if (data) {
        const user = await getCurrentUser();
        const coordinates = {
            latitude: data.locations[0].coords.latitude,
            longitude: data.locations[0].coords.longitude,
        }
        setLocationCoordinates(coordinates, user.id, user.currentMapSessionID);
    }
});


const setLocationCoordinates = (location, id, mapSessionId) => {
    const empRef = firebase.database().ref(`emp_locations/${id}/${mapSessionId}`);

    empRef.once('value', function (snapshot) {

        const emp_location = snapshot.val();
        console.log(emp_location);
        if (emp_location === null) {

            firebase.database().ref(`emp_locations/${id}/${mapSessionId}`).set({
                date: new Date().toString(),
                distanceTravelled: 0,
                coordinates: location,
                routeCoordinates: [location],
            });
        } else {

            let distanceTravelled = emp_location.distanceTravelled;
            if (emp_location.coordinates) {
                distanceTravelled += Utils.calcDistance(location, emp_location.coordinates);
            }

            firebase.database().ref(`emp_locations/${id}/${mapSessionId}`).set({
                date: emp_location.date,
                distanceTravelled,
                coordinates: location,
                routeCoordinates: [...emp_location.routeCoordinates, location],
            });
        }
    });
}

const getCurrentUser = async () => {
    const currentUser = await AsyncStorage.getItem('currentUser');
    return JSON.parse(currentUser);
}
