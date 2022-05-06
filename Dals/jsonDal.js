let jfile = require('jsonfile')

const getData = () => {
    return new Promise((resolve, reject) => {
        jfile.readFile("./NewMovies.json", function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const getUsersData = () => {
    return new Promise((resolve, reject) => {
        jfile.readFile("./users.json", function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
module.exports = { getData, getUsersData }