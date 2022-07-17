import axios from 'axios';

const fetchData = async (url: string) => {
  const {
    data: { data },
  } = await axios.get(url);
  return data;
};

export default fetchData;
