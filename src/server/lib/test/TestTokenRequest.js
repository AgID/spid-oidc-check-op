const Test = require('./Test.js');
const moment = require('moment');

class TestTokenRequest extends Test {

    constructor(metadata, authrequest={}, authresponse={}, tokenrequest={}) {
        super();
        this.hook = "token-request";
        this.metadata = metadata;
        this.authrequest = authrequest;
        this.authresponse = authresponse;
        this.tokenrequest = tokenrequest;
    }

    exec() {
        super.exec();
    }

    async getResult() {
        let test = {
            num: this.num,
            hook: this.hook,
            description: this.description,

            // deafult but it's can be redefined while exec
            validation: this.validation,
            result: this.setFailure(),
            message: "",
            notes: "",
            datetime: moment().format('YYYY-MM-DD HH:mm:ss')
        }

        try {
            //do not await here but exec requested. TODO 
            this.exec();

            switch(this.validation) {
                case "automatic":
                    test.result = this.setSuccess();
                    test.message = "SUCCESS";
                    break;

                case "self":
                    test.result = this.setWarning();
                    test.message = "REQUIRES SELF ASSESSMENT";
                    break;

                case "required":
                    test.result = this.setWarning();
                    test.message = "REQUIRES AUTHORITY ASSESSMENT";
                    break;
            }

        } catch(error) {
            test.result = this.setFailure();
            test.message = error.message || error;
            
        } finally {
            test.notes = this.notes;
        }

        return test;
    }

    async getTokenRequest() {
        await this.exec();
        return this.tokenrequest;
    }
}

module.exports = TestTokenRequest 