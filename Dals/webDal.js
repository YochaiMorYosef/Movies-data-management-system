let axios = require('axios')

let getDataWeb = () => {
    return axios.get('https://api.tvmaze.com/shows')
}


module.exports = { getDataWeb }