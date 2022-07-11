import axios from 'axios';

const fetchWriting = async (url: string) => {
  const {
    data: { data },
  } = await axios.get(url);
  return data;
};

export default fetchWriting;
