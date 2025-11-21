const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');
const validator = require('../server/node_modules/validator');
const utility = require('../server/lib/utils');
const config_rp = require('../config/rp.json');

class Test_9_2_12 extends TestIntrospectionResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse);
        this.num = "9.2.12";
        this.description = "Introspection Response - the value of iss MUST be equal to the identifier of the OP";
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

        if(this.introspectionresponse.data.active==true && (this.introspectionresponse.data.iss==null || this.introspectionresponse.data.iss=='')) {
            this.notes = this.introspectionresponse.data;
            throw("the parameter active is true but parameter iss is not present");
        }

        if(this.introspectionresponse.data.active==true && this.introspectionresponse.data.iss!=this.metadata.configuration.issuer) {
            this.notes = this.introspectionresponse.data.iss + " != " + this.metadata.configuration.issuer;
            throw("the value of iss is not equal to the identifier of the OP");
        }

        this.notes = this.introspectionresponse.data;
        return true;
    }

}

module.exports = Test_9_2_12