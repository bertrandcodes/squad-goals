import {
    SET_CHALLENGES
    // LOADING_DATA
} from '../types';

const initialState = {
    challenges: [],
    challenge: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CHALLENGES:
            return {
                ...state,
                challenges: action.payload,
                loading: false
            };
        default:
            return state;
    }
}