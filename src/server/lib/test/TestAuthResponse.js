const Test = require('./Test.js');
const moment = require('moment');

class TestAuthResponse extends Test {

    constructor(metadata, authrequest={}, authresponse={}) {
        super();
        this.hook = "authentication-response";
        this.metadata = metadata;
        this.authrequest = authrequest;
        this.authresponse = authresponse;
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
            await this.exec();

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
}

module.exports = TestAuthResponse 