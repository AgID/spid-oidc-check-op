const Test = require('./Test.js');
const moment = require('moment');

class TestTokenResponse extends Test {

    constructor(metadata, authrequest={}, authresponse={}, tokenrequest={}, tokenresponse={}) {
        super();
        this.hook = "token-response";
        this.metadata = metadata;
        this.authrequest = authrequest;
        this.authresponse = authresponse;
        this.tokenrequest = tokenrequest;
        this.tokenresponse = tokenresponse;
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
            let res = await this.exec();

            switch(this.validation) {
                case "automatic":
                    if(res) {
                        test.result = this.setSuccess();
                        test.message = "SUCCESS";
                    } else {
                        test.result = this.setWarning();
                        test.message = "REQUIRES SELF ASSESSMENT";
                    }
                    break;

                case "self":
                    if(res) {
                        test.result = this.setSuccess();
                        test.message = "SUCCESS";
                    } else {
                        test.result = this.setWarning();
                        test.message = "REQUIRES SELF ASSESSMENT";
                    }
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

module.exports = TestTokenResponse 