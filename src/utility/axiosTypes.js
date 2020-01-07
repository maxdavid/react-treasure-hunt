import axios from 'axios';

export const axiosWithAuth = () => {
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.REACT_APP_TOKEN}`,
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
