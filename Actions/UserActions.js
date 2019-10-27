import { STATUS_CHANGE, TOGGLE_ENABLE_LOCATION_MODAL_VISIBLE, SET_LOCATION, SET_CURRENT_USER_MAP_SESSION_INDEX } from "./Types/UserTypes";

export function StatusChange(status) {
    return {
        type: STATUS_CHANGE,
        payload: status
    }
}
export function ToggleEnableLocationModal() {
    return {
        type: TOGGLE_ENABLE_LOCATION_MODAL_VISIBLE,
    }
}
export function SetLocation(location) {
    return {
        type: SET_LOCATION,
        payload: location
    }
}
export function setCurrentMapSessionIndex(i) {
    return {
        type: SET_CURRENT_USER_MAP_SESSION_INDEX,
        payload: i
    }
}