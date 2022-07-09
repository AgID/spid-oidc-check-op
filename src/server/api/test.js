const fs = require('fs-extra');
const axios = require('axios');
const moment = require('moment');
const validator = require('validator');
const Utility = require('../lib/utils');
const config_dir = require('../../config/dir.json');
const config_test = require("../../config/test.json");

 
module.exports = function(app, checkAuthorisation) {

    app.get("//api/test/suite/:testsuite", function(req, res) {

        // check if apikey is correct
        let authorisation = checkAuthorisation(req);
        if(!authorisation) {
            error = {code: 401, msg: "Unauthorized"};
            res.status(error.code).send(error.msg);
            return null;
        }

        let testsuite = req.params.testsuite;
        res.status(200).send(config_test[testsuite]);
    });


}