import {
    SET_CHALLENGES
    // LOADING_DATA,
} from '../types';
import axios from 'axios';


export const getChallenges = () => (dispatch) => {
    // dispatch({ type: LOADING_DATA });
    axios
        .get('/challenges')
        .then((res) => {
            dispatch({
                type: SET_CHALLENGES,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_CHALLENGES,
                payload: []
            });
        });
};