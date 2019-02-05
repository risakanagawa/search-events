import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.meetup.com/',
    auth : {
        sign: true,
        key: '483d53f5080354478142a1f0535841',
    },
    params : {
        contry : 'ca',
        city : 'Vancouver',
    }
});
