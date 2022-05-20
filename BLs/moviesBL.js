const web_dal = require('../Dals/webDal')
const json_dal = require('../Dals/jsonDal')
let jfile = require('jsonfile')
const fs = require('fs');
var nextId = 1;

const checkData = async(loginData) => {
    let jsonData = await json_dal.getUsersData();

    //console.log(jsonData);

    let temp = jsonData.users.find((x) => {
        if (x.userName === loginData.userName && x.password === loginData.password)
            return 1;
    });
    console.log(temp);
    if (temp != undefined) {
        if (temp.credits > 0) {
            if (temp.isAdmin === 1) return 1;
            else return 10; //when the user is not an admin
        } else return 2;
    } else return 0;
};

let getFinalDataWeb = async(req_body) => {

    let data = await web_dal.getDataWeb();
    let finalData = data.data;

    if (req_body.name)
        finalData = finalData.filter(x => x.name == req_body.name)
    if (req_body.language)
        finalData = finalData.filter(x => x.language == req_body.language)
    if (req_body.genres == true && req_body.genres != "Choose...")
        finalData = finalData.filter(x => x.genres.indexOf(req_body.genres) != -1)

    let id_numbers = finalData.map(x => x.id)
    let names = finalData.map(x => x.name)
    let languages = finalData.map(x => x.language)
    let genres = finalData.map(x => x.genres)

    let final_obj = {
        id: id_numbers,
        name: names,
        genres: genres,
        language: languages
    }

    // if (req_body.name != undefined && req_body.genres != undefined && req_body.language != undefined)

    return final_obj;
}

let getSameMoviesDataWeb = async(sameGenre, arr) => {

    let data = await web_dal.getDataWeb();
    let finalData = data.data;

    finalData = finalData.filter(x => x.genres.indexOf(sameGenre) != -1)
    finalData = finalData.filter(x => {
        arr.forEach(element => {
            x != element
        });
    })
    let id_numbers = finalData.map(x => x.id)
    let names = finalData.map(x => x.name)
    let languages = finalData.map(x => x.language)
    let genres = finalData.map(x => x.genres)

    let final_obj = {
        id: id_numbers,
        name: names,
        genres: genres,
        language: languages
    }

    // if (req_body.name != undefined && req_body.genres != undefined && req_body.language != undefined)

    return final_obj;
}


let createJson = async(req_body) => {
    //let data = await json_dal.getData()
    /* let data = fs.readFileSync('NewMovies.json');
     let myObject = JSON.parse(data);

     let newObject = { "id": nextId, "name": req_body.name, "language": req_body.language };
     myObject.key.push(newObject);

     let newData = JSON.stringify(myObject);
     fs.writeFile('NewMovies.json', newData, err => {
         // error checking
         if (err) throw err;

         console.log("New data added");
         nextId++;
     });*/
    return new Promise((resolve, reject) => {

        let data = fs.readFileSync('NewMovies.json');
        let myObject = JSON.parse(data);
        let lastElementID = myObject.key[myObject.key.length - 1].id
        let newObject = { "id": ++lastElementID, "name": req_body.name, "language": req_body.language, "genres": req_body.genres };
        myObject.key.push(newObject);

        let newData = JSON.stringify(myObject);
        fs.writeFile('NewMovies.json', newData, err => {

            if (err) {
                reject(err);
            } else {
                //   console.log("New data added");
                nextId++;
                resolve(newData)
            }
        })
    })
}

let getFinalDataJson = async(req_body) => {

    let data = await json_dal.getData()
    data = data.key;
    console.log(req_body.name)
    if (req_body.name)
        data = data.filter(x => x.name == req_body.name)
    console.log(req_body.language != "Choose...")
    if (req_body.language != "Choose...")
        data = data.filter(x => x.language == req_body.language)
    console.log(req_body.genres)
    if (req_body.genres != "Choose...")
        data = data.filter(x => x.genres == req_body.genres)
        // ----- here i was stop, need continue from here ----------
    let id_numbers = data.map(x => x.id)
    let names = data.map(x => x.name)
    console.log(names)
    let languages = data.map(x => x.language)
    let genres = data.map(x => x.genres)

    let final_obj = {
        id: id_numbers,
        name: names,
        genres: genres,
        language: languages
    }

    return final_obj;
}


let getSpecificMovieDataJF = async(req_body) => {

    let data = await json_dal.getData()
    data = data.key;

    // if (req_body.name)
    data = data.find(x => x.name == req_body.name)


    return data;
}



let getSpecificMovieDataAPI = async(req_body) => {

    let data = await web_dal.getDataWeb();
    let finalData = data.data;

    // if (req_body.name)
    finalData = finalData.find(x => x.name == req_body.name)


    return finalData;
}


module.exports = { getFinalDataWeb, checkData, createJson, getFinalDataJson, getSameMoviesDataWeb, getSpecificMovieDataAPI, getSpecificMovieDataJF }

/*
let getFinalDataWeb = async(req_body) => {

    let data = await web_dal.getDataWeb();
    data = data.data;
    let finalData = data.filter(x => x.name == req_body.name)
    finalData = finalData.filter(x => x.language == req_body.language)
    finalData = finalData.filter(x => x.genres.indexOf(req_body.genres) != -1)

    // if (req_body.name != undefined && req_body.genres != undefined && req_body.language != undefined)
    console.log("fin is" + finalData)
    return finalData;
}*/