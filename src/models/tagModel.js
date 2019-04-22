import axios from 'axios';

const getTags = async (params) => {
    try {
        const url = `${process.env.API_ADDRESS}/tags`;
        const result = await axios.get(url, { params });
        return result.data;
    } catch (error) {
        console.log('error', error);
    }
}

const getTag = async (id, params = {}) => {
    try {
        const url = `${process.env.API_ADDRESS}/tags/${id}`;
        const result = await axios.get(url, {params});
        return result.data;
    } catch (error) {
        console.log('error', error)
    }
}

export default {
    getTags,
    getTag
};