import { SET_USER, SET_ERRORS, SET_FRIENDS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types';
import axios from 'axios';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
        .then(res => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch(err => {
            console.log(err.response.data, 'err')
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    // dispatch({ type: CLEAR_ERRORS });
    axios.post('/signup', newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch(err => {
            console.log(err.response.data, 'err')
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({
        type: SET_UNAUTHENTICATED
    });
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        //THIS NEEDS TO GO!!! CAUSING TOO MANY RENDERS
        .then(() => {
            dispatch(getFriends());
        })
        .catch(err => console.log(err))
}

export const addChallenge = (userDetails, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    // dispatch({ type: CLEAR_ERRORS });
    axios
        .post('/challenge', userDetails)
        .then(() => {
            axios.get('/user')
                .then(res => {
                    dispatch({ type: CLEAR_ERRORS });
                    dispatch({
                        type: SET_USER,
                        payload: res.data
                    })
                    history.push('/');
                    toast.success('🚀 Challenge successfully added!', {
                    });
                })
                .catch(err => {
                    console.log(err.response.data, 'err')
                })

        })
        .catch(err => {
            console.log(err.response.data, 'err')
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
};

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.post('/user/image', formData)
        .then(() => {
            axios.get('/user')
                .then(res => {
                    dispatch({
                        type: SET_USER,
                        payload: res.data
                    })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
}

export const addFriend = (friendData) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    // dispatch({ type: CLEAR_ERRORS });
    var { friendUid } = friendData
    axios.put('/user', friendData)
        .then((friendUid) => {
            axios.get('/user')
                .then(res => {
                    dispatch({
                        type: SET_USER,
                        payload: res.data
                    })
                })
                .catch(err => console.log(err));
            return friendUid.data;
        })
        .then((friendUid) => {
            dispatch(getFriend(friendUid));
            dispatch({ type: CLEAR_ERRORS });
            toast.warn('👯 Wow! You made a friend!', {
            })
        })
        .catch(err => {
            console.log(err.response.data, 'err')
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })

}


export const getFriends = () => (dispatch) => {
    // dispatch({ type: LOADING_USER });
    var friends = [];
    axios.get(`/user`)
        .then(res => {
            friends = res.data.credentials.friends;
            // console.log(friends, 'shudbearray');
            friends.forEach(friend => {
                axios.get(`/user/${friend}`)
                    .then(res => {
                        dispatch({
                            type: SET_FRIENDS,
                            payload: res.data
                        })
                    })
            });
        })
        .catch(err => console.log(err))
}

export const getFriend = (friendUid) => (dispatch) => {
    // dispatch({ type: LOADING_USER });
    axios.get(`/user/${friendUid}`)
        .then(res => {
            dispatch({
                type: SET_FRIENDS,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};
