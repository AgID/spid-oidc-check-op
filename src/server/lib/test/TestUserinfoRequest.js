const Test = require('./Test.js');
const moment = require('moment');

class TestUserinfoRequest extends Test {

    constructor(metadata, authrequest={}, authresponse={}, tokenrequest={}, tokenresponse={}, userinforequest={}) {
        super();
        this.hook = "userinfo-request";
        this.metadata = metadata;
        this.authrequest = authrequest;
        this.authresponse = authresponse;
        this.tokenrequest = tokenrequest;
        this.tokenresponse = tokenresponse;
        this.userinforequest = userinforequest;
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
            //do not await here but exec requested. TODO 
            this.exec();
            test.result = this.setSuccess();
            test.message = "SUCCESS";
        } catch(error) {
            test.result = this.setFailure();
            test.message = error.message || error;
        } finally {
            test.notes = this.notes;
        }

        return test;
    }

    async getUserinfoRequest() {
        await this.exec();
        return this.userinforequest;
    }
}

module.exports = TestUserinfoRequest 