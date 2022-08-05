import axios from 'axios';

const getUser = async() => {
    const response = await axios.get('https://randomuser.me/api/?results=200&seed=foobar');
    return response.data.results
}

export default {
    getUser
}