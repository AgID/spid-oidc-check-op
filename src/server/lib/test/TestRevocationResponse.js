const Test = require('./Test.js');
const moment = require('moment');

class TestRevocationResponse extends Test {

    constructor(metadata, authrequest = {}, authresponse = {}, tokenrequest = {}, tokenresponse = {}, userinforequest = {}, userinforespone = {}, introspectionrequest = {}, introspectionresponse = {}, revocationrequest = {}, revocationresponse = {}) {
        super();
        this.hook = "revocation-response";
        this.metadata = metadata;
        this.authrequest = authrequest;
        this.authresponse = authresponse;
        this.tokenrequest = tokenrequest;
        this.tokenresponse = tokenresponse;
        this.userinforequest = userinforequest;
        this.userinforespone = userinforespone;
        this.introspectionrequest = introspectionrequest;
        this.introspectionresponse = introspectionresponse;
        this.revocationrequest = revocationrequest;
        this.revocationresponse = revocationresponse;
    }

    exec() {
        super.exec();
    }

    async getResult() {
        let test = {
            num: this.num,
            hook: this.hook,
            description: this.description,
            validation: this.validation,
            result: this.setFailure(),
            message: "",
            notes: "",
            datetime: moment().format('YYYY-MM-DD HH:mm:ss')
        }

        /*if(this.validation=='self') {
            test.result = this.setWarning();
            test.message = "REQUIRES SELF ASSESSMENT";
            test.notes = this.notes;
            return test;
        } 

        if(this.validation=='required') {
            test.result = this.setWarning();
            test.message = "REQUIRES AUTHORITY ASSESSMENT";
            test.notes = this.notes;
            return test;
        }*/

        try {
            await this.exec();
            test.result = this.setSuccess();
            test.message = "SUCCESS";
        } catch (error) {
            test.result = this.setFailure();
            test.message = error;
        } finally {
            test.notes = this.notes;
        }

        return test;
    }

    async getRevocationResponse() {
        await this.exec();
        return this.revocationresponse;
    }
}

module.exports = TestRevocationResponse