import axios from 'axios';

const getUserPostsPromise = (userID) => {
    return axios.get('http://localhost:8080/posts/user-posts', {
        params: {
            id: userID
        }
    });
}

export const getOthersPostPromise = (userID) => {
    return axios.get('http://localhost:8080/posts/others-posts' , {
        params: {
            id: userID
        }
    })
}

export const getAllUsers = () => {
    return axios.get('http://localhost:8080/all-users');
}

export default getUserPostsPromise;