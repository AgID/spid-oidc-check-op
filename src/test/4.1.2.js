const fs = require("fs");
const path = require("path");
const TestUserinfoRequest = require('../server/lib/test/TestUserinfoRequest.js');
const Utility = require('../server/lib/utils.js');
const config_rp = require('../config/rp.json');

class Test_4_1_2 extends TestUserinfoRequest {

    constructor(metadata, authrequest={}, authresponse={}, tokenrequest={}, tokenresponse={}) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "4.1.2";
        this.description = "Wrong Userinfo Request - the bearer token for authorization is expired or revoked. Note: please wait for token to expire or revoke it yourself.";
        this.validation = "self";
    }

    async exec() {

        this.userinforequest = {
            'Authorization': 'Bearer ' + this.tokenresponse.data.access_token
        }
    }

}

module.exports = Test_4_1_2