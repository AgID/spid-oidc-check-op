const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');

class Test_3_9_4 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.9.4";
        this.error = "server_error";
        this.error_description = "L'OP ha riscontrato un problema interno.";
        this.description = "Refresh Response Error MUST be '" + this.error + "' : " + this.error_description;
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        if(!this.refreshtokenresponse.data.error) {
            this.notes = this.refreshtokenresponse.data;
            throw("Parameter error is not present");
        }

        if(!this.refreshtokenresponse.data.error_description) {
            this.notes = this.refreshtokenresponse.data;
            throw("Parameter error_description is not present");
        } 

        if(this.refreshtokenresponse.data.error!=this.error) {
            this.notes = this.refreshtokenresponse.data;
            throw("Parameter error is not '" + this.error + "'");
        } 

        if(this.refreshtokenresponse.data.error_description!=this.error_description) {
            this.notes = this.refreshtokenresponse.data;
            throw("Parameter error_description is not: " + this.error_description);
        } 

        this.notes = this.refreshtokenresponse.data;
        return true;
    }

}

module.exports = Test_3_9_4