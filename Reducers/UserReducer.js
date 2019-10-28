import { STATUS_CHANGE, TOGGLE_ENABLE_LOCATION_MODAL_VISIBLE, SET_LOCATION, SET_CURRENT_USER_MAP_SESSION_ID } from "../Actions/Types/UserTypes";

// Initial State
const INITIAL_STATE = {
    user: {
        name: 'Ashish Gupta',
        status: 'Offline',
        id: '2ozBcyRGLOZjOR73g6FHhpIYLuz2',
        photo: "http://keenthemes.com/preview/metronic/theme/as...",
    },
    location: null,
    isEnableLocationModalVisible: false,
    currentMapSessionID: 'axnsuna'
}

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STATUS_CHANGE:
            let oldState = { ...state };
            oldState.user.status = action.payload;
            return oldState;
        case TOGGLE_ENABLE_LOCATION_MODAL_VISIBLE:
            return { ...state, isEnableLocationModalVisible: !state.isEnableLocationModalVisible };
        case SET_LOCATION:
            return { ...state, location: action.payload }
        case SET_CURRENT_USER_MAP_SESSION_ID:
            return { ...state, user: { ...state.user, currentMapSessionID: action.payload } }
        default:
            return state;
    }
};

export default UserReducer;