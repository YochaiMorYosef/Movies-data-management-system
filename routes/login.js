var express = require("express");
var router = express.Router();
const loginBL = require("../BLs/loginBL");

/* GET users listing. */


router.post("/editUsers", async function(req, res, next) {
    res.render("editUsers", {});
});

module.exports = router;