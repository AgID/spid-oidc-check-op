const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');

class Test_3_9_1 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.9.1";
        this.error = "unsupported_grant_type";
        this.error_description = "Il parametro grant_type contiene un valore non corretto.";
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

module.exports = Test_3_9_1