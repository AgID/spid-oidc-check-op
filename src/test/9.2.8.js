const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');
const validator = require('../server/node_modules/validator');
const utility = require('../server/lib/utils');

class Test_9_2_8 extends TestIntrospectionResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse);
        this.num = "9.2.8";
        this.description = "Introspection Response - the value of sub MUST be equal to the value of lookup of AA ";
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

        if(this.introspectionresponse.data.active==true && (this.introspectionresponse.data.sub==null || this.introspectionresponse.data.sub=='')) {
            this.notes = this.introspectionresponse.data;
            throw("the parameter active is true but parameter sub is not present");
        }

        if(this.introspectionresponse.data.active==true && this.var['user'] != this.introspectionresponse.data.sub) {
            this.notes = this.introspectionresponse.data;
            throw("the value of sub: " + this.introspectionresponse.data.sub + " is not equal to the value of lookup of AA: " + this.var['user']);
        }

        this.notes = this.introspectionresponse.data;
        return true;
    }

}

module.exports = Test_9_2_8