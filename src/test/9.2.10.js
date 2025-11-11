const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');
const validator = require('../server/node_modules/validator');
const utility = require('../server/lib/utils');
const config_rp = require('../config/rp.json');

class Test_9_2_10 extends TestIntrospectionResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse);
        this.num = "9.2.10";
        this.description = "Introspection Response - the value of act MUST be an object containing the claim sub equal to the identifier of RP";
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

        if(this.introspectionresponse.data.active==true && (this.introspectionresponse.data.act==null || this.introspectionresponse.data.act=='')) {
            this.notes = this.introspectionresponse.data;
            throw("the parameter active is true but parameter act is not present");
        }

        if(this.introspectionresponse.data.act.sub==null || this.introspectionresponse.data.act.sub=='') {
            this.notes = this.introspectionresponse.data.act;
            throw("the parameter act is not an object containing claim sub");
        }

        if(this.introspectionresponse.data.act.sub!=config_rp.client_id) {
            this.notes = this.introspectionresponse.data.act;
            throw("the value of parameter sub inside act is not equal to the identifier of RP");
        }

        this.notes = this.introspectionresponse.data.act;
        return true;
    }

}

module.exports = Test_9_2_10