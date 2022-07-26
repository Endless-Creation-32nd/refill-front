import axios from 'axios';

export const axiosPublic = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});
