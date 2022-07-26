import axios from 'axios';
import { axiosPrivate } from './axiosPrivate';

const fetchData = async (url: string) => {
  const {
    data: { data },
  } = await axiosPrivate.get(url);
  return data;
};

export default fetchData;
