const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');

class Test_3_7_5 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.7.5";
        this.error = "temporarily_unavailable";
        this.error_description = "L'OP ha riscontrato un problema interno temporaneo.";
        this.description = "Response Error MUST be '" + this.error + "' : " + this.error_description;
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        if(!this.tokenresponse.data.error) {
            this.notes = this.tokenresponse.data;
            throw("Parameter error is not present");
        }

        if(!this.tokenresponse.data.error_description) {
            this.notes = this.tokenresponse.data;
            throw("Parameter error_description is not present");
        } 

        if(this.tokenresponse.data.error!=this.error) {
            this.notes = this.tokenresponse.data;
            throw("Parameter error is not '" + this.error + "'");
        } 

        if(this.tokenresponse.data.error_description!=this.error_description) {
            this.notes = this.tokenresponse.data;
            throw("Parameter error_description is not: " + this.error_description);
        } 

        this.notes = this.tokenresponse.data;
        return true;
    }

}

module.exports = Test_3_7_5