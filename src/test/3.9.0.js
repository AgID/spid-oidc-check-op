const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');

class Test_3_9_0 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.9.0";
        this.error = "invalid_client";
        this.error_description = "Il client_id indicato nella richiesta non è riconosciuto.";
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

module.exports = Test_3_9_0