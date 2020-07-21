import {
    SET_CHALLENGES
} from '../types';
import axios from 'axios';


export const getChallenges = () => (dispatch) => {
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