const fs = require("fs");
const path = require("path");
const TestUserinfoRequest = require('../server/lib/test/TestUserinfoRequest.js');
const Utility = require('../server/lib/utils.js');
const config_rp = require('../config/rp.json');

class Test_4_0_0 extends TestUserinfoRequest {

    constructor(metadata, authrequest={}, authresponse={}, tokenrequest={}, tokenresponse={}) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "4.0.0";
        this.description = "request correct";
        this.validation = "self";
    }

    async exec() {
        this.userinforequest = {
            'Authorization': 'Bearer ' + this.tokenresponse.data.access_token
        }
    }

}

module.exports = Test_4_0_0 