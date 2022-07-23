import axios from 'axios';

const fetchData = async (url: string) => {
  const accessToken = localStorage.getItem('accessToken');
  const {
    data: { data },
  } = await axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export default fetchData;
