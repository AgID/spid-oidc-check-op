const Test = require('./Test.js');
const moment = require('moment');

class TestMetadata extends Test {

    constructor(metadata) {
        super();
        this.hook = "metadata";
        this.metadata = metadata;
    }

    exec() {
        super.exec();
    }

    printResult() {
        let result = this.setFailure();
        try {
            result = this.setSuccess();
            console.log("Test " + this.num + " - Description: " + this.description);
            this.exec();
            console.log("Test " + this.num + " - Notes: " + this.notes);
        } catch(error) {
            result = this.setFailure();
            console.log("Test " + this.num + " - ERROR: " + error.toString());
        } finally {
            console.log("Test " + this.num + " - Result: " + (result? "Success" : "FAIL"));
        }
    }

    getResult() {
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
            test.result = this.setSuccess();
            this.exec();
            test.message = "SUCCESS";
        } catch(error) {
            test.result = this.setFailure();
            test.message = error;
        } finally {
            test.notes = this.notes;
        }

        return test;
    }
}

module.exports = TestMetadata 