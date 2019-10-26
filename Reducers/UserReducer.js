import { STATUS_CHANGE } from "../Actions/Types/UserTypes";

// Initial State
const INITIAL_STATE = {
    user: {
        name: 'Ashish Gupta',
        status: 'Offline',
        id: '2ozBcyRGLOZjOR73g6FHhpIYLuz2',
        photo: "http://keenthemes.com/preview/metronic/theme/as...",
    }
}

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STATUS_CHANGE:
            let oldState = { ...state };
            oldState.user.status = action.payload;
            return oldState;
        default:
            return state;
    }
};

export default UserReducer;