const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');
const validator = require('../server/node_modules/validator');
const utility = require('../server/lib/utils');
const config_aa = require('../config/aa.json');

class Test_9_2_14 extends TestIntrospectionResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse);
        this.num = "9.2.14";
        this.description = "Introspection Response - the value of aud MUST be equal to the identifier (URL) of AA";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        if(!(this.introspectionresponse.data===Object(this.introspectionresponse.data))) {
            this.notes = this.introspectionresponse.data;
            throw("the content of body is not a valid JSON object");
        }

        if(this.introspectionresponse.data.active==null) {
            this.notes = this.introspectionresponse.data;
            throw("the content of body does not contain parameter active");
        }

        if(this.introspectionresponse.data.active!=true && this.introspectionresponse.data.active!=false) {
            this.notes = this.introspectionresponse.data;
            throw("the parameter active is not true not false");
        }

        if(this.introspectionresponse.data.active==true && (this.introspectionresponse.data.aud==null || this.introspectionresponse.data.aud=='')) {
            this.notes = this.introspectionresponse.data;
            throw("the parameter active is true but parameter aud is not present");
        }

        if(this.introspectionresponse.data.aud != config_aa.iss) {
            this.notes = this.introspectionresponse.data.aud + " != " + config_aa.iss;
            throw("the value of aud: " + this.introspectionresponse.data.aud + " is not equal to the identifier (URL) of AA: " + config_aa.iss);
        }

        this.notes = this.introspectionresponse.data.aud;
        return true;
    }

}

module.exports = Test_9_2_14