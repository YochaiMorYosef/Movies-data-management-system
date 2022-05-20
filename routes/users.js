var express = require('express');
var moviesBL = require('../BLs/moviesBL');
var router = express.Router();

/* GET users listing. */
router.post('/newmovie', async function(req, res, next) {

    let resNewJson = await moviesBL.createJson(req.body)
        //console.log(resNewJson)

    res.render('intermediatePage', {});
});

router.get("/", function(req, res, next) {
    res.render("login", {});
});


router.post("/menuPage", async function(req, res, next) {
    let loginDataCheck = await moviesBL.checkData(req.body);
    console.log("loginDataCheck =" + loginDataCheck);
    if (loginDataCheck === 1) res.render("menupage", { data: "visible" });
    else if (loginDataCheck === 2) res.send("no credits");
    else if (loginDataCheck === 10) res.render("menupage", { data: "hidden" });
    else res.send("username or pwd incorrect");
});

router.post('/newMoviePage', async function(req, res, next) {
    res.render('newMoviePage', {});

});

router.post('/search', async function(req, res, next) {
    res.render('searchMoviePage', {});

});

router.post('/searcresultshmovie', async function(req, res, next) {

    let resultsFromApi = await moviesBL.getFinalDataWeb(req.body)
    console.log(resultsFromApi)
        //let resultsFromJson = await moviesBL.getFinalDataJson(req.body)
    let resultsFromJson = await moviesBL.getFinalDataJson(req.body)
    console.log(resultsFromJson)
    let sameGenre = req.body.genres;
    if (sameGenre == "All" && resultsFromApi.id.length != 0) {
        sameGenre = resultsFromApi.genres[0][0];
        //console.log(sameGenre)
    } else {
        sameGenre = resultsFromJson.genres;
    }
    let sameMoviesApi = await moviesBL.getSameMoviesDataWeb(sameGenre, resultsFromApi.name)
        // need to add sameMovieJson
        //console.log(sameMoviesApi)
    res.render('searchResultsPage', { sameData: sameMoviesApi, data: resultsFromApi, dataJson: resultsFromJson });
});

router.post('/moviedata', async function(req, res, next) {

    let resultsFromApi = await moviesBL.getSpecificMovieDataAPI(req.body)
    let resultsFromJson = await moviesBL.getSpecificMovieDataJF(req.body)

    console.log(resultsFromApi)
        // console.log(resultsFromApi.length)
    console.log(resultsFromJson)
        //  console.log(resultsFromJson.length)
    if (resultsFromJson === undefined)
        res.render('movieDataPage', { data: resultsFromApi });
    if (resultsFromApi === undefined)
        res.render('movieJsonDataPage', { data: resultsFromJson })
        //  res.send('need render to menu page');
});

module.exports = router;