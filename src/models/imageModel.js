import axios from 'axios';

const getImages = async (params, lastEvaluatedKey = null) => {
  try {
    const url = process.env.API_ADDRESS + '/restaurants';
    const result = await axios.get(url, { params });
    return result.data;

  } catch (error) {
    console.log('error', error);
  }
}

const getImage = async (id, params = {}) => {
  try {
    const url = process.env.API_ADDRESS + `/restaurants/${id}`;
    const result = await axios.get(url, { params });
    return result.data;

  } catch (error) {
    console.log('error', error);
  }
}


export default {
  getImages,
  getImage
};