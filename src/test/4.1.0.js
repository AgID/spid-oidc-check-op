const fs = require("fs");
const path = require("path");
const TestUserinfoRequest = require('../server/lib/test/TestUserinfoRequest.js');
const Utility = require('../server/lib/utils.js');
const config_rp = require('../config/rp.json');

class Test_4_1_0 extends TestUserinfoRequest {

    constructor(metadata, authrequest={}, authresponse={}, tokenrequest={}, tokenresponse={}) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "4.1.0";
        this.description = "Wrong Userinfo Request - the request is sent using HTTP method different from GET";
        this.validation = "self";
    }

    async exec() {

        this.setVar('method', 'post');

        this.userinforequest = {
            'Authorization': 'Bearer ' + this.tokenresponse.data.access_token
        }
    }

}

module.exports = Test_4_1_0 