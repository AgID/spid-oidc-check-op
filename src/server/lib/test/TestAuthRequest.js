const Test = require('./Test.js');
const moment = require('moment');

class TestAuthRequest extends Test {

    constructor(metadata, authrequest={}) {
        super();
        this.hook = "authentication-request";
        this.metadata = metadata;
        this.authrequest = authrequest;
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

        try {
            this.exec();
            test.result = this.setSuccess();
            test.message = "SUCCESS";
        } catch(error) {
            test.result = this.setFailure();
            test.message = error;
        } finally {
            test.notes = this.notes;
        }

        return test;
    }

    async getAuthRequest() {
        await this.exec();
        return this.authrequest;
    }
}

module.exports = TestAuthRequest 