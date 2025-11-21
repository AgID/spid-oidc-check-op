const fs = require("fs");
const path = require("path");
const TestUserinfoRequest = require('../server/lib/test/TestUserinfoRequest.js');
const Utility = require('../server/lib/utils.js');
const config_rp = require('../config/rp.json');

class Test_4_1_1 extends TestUserinfoRequest {

    constructor(metadata, authrequest={}, authresponse={}, tokenrequest={}, tokenresponse={}) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "4.1.1";
        this.description = "Wrong Userinfo Request - the bearer token for authorization is not valid";
        this.validation = "self";
    }

    async exec() {

        this.userinforequest = {
            'Authorization': 'Bearer notvalidtoken'
        }
    }

}

module.exports = Test_4_1_1