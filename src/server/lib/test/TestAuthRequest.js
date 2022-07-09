const Test = require('./Test.js');

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
        await this.exec();
        return this.authrequest;
    }
}

module.exports = TestAuthRequest 