import axios from 'axios';

const instance=axios.create({
    baseURL:'https://react-my-buger-519b7.firebaseio.com/'
});

export default instance;