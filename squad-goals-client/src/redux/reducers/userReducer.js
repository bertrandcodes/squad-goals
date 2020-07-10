import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_FRIENDS, LOADING_USER } from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    friends: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                ...state,
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case SET_FRIENDS:
            return {
                ...state,
                authenticated: true,
                loading: false,
                friends: action.payload
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}