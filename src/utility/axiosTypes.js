import axios from 'axios';

export const axiosWithAuth = () => {
    return axios.create({
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${process.env.Token}`,
        },
        baseURL: 'https://lambda-treasure-hunt.herokuapp.com/api/',
    });
};

export const axiosInstance = () => {
    return axios.create({
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL: 'https://lambda-treasure-hunt.herokuapp.com/api/',
    });
};
